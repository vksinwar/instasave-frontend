import React, { useState } from 'react';

const API_URL = 'https://isave-backend-sjwi.onrender.com/api';

function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [progress, setProgress] = useState(0);

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
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);
    setVideoInfo(null);

    try {
      // Using fetch as specified by the backend
      const response = await fetch(`${API_URL}/video?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // For debugging

      if (!data) {
        throw new Error('No data received from server');
      }

      // Download the video directly
      const downloadUrl = data.download_url;
      if (!downloadUrl) {
        throw new Error('No download URL available');
      }

      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Set video info if available
      setVideoInfo({
        title: data.title || 'Video',
        thumbnail: data.thumbnail,
        duration: data.duration,
        format: data.format || 'mp4'
      });

      setProgress(100);
    } catch (err) {
      console.error('Download error:', err);
      let errorMessage = 'Failed to download video. Please try again.';
      
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
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