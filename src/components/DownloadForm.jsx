import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      // First get video info
      const infoResponse = await axios.post(`${API_URL}/video-info`, { url });
      setVideoInfo(infoResponse.data);
      setProgress(50);

      // Then trigger download
      const downloadResponse = await axios.post(`${API_URL}/download`, { url }, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total);
          setProgress(50 + percentCompleted);
        }
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${infoResponse.data.title || 'video'}.${infoResponse.data.ext || 'mp4'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setProgress(100);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to download video');
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