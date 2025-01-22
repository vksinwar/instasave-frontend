// Platform detection moved to frontend
export function detectPlatform(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    }
    if (hostname.includes('instagram.com')) {
      return 'instagram';
    }
    return null;
  } catch {
    return null;
  }
}

// URL validation patterns
const URL_PATTERNS = {
  youtube: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  instagram: /^(https?:\/\/)?(www\.)?(instagram\.com\/(p|reel)\/[a-zA-Z0-9_-]+)/
};

export function validateVideoUrl(url, platform) {
  return URL_PATTERNS[platform]?.test(url) || false;
}

// Basic info extraction (when possible)
export async function extractBasicInfo(url, platform) {
  if (platform === 'youtube') {
    const videoId = url.match(/[?&]v=([^&]+)/)?.[1] || url.match(/youtu\.be\/([^?]+)/)?.[1];
    if (videoId) {
      try {
        // Use YouTube oEmbed API for basic info
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        const data = await response.json();
        
        return {
          success: true,
          platform: 'youtube',
          title: data.title,
          thumbnail: data.thumbnail_url,
          author: data.author_name,
          // Note: Full video info will still come from backend
        };
      } catch {
        return null;
      }
    }
  }
  return null;
} 