import React from 'react';

function HowTo() {
  const steps = [
    {
      title: "Copy the URL",
      description: "To get started, access either Instagram/Facebook app or website and retrieve the link to the specific video, reels, carousel, or content that you want to copy.",
      iconSrc: "/static/icons/copy.svg"
    },
    {
      title: "Paste the link",
      description: "Return to the website, paste the link into the input field at the top of the screen and click the \"Download\" button.",
      iconSrc: "/static/icons/paste.svg"
    },
    {
      title: "Download",
      description: "In no time at all, you'll receive a list of results that offer various quality options. Choose the option that best suits your requirements and download it.",
      iconSrc: "/static/icons/download.svg"
    }
  ];

  return (
    <div className="container">
      <section className="how-to">
        <h2 className="how-to__title">How to download video from Instagram?</h2>
      </section>
      <div className="how-to__steps">
        {steps.map((step, index) => (
          <div key={index} className="how-to__step">
            <div className="step-content">
              <div className="step-icon">
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#7c3aed',
                  borderRadius: '12px'
                }}>
                  <img 
                    src={step.iconSrc} 
                    alt="" 
                    className="step-icon-img" 
                    style={{ 
                      width: '32px',
                      height: '32px',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
              </div>
              <div className="step-info">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowTo; 