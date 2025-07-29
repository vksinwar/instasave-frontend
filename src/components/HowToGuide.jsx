import React from 'react'
import { Instagram, Youtube, Music, Facebook } from 'lucide-react'

const HowToGuide = () => {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      steps: [
        "Open Instagram app or website and find the video you want to download",
        "Tap the three dots (⋯) on the video post and select 'Copy Link'",
        "Return to InstaSave and paste the link in the input field",
        "Click 'Download' and choose your preferred video quality",
        "Your Instagram video will be saved to your device instantly"
      ],
      tips: [
        "Works with Instagram Reels, IGTV, and regular video posts",
        "Private account videos cannot be downloaded",
        "Stories can be downloaded if they're publicly accessible"
      ]
    },
    {
      name: "TikTok",
      icon: Music,
      color: "from-black to-red-600",
      steps: [
        "Open TikTok app and find the video you want to save",
        "Tap the 'Share' button (arrow icon) on the right side",
        "Select 'Copy Link' from the sharing options",
        "Go to InstaSave and paste the TikTok URL",
        "Click 'Download' to get your TikTok video without watermark"
      ],
      tips: [
        "Downloads TikTok videos in original quality",
        "Removes TikTok watermark automatically",
        "Works with all public TikTok videos"
      ]
    },
    {
      name: "YouTube Shorts",
      icon: Youtube,
      color: "from-red-500 to-red-700",
      steps: [
        "Open YouTube and navigate to the Shorts video",
        "Click the 'Share' button below the video",
        "Select 'Copy Link' to copy the YouTube Shorts URL",
        "Paste the link into InstaSave's download field",
        "Choose your quality and download the YouTube Short"
      ],
      tips: [
        "Supports all YouTube Shorts formats",
        "Multiple quality options available",
        "Fast processing and download speeds"
      ]
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-600 to-blue-800",
      steps: [
        "Find the Facebook video you want to download",
        "Click the three dots (⋯) in the top right of the post",
        "Select 'Copy Link' from the dropdown menu",
        "Open InstaSave and paste the Facebook video URL",
        "Click 'Download' and select your preferred quality"
      ],
      tips: [
        "Works with Facebook videos and Facebook Watch",
        "Only public videos can be downloaded",
        "Supports HD quality when available"
      ]
    }
  ]

  const generalTips = [
    {
      title: "Video Quality",
      description: "InstaSave automatically detects the best available quality for each video. You can choose from multiple options including HD when available."
    },
    {
      title: "Download Speed",
      description: "Our optimized servers ensure fast processing. Most videos are ready for download within seconds of pasting the URL."
    },
    {
      title: "Privacy & Security",
      description: "We don't store your videos or track your downloads. All processing happens securely and your privacy is protected."
    },
    {
      title: "No Registration",
      description: "Start downloading immediately without creating an account. No personal information required - just paste and download."
    },
    {
      title: "Mobile Friendly",
      description: "InstaSave works perfectly on all devices. Download videos on your phone, tablet, or computer with the same ease."
    },
    {
      title: "Legal Usage",
      description: "Always respect copyright laws and platform terms. Download content responsibly and only use videos you have permission to use."
    }
  ]

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How to Download Videos from Any Platform
        </h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          Follow our step-by-step guides to download videos from Instagram, TikTok, YouTube Shorts, Facebook, and more. 
          It's completely free and takes just a few seconds.
        </p>
      </div>

      {/* Platform-specific guides */}
      <div className="grid gap-8 mb-16">
        {platforms.map((platform, index) => {
          const IconComponent = platform.icon
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${platform.color} mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  How to Download {platform.name} Videos
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Step-by-Step Instructions:</h4>
                  <ol className="space-y-3">
                    {platform.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-white/80">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Tips & Notes:</h4>
                  <ul className="space-y-2">
                    {platform.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-white/70 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* General tips section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Important Tips for Video Downloading
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generalTips.map((tip, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">{tip.title}</h4>
              <p className="text-white/70 text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-white mb-4">
          Ready to Start Downloading?
        </h3>
        <p className="text-white/80 mb-6">
          Scroll up to our download tool and paste any video URL to get started instantly!
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          Go to Download Tool
        </button>
      </div>
    </section>
  )
}

export default HowToGuide

