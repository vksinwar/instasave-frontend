import React, { useEffect } from 'react'

const AdSenseAd = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true, 
  style = {},
  className = ''
}) => {
  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1068219746155994'
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
        
        window.adsbygoogle = window.adsbygoogle || []
      }
      
      // Push ad to AdSense
      window.adsbygoogle.push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-1068219746155994"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// Predefined ad components for different placements
export const HeaderAd = () => (
  <AdSenseAd
    adSlot="1234567890"
    adFormat="horizontal"
    className="mb-4"
    style={{ minHeight: '90px' }}
  />
)

export const SidebarAd = () => (
  <AdSenseAd
    adSlot="1234567891"
    adFormat="rectangle"
    className="mb-6"
    style={{ minHeight: '250px', maxWidth: '300px' }}
  />
)

export const InContentAd = () => (
  <AdSenseAd
    adSlot="1234567892"
    adFormat="fluid"
    className="my-8"
    style={{ minHeight: '200px' }}
  />
)

export const FooterAd = () => (
  <AdSenseAd
    adSlot="1234567893"
    adFormat="horizontal"
    className="mt-4"
    style={{ minHeight: '90px' }}
  />
)

export const MobileAd = () => (
  <AdSenseAd
    adSlot="1234567894"
    adFormat="rectangle"
    className="my-4 mx-auto"
    style={{ minHeight: '250px', maxWidth: '320px' }}
  />
)

export default AdSenseAd

