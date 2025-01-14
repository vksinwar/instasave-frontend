import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First get video info
      const infoResponse = await axios.post(`${API_URL}/video-info`, { url });
      setVideoInfo(infoResponse.data);

      // Then trigger download
      const downloadResponse = await axios.post(`${API_URL}/download`, { url }, {
        responseType: 'blob'
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
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to download video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Video Downloader</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter video URL"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {videoInfo && (
          <div className="video-info">
            <h3>{videoInfo.title}</h3>
            <p>Duration: {videoInfo.duration}</p>
            <p>Quality: {videoInfo.format}</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        input {
          flex: 1;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:disabled {
          background: #ccc;
        }

        .error {
          color: red;
          margin: 1rem 0;
        }

        .video-info {
          margin-top: 2rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default App; 