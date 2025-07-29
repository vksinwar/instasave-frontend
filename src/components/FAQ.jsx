import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      question: "How do I download Instagram videos using InstaSave?",
      answer: "To download Instagram videos: 1) Copy the Instagram video URL from the app or website, 2) Paste the URL into InstaSave's input field, 3) Click the 'Download' button, 4) Choose your preferred video quality and download the file. The process is completely free and requires no registration."
    },
    {
      question: "Is InstaSave free to use?",
      answer: "Yes, InstaSave is completely free to use. You can download unlimited videos from Instagram, TikTok, YouTube Shorts, and other platforms without any charges or subscription fees. There are no hidden costs or premium features."
    },
    {
      question: "What video formats and qualities are supported?",
      answer: "InstaSave supports multiple video formats including MP4, and various quality options from 360p to 1080p HD. The available quality options depend on the original video's resolution. We automatically detect the best available quality for each video."
    },
    {
      question: "Do I need to create an account to download videos?",
      answer: "No account creation is required. InstaSave works without registration, login, or any personal information. Simply paste the video URL and download immediately. This ensures your privacy and makes the process quick and hassle-free."
    },
    {
      question: "Which platforms are supported by InstaSave?",
      answer: "InstaSave supports major social media platforms including Instagram (videos, reels, stories, IGTV), TikTok, YouTube Shorts, Facebook videos, and Twitter videos. We continuously add support for new platforms based on user demand."
    },
    {
      question: "Is it legal to download videos from social media platforms?",
      answer: "Downloading videos for personal use is generally acceptable, but you should respect copyright laws and platform terms of service. Only download content you have permission to use, and avoid redistributing copyrighted material without proper authorization."
    },
    {
      question: "Why can't I download some videos?",
      answer: "Some videos may be unavailable for download due to privacy settings (private accounts), geographic restrictions, or platform-specific limitations. Additionally, live streams and some protected content cannot be downloaded."
    },
    {
      question: "Does InstaSave work on mobile devices?",
      answer: "Yes, InstaSave is fully optimized for mobile devices including smartphones and tablets. The website works seamlessly on iOS, Android, and all major mobile browsers without requiring any app installation."
    },
    {
      question: "How fast are the downloads?",
      answer: "Download speeds depend on your internet connection and the video file size. InstaSave uses optimized servers to ensure fast processing and download speeds. Most videos are processed and ready for download within seconds."
    },
    {
      question: "Are there any download limits?",
      answer: "InstaSave has no daily or monthly download limits. You can download as many videos as you need, whenever you need them. We believe in providing unlimited access to our free service."
    },
    {
      question: "Is my data safe when using InstaSave?",
      answer: "Yes, your privacy and data security are our top priorities. We don't store your downloaded videos, track your activity, or collect personal information. All processing happens securely, and we don't keep logs of your downloads."
    },
    {
      question: "What should I do if a download fails?",
      answer: "If a download fails, try these steps: 1) Check if the video URL is correct and accessible, 2) Ensure the video is public (not from a private account), 3) Try refreshing the page and attempting again, 4) Check your internet connection. If problems persist, the video may have platform-specific restrictions."
    }
  ]

  // Generate FAQ schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      {/* Schema markup for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Find answers to common questions about downloading videos from Instagram, TikTok, YouTube Shorts, and other social media platforms.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white pr-4">
                {item.question}
              </h3>
              {openItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-white/70 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/70 flex-shrink-0" />
              )}
            </button>
            
            {openItems.has(index) && (
              <div className="px-6 pb-4">
                <p className="text-white/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/70">
          Still have questions? Our video downloader is designed to be simple and intuitive. 
          Just paste any video URL and start downloading instantly!
        </p>
      </div>
    </section>
  )
}

export default FAQ

