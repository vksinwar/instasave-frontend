import React from 'react';

const Footer = ({ onPageChange }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__nav">
          <nav className="footer__nav-grid footer__nav-grid--secondary">
            <a href="#" className="footer__nav-link">VIDEO DOWNLOADER</a>
            <a href="#" className="footer__nav-link">SHORT DOWNLOADER</a>
            <a href="#" className="footer__nav-link">REELS DOWNLOADER</a>
            <a href="#" className="footer__nav-link">STORY DOWNLOADER</a>
          </nav>
          <nav className="footer__nav-grid footer__nav-grid--tertiary">
            <a href="#how-to-photos" className="footer__nav-link">HOW TO DOWNLOAD INSTAGRAM REELS</a>
            <a href="#how-to-videos" className="footer__nav-link">HOW TO DOWNLOAD INSTAGRAM VIDEOS</a>
            <a href="#contact-section" onClick={(e) => { e.preventDefault(); onPageChange('contact-section'); }} className="footer__nav-link">CONTACT</a>
            <a href="#privacy-section" onClick={(e) => { e.preventDefault(); onPageChange('privacy-section'); }} className="footer__nav-link">PRIVACY POLICY</a>
            <a href="#terms-section" onClick={(e) => { e.preventDefault(); onPageChange('terms-section'); }} className="footer__nav-link">TERMS & CONDITIONS</a>
          </nav>
        </div>

        <div className="footer__brand">
          <img src="/static/logo.svg" alt="InstaSave Logo" className="footer__logo" width="180" height="40" />
          <p className="footer__copyright">© 2020-2025 InstaSave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 