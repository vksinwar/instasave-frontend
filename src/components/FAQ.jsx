import React, { useState } from 'react';

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "What is an Instagram Video Downloader?",
      answer: "InstaSave is a web-based tool that allows you to download videos, reels, and stories from Instagram. It's designed to be user-friendly and doesn't require any software installation."
    },
    {
      id: 2,
      question: "Which file formats are supported for downloading?",
      answer: (
        <>
          <p>We support downloading in multiple formats including:</p>
          <ul>
            <li>MP4 for videos</li>
            <li>JPG/PNG for images</li>
            <li>MP3 for audio extraction</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      question: "Which devices are compatible with InstaSave?",
      answer: (
        <>
          <p>InstaSave works on all devices with a web browser, including:</p>
          <ul>
            <li>Desktop computers (Windows, Mac, Linux)</li>
            <li>Mobile phones (iOS, Android)</li>
            <li>Tablets and iPads</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      question: "Is there a limit on the number of downloads?",
      answer: "No, there's no limit on the number of videos you can download. Our service is completely free and unlimited."
    },
    {
      id: 5,
      question: "What is the maximum quality of downloads?",
      answer: (
        <>
          <p>We provide the highest quality available from the source:</p>
          <ul>
            <li>Videos: Up to 4K quality (if available)</li>
            <li>Images: Original resolution</li>
            <li>Stories: Best available quality</li>
          </ul>
        </>
      )
    },
    {
      id: 6,
      question: "How to download Instagram Reels without watermark?",
      answer: (
        <>
          <p>To download Instagram Reels without watermark using InstaSave:</p>
          <ol>
            <li>Copy the Reels URL from Instagram</li>
            <li>Paste it into InstaSave's download box</li>
            <li>Click download to get your watermark-free Reels video</li>
          </ol>
          <p>Our tool ensures high-quality downloads while removing the Instagram watermark automatically.</p>
        </>
      )
    },
    {
      id: 7,
      question: "Can I download Facebook videos using InstaSave?",
      answer: (
        <>
          <p>Yes! InstaSave supports Facebook video downloads from:</p>
          <ul>
            <li>Facebook public posts</li>
            <li>Facebook Watch videos</li>
            <li>Facebook Reels</li>
            <li>Facebook Stories (while they're active)</li>
          </ul>
          <p>Simply copy the Facebook video URL and paste it into our downloader to save in HD quality.</p>
        </>
      )
    },
    {
      id: 8,
      question: "How to save YouTube videos in different qualities?",
      answer: (
        <>
          <p>InstaSave offers multiple quality options for YouTube downloads:</p>
          <ul>
            <li>4K (2160p) Ultra HD quality</li>
            <li>1080p Full HD</li>
            <li>720p HD</li>
            <li>480p and 360p for smaller file sizes</li>
            <li>Audio-only MP3 format</li>
          </ul>
          <p>After pasting the YouTube URL, you'll see all available quality options for your video.</p>
        </>
      )
    },
    {
      id: 9,
      question: "Is it safe to download using InstaSave?",
      answer: (
        <>
          <p>Yes, InstaSave is completely safe to use:</p>
          <ul>
            <li>No software installation required</li>
            <li>No registration needed</li>
            <li>Secure HTTPS connection</li>
            <li>No personal data collection</li>
            <li>Ad-free experience</li>
          </ul>
        </>
      )
    },
    {
      id: 10,
      question: "How to download Instagram Stories anonymously?",
      answer: (
        <>
          <p>InstaSave allows you to download Instagram Stories without the creator knowing:</p>
          <ol>
            <li>Copy the profile URL or username</li>
            <li>Paste it into InstaSave</li>
            <li>Select the story you want to download</li>
            <li>Download anonymously in original quality</li>
          </ol>
          <p>The story owner won't know you've downloaded their content.</p>
        </>
      )
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="container">
      <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>
      <p className="faq-subtitle">
        Get answers about downloading from Instagram, Facebook, and YouTube using InstaSave. 
        Learn how to save Reels, Stories, Facebook videos, and YouTube content in HD quality. 
        Can't find what you're looking for? Contact us for help!
      </p>
      
      <div className="faq-list">
        {faqItems.map((item) => (
          <div key={item.id} className="faq-item">
            <button 
              className={`faq-question ${openQuestion === item.id ? 'active' : ''}`}
              onClick={() => toggleQuestion(item.id)}
              aria-expanded={openQuestion === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span>{item.question}</span>
              <img 
                src="/static/icons/arrow.svg" 
                alt="" 
                className={`faq-icon ${openQuestion === item.id ? 'active' : ''}`}
                width="24" 
                height="24" 
                aria-hidden="true"
              />
            </button>
            <div 
              id={`faq-answer-${item.id}`}
              className={`faq-answer ${openQuestion === item.id ? 'active' : ''}`}
              aria-hidden={openQuestion !== item.id}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ; 