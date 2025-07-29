import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Download, Instagram, Youtube, Facebook, Zap, Shield, Smartphone, Globe, Music, Play, Clock, User, Eye } from 'lucide-react'
import FAQ from './components/FAQ'
import HowToGuide from './components/HowToGuide'
import { HeaderAd, InContentAd, FooterAd, MobileAd } from './components/AdSenseAd'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [downloadLoading, setDownloadLoading] = useState({})

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('https://zmhqivcvw93l.manus.space/api/video/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.error || 'Failed to process video')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVideoDownload = async (formatId) => {
    setDownloadLoading(prev => ({ ...prev, [formatId]: true }))
    
    try {
      const response = await fetch('https://zmhqivcvw93l.manus.space/api/video/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: url.trim(), 
          format_id: formatId 
        })
      })

      if (response.headers.get('content-type')?.includes('application/json')) {
        // JSON response - might be an error or redirect
        const data = await response.json()
        if (data.success && data.download_url) {
          // Create a temporary link to trigger download
          const link = document.createElement('a')
          link.href = data.download_url
          link.download = data.filename || `video_${formatId}.mp4`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          setError(data.error || 'Download failed')
        }
      } else {
        // Binary response - direct file download
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `video_${formatId}.mp4`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      }
    } catch (err) {
      setError('Download failed. Please try again.')
    } finally {
      setDownloadLoading(prev => ({ ...prev, [formatId]: false }))
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatViews = (count) => {
    if (!count) return 'N/A'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">InstaSave</h1>
          </div>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            English
          </Button>
        </div>
      </header>

      {/* Header Ad */}
      <div className="container mx-auto px-4">
        <HeaderAd />
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Download Reels from{' '}
            <span className="text-pink-300">Instagram</span>,{' '}
            <span className="text-blue-300">Facebook</span>,{' '}
            <span className="text-yellow-300">TikTok</span>...
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Fast, secure, and easy-to-use platform with no registration required. 
            Download videos in high quality for free.
          </p>
        </div>

        {/* Download Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="url"
                    placeholder="Paste your video URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 h-12 text-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={handlePaste}
                    className="h-12 px-4"
                  >
                    Paste
                  </Button>
                </div>
                <Button
                  onClick={handleDownload}
                  disabled={!url.trim() || loading}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Video Result */}
              {result && (
                <div className="mt-6 space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Video Information</h3>
                    
                    {/* Video Preview */}
                    <div className="flex space-x-4 mb-4">
                      {result.thumbnail && (
                        <img 
                          src={result.thumbnail} 
                          alt="Video thumbnail"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{result.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {result.uploader && (
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{result.uploader}</span>
                            </div>
                          )}
                          {result.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDuration(result.duration)}</span>
                            </div>
                          )}
                          {result.view_count && (
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{formatViews(result.view_count)} views</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Download Options */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800">Download Options:</h4>
                      {result.formats && result.formats.map((format, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Play className="w-5 h-5 text-blue-500" />
                            <div>
                              <span className="font-medium">{format.quality}</span>
                              {format.filesize_mb > 0 && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({format.filesize_mb} MB)
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleVideoDownload(format.format_id)}
                            disabled={downloadLoading[format.format_id]}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            {downloadLoading[format.format_id] ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Downloading...</span>
                              </div>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Note for Instagram */}
                    {result.note && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-700 text-sm">{result.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Platform Icons */}
          <div className="flex justify-center space-x-6 mt-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Instagram className="w-6 h-6 text-pink-500" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Facebook className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            How to download video from Instagram?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Copy the URL</h4>
                <p className="text-white/80">
                  Access Instagram app or website and retrieve the link to the specific video, 
                  reels, or content that you want to copy.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Paste the link</h4>
                <p className="text-white/80">
                  Return to InstaSave, paste the link into the input field and 
                  click the "Download" button.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Download</h4>
                <p className="text-white/80">
                  Choose the quality option that best suits your requirements 
                  and download it instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose InstaSave?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Fast Download</h4>
                <p className="text-white/80 text-sm">
                  Lightning-fast processing and download speeds
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Secure & Safe</h4>
                <p className="text-white/80 text-sm">
                  No registration required, completely anonymous
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Mobile Friendly</h4>
                <p className="text-white/80 text-sm">
                  Works perfectly on all devices and browsers
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Multi-Platform</h4>
                <p className="text-white/80 text-sm">
                  Support for Instagram, TikTok, YouTube, and more
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* In-Content Ad */}
        <div className="mb-8">
          <InContentAd />
        </div>

        {/* Mobile Ad - Visible only on mobile */}
        <div className="block md:hidden mb-8">
          <MobileAd />
        </div>

        {/* How-to Guide */}
        <HowToGuide />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer Ad */}
      <div className="container mx-auto px-4">
        <FooterAd />
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <h5 className="text-white font-semibold mb-3">Tools</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white">Video Downloader</a></li>
                <li><a href="#" className="hover:text-white">Reels Downloader</a></li>
                <li><a href="#" className="hover:text-white">Story Downloader</a></li>
                <li><a href="#" className="hover:text-white">Short Downloader</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Guides</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white">How to Download Instagram Reels</a></li>
                <li><a href="#" className="hover:text-white">How to Download Instagram Videos</a></li>
                <li><a href="#" className="hover:text-white">TikTok Video Download Guide</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white">DMCA</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-white/10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-white font-bold text-lg">InstaSave</span>
            </div>
            <p className="text-white/60 text-sm">
              © 2024 InstaSave. All rights reserved. Download responsibly and respect content creators' rights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

