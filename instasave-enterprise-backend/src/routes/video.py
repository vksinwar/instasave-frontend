from flask import Blueprint, jsonify, request
import requests
import json
import time
import random
from urllib.parse import urlparse
from datetime import datetime, timedelta
import hashlib

video_bp = Blueprint('video', __name__)

# Enterprise-grade configuration
class VideoConfig:
    # SimilarTube API (Enterprise-grade social media video API)
    SIMILARTUBE_API_URL = "https://public-api.similartube.co/get_data_by_url"
    SIMILARTUBE_API_KEY = "q5z0qimiwjw2mz6agtf6et8o-cap"
    
    # NanoInfluencer ASR API (for subtitle-free videos)
    NANOINFLUENCER_API_URL = "https://api.nanoinfluencer.ai/nano-api/search/task"
    
    # Rate limiting configuration
    MAX_REQUESTS_PER_MINUTE = 60
    MAX_REQUESTS_PER_HOUR = 1000
    MAX_REQUESTS_PER_DAY = 10000
    
    # Anti-blocking measures
    USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59'
    ]

# In-memory rate limiting (for production, use Redis)
request_counts = {}

def get_client_id(request):
    """Generate a unique client identifier for rate limiting"""
    # Use IP address and User-Agent for client identification
    ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR', 'unknown'))
    user_agent = request.headers.get('User-Agent', 'unknown')
    return hashlib.md5(f"{ip}:{user_agent}".encode()).hexdigest()

def check_rate_limit(client_id):
    """Check if client has exceeded rate limits"""
    now = datetime.now()
    
    if client_id not in request_counts:
        request_counts[client_id] = {
            'minute': {'count': 0, 'reset': now + timedelta(minutes=1)},
            'hour': {'count': 0, 'reset': now + timedelta(hours=1)},
            'day': {'count': 0, 'reset': now + timedelta(days=1)}
        }
    
    client_data = request_counts[client_id]
    
    # Reset counters if time windows have passed
    for period in ['minute', 'hour', 'day']:
        if now > client_data[period]['reset']:
            if period == 'minute':
                client_data[period] = {'count': 0, 'reset': now + timedelta(minutes=1)}
            elif period == 'hour':
                client_data[period] = {'count': 0, 'reset': now + timedelta(hours=1)}
            elif period == 'day':
                client_data[period] = {'count': 0, 'reset': now + timedelta(days=1)}
    
    # Check limits
    if client_data['minute']['count'] >= VideoConfig.MAX_REQUESTS_PER_MINUTE:
        return False, "Rate limit exceeded: too many requests per minute"
    if client_data['hour']['count'] >= VideoConfig.MAX_REQUESTS_PER_HOUR:
        return False, "Rate limit exceeded: too many requests per hour"
    if client_data['day']['count'] >= VideoConfig.MAX_REQUESTS_PER_DAY:
        return False, "Rate limit exceeded: too many requests per day"
    
    # Increment counters
    for period in ['minute', 'hour', 'day']:
        client_data[period]['count'] += 1
    
    return True, "OK"

def detect_platform(video_url):
    """Detect the social media platform from the video URL"""
    domain = urlparse(video_url.lower()).netloc.replace('www.', '')
    
    if 'youtube.com' in domain or 'youtu.be' in domain:
        return 'youtube'
    elif 'tiktok.com' in domain:
        return 'tiktok'
    elif 'instagram.com' in domain:
        return 'instagram'
    elif 'facebook.com' in domain or 'fb.watch' in domain:
        return 'facebook'
    else:
        return 'unknown'

def normalize_instagram_url(video_url):
    """Convert Instagram reels URL to the correct format"""
    if 'instagram.com/reels/' in video_url:
        return video_url.replace('/reels/', '/reel/')
    return video_url

def get_random_user_agent():
    """Get a random user agent for anti-blocking"""
    return random.choice(VideoConfig.USER_AGENTS)

def add_random_delay():
    """Add random delay to mimic human behavior"""
    delay = random.uniform(0.5, 2.0)
    time.sleep(delay)

def call_similartube_api(video_url):
    """Call the SimilarTube API for video details extraction"""
    try:
        # Normalize Instagram URLs
        if 'instagram.com' in video_url:
            video_url = normalize_instagram_url(video_url)
        
        # Add random delay for anti-blocking
        add_random_delay()
        
        # Prepare headers with random user agent
        headers = {
            'Authorization': f'Bearer {VideoConfig.SIMILARTUBE_API_KEY}',
            'User-Agent': get_random_user_agent(),
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
        
        # Prepare query parameters
        params = {'url': video_url}
        
        # Make the API call
        response = requests.get(
            VideoConfig.SIMILARTUBE_API_URL,
            headers=headers,
            params=params,
            timeout=30
        )
        
        response.raise_for_status()
        result = response.json()
        
        if result.get('code') == 200:
            return {
                'success': True,
                'data': result.get('data', {}),
                'usage': result.get('usage', 'N/A'),
                'quota': result.get('quota', 'N/A'),
                'api_source': 'SimilarTube'
            }
        else:
            return {
                'success': False,
                'error': f"API Error: {result.get('code')} - {result.get('message', 'Unknown error')}",
                'api_source': 'SimilarTube'
            }
            
    except requests.exceptions.Timeout:
        return {
            'success': False,
            'error': 'Request timeout - API took too long to respond',
            'api_source': 'SimilarTube'
        }
    except requests.exceptions.RequestException as e:
        return {
            'success': False,
            'error': f'Network error: {str(e)}',
            'api_source': 'SimilarTube'
        }
    except Exception as e:
        return {
            'success': False,
            'error': f'Unexpected error: {str(e)}',
            'api_source': 'SimilarTube'
        }

def call_nanoinfluencer_asr(job_id):
    """Call the NanoInfluencer ASR API for subtitle-free videos"""
    try:
        url = f"{VideoConfig.NANOINFLUENCER_API_URL}/{job_id}"
        
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': get_random_user_agent()
        }
        
        payload = json.dumps({"channelIds": [""]})
        
        response = requests.post(url, headers=headers, data=payload, timeout=30)
        response.raise_for_status()
        
        return {
            'success': True,
            'data': response.json(),
            'api_source': 'NanoInfluencer ASR'
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': f'ASR API error: {str(e)}',
            'api_source': 'NanoInfluencer ASR'
        }

def format_video_response(video_data, platform):
    """Format video data into a standardized response"""
    if not video_data:
        return None
    
    # Extract basic information
    response = {
        'platform': platform.upper(),
        'title': video_data.get('title', 'N/A'),
        'video_id': video_data.get('id', 'N/A'),
        'description': video_data.get('desc', 'N/A'),
        'url': video_data.get('url', 'N/A'),
        'duration': video_data.get('duration', 'N/A'),
        'publish_date': video_data.get('publishAt', 'N/A'),
        'views': video_data.get('views', 0),
        'likes': video_data.get('likes', 0),
        'comments': video_data.get('comments', 0),
        'tags': video_data.get('tags', []),
        'thumbnail': video_data.get('thumbnail', 'N/A')
    }
    
    # Extract user information
    user_info = video_data.get('user', {})
    if user_info:
        response['creator'] = {
            'username': user_info.get('username', 'N/A'),
            'display_name': user_info.get('displayName', user_info.get('name', 'N/A')),
            'verified': user_info.get('verified', False),
            'profile_picture': user_info.get('profilePicture', 'N/A')
        }
    
    # Extract download URLs if available
    download_urls = video_data.get('downloadUrls', [])
    if download_urls:
        response['download_options'] = []
        for url_info in download_urls:
            response['download_options'].append({
                'quality': url_info.get('quality', 'N/A'),
                'format': url_info.get('format', 'N/A'),
                'url': url_info.get('url', 'N/A'),
                'size': url_info.get('size', 'N/A')
            })
    
    return response

@video_bp.route('/video/extract', methods=['POST'])
def extract_video():
    """Enterprise-grade video extraction endpoint"""
    try:
        # Get client ID for rate limiting
        client_id = get_client_id(request)
        
        # Check rate limits
        rate_limit_ok, rate_limit_message = check_rate_limit(client_id)
        if not rate_limit_ok:
            return jsonify({
                'success': False,
                'error': rate_limit_message,
                'error_code': 'RATE_LIMIT_EXCEEDED'
            }), 429
        
        # Get request data
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing video URL in request body',
                'error_code': 'MISSING_URL'
            }), 400
        
        video_url = data['url'].strip()
        if not video_url:
            return jsonify({
                'success': False,
                'error': 'Empty video URL provided',
                'error_code': 'EMPTY_URL'
            }), 400
        
        # Detect platform
        platform = detect_platform(video_url)
        if platform == 'unknown':
            return jsonify({
                'success': False,
                'error': 'Unsupported platform. Supported platforms: YouTube, TikTok, Instagram, Facebook',
                'error_code': 'UNSUPPORTED_PLATFORM'
            }), 400
        
        # Call SimilarTube API
        api_result = call_similartube_api(video_url)
        
        if not api_result['success']:
            return jsonify({
                'success': False,
                'error': api_result['error'],
                'error_code': 'API_ERROR',
                'platform': platform.upper(),
                'api_source': api_result['api_source']
            }), 500
        
        # Format response
        video_data = api_result['data']
        formatted_response = format_video_response(video_data, platform)
        
        if not formatted_response:
            return jsonify({
                'success': False,
                'error': 'Failed to extract video information',
                'error_code': 'EXTRACTION_FAILED',
                'platform': platform.upper()
            }), 500
        
        # Add API usage information
        formatted_response['api_usage'] = {
            'usage': api_result.get('usage', 'N/A'),
            'quota': api_result.get('quota', 'N/A'),
            'api_source': api_result['api_source']
        }
        
        # Add rate limit information
        client_data = request_counts.get(client_id, {})
        formatted_response['rate_limit'] = {
            'requests_remaining_minute': VideoConfig.MAX_REQUESTS_PER_MINUTE - client_data.get('minute', {}).get('count', 0),
            'requests_remaining_hour': VideoConfig.MAX_REQUESTS_PER_HOUR - client_data.get('hour', {}).get('count', 0),
            'requests_remaining_day': VideoConfig.MAX_REQUESTS_PER_DAY - client_data.get('day', {}).get('count', 0)
        }
        
        return jsonify({
            'success': True,
            'data': formatted_response
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}',
            'error_code': 'INTERNAL_ERROR'
        }), 500

@video_bp.route('/video/asr/<job_id>', methods=['POST'])
def get_asr_results(job_id):
    """Get ASR results for subtitle-free videos"""
    try:
        # Get client ID for rate limiting
        client_id = get_client_id(request)
        
        # Check rate limits
        rate_limit_ok, rate_limit_message = check_rate_limit(client_id)
        if not rate_limit_ok:
            return jsonify({
                'success': False,
                'error': rate_limit_message,
                'error_code': 'RATE_LIMIT_EXCEEDED'
            }), 429
        
        # Validate job ID
        if not job_id or len(job_id.strip()) == 0:
            return jsonify({
                'success': False,
                'error': 'Invalid job ID',
                'error_code': 'INVALID_JOB_ID'
            }), 400
        
        # Call NanoInfluencer ASR API
        asr_result = call_nanoinfluencer_asr(job_id.strip())
        
        if not asr_result['success']:
            return jsonify({
                'success': False,
                'error': asr_result['error'],
                'error_code': 'ASR_API_ERROR',
                'api_source': asr_result['api_source']
            }), 500
        
        return jsonify({
            'success': True,
            'data': asr_result['data'],
            'api_source': asr_result['api_source']
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}',
            'error_code': 'INTERNAL_ERROR'
        }), 500

@video_bp.route('/video/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        'status': 'healthy',
        'service': 'InstaSave Enterprise Video API',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat(),
        'supported_platforms': ['YouTube', 'TikTok', 'Instagram', 'Facebook'],
        'features': [
            'Enterprise-grade video extraction',
            'Rate limiting',
            'Anti-blocking measures',
            'ASR for subtitle-free videos',
            'Multiple platform support'
        ]
    })

@video_bp.route('/video/stats', methods=['GET'])
def get_stats():
    """Get API usage statistics"""
    try:
        # Calculate total requests across all clients
        total_requests = 0
        active_clients = len(request_counts)
        
        for client_data in request_counts.values():
            total_requests += client_data.get('day', {}).get('count', 0)
        
        return jsonify({
            'success': True,
            'stats': {
                'total_requests_today': total_requests,
                'active_clients': active_clients,
                'max_requests_per_day': VideoConfig.MAX_REQUESTS_PER_DAY,
                'supported_platforms': ['YouTube', 'TikTok', 'Instagram', 'Facebook'],
                'api_sources': ['SimilarTube', 'NanoInfluencer ASR']
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to get stats: {str(e)}',
            'error_code': 'STATS_ERROR'
        }), 500

