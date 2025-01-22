import React, { useState, useCallback } from 'react';
import { detectPlatform, validateVideoUrl, extractBasicInfo } from '../utils/videoUtils';

const API_URL = 'https://isave-backend-sjwi.onrender.com/api';

function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [progress, setProgress] = useState(0);

  // Client-side URL validation and platform detection
  const validateInput = useCallback((inputUrl) => {
    try {
      const platform = detectPlatform(inputUrl);
      if (!platform) {
        throw new Error('Unsupported platform. Please provide a valid YouTube or Instagram URL');
      }
      
      if (!validateVideoUrl(inputUrl, platform)) {
        throw new Error(`Invalid ${platform} URL`);
      }

      return platform;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      setError('Failed to paste from clipboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVideoInfo(null);

    // Client-side validation
    const platform = validateInput(url);
    if (!platform) return;

    setLoading(true);

    try {
      // Try to get from cache first
      const cacheKey = `video_${url}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (parsed.timestamp > Date.now() - 3600000) { // Cache valid for 1 hour
            setVideoInfo(parsed.data);
            setLoading(false);
            return;
          }
          localStorage.removeItem(cacheKey); // Clear expired cache
        } catch (e) {
          console.error('Cache parsing error:', e);
          localStorage.removeItem(cacheKey);
        }
      }

      // Extract basic info client-side when possible
      const basicInfo = await extractBasicInfo(url, platform);
      if (basicInfo) {
        setVideoInfo(basicInfo); // Show basic info immediately
      }

      // Fetch full details from backend
      const apiUrl = `${API_URL}/video?url=${encodeURIComponent(url)}&platform=${platform}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response from server. Please try again later.');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to process video');
      }

      // Cache the successful response
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: data
        }));
      } catch (e) {
        console.error('Cache storage error:', e);
      }

      setVideoInfo(data);

      // Handle download if URL is available
      if (data.download_url) {
        const link = document.createElement('a');
        link.href = data.download_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = `${data.title || 'video'}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-block__wrapper">
      <div className="form-block__content">
        <div className="title-wrapper">
          <h1 className="form-block__content-subtitle">
            <span>Download Reels from</span>{' '}
            <span className="platform-names">
              <span className="instagram">Instagram</span>,{' '}
              <span className="facebook">Facebook</span>,{' '}
              <span className="tiktok">TikTok</span>
            </span>
            {' '}...
          </h1>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <div className="search-form__field">
          <label htmlFor="url" className="visually-hidden">Video URL</label>
          <input 
            type="text" 
            id="url" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your video URL here" 
            className="search-form__input"
            aria-label="URL input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
          <div className="search-form__actions">
            <button 
              type="button"
              onClick={handlePaste}
              className="search-form__action-btn paste-btn"
              aria-label="Paste URL"
              disabled={loading}
            >
              Paste
            </button>
            <button 
              type="submit" 
              className="search-form__action-btn info-fetch-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Download'}
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="progress-container" aria-live="polite">
          <div className="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
            />
          </div>
          <p className="progress-text">{progress}% Complete</p>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {videoInfo && (
        <div className="video-info" aria-live="polite">
          <div className="video-info__card">
            {videoInfo.thumbnail && (
              <div className="video-info__thumbnail">
                <img src={videoInfo.thumbnail} alt={videoInfo.title || 'Video thumbnail'} />
              </div>
            )}
            <div className="video-info__details">
              <h3>{videoInfo.title}</h3>
              {videoInfo.duration && <p>Duration: {videoInfo.duration}</p>}
              {videoInfo.format && <p>Quality: {videoInfo.format}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadForm; 