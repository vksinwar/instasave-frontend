import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onPageChange }) => {
  const handleSectionClick = (section) => {
    onPageChange(section);
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li>
              <Link to="/video-downloader" className="footer__nav-link">
                VIDEO DOWNLOADER
              </Link>
            </li>
            <li>
              <Link to="/short-downloader" className="footer__nav-link">
                SHORT DOWNLOADER
              </Link>
            </li>
            <li>
              <Link to="/reels-downloader" className="footer__nav-link">
                REELS DOWNLOADER
              </Link>
            </li>
            <li>
              <Link to="/story-downloader" className="footer__nav-link">
                STORY DOWNLOADER
              </Link>
            </li>
          </ul>

          <ul className="footer__nav-list">
            <li>
              <Link to="/reels-downloader" className="footer__nav-link">
                HOW TO DOWNLOAD INSTAGRAM REELS
              </Link>
            </li>
            <li>
              <Link to="/video-downloader" className="footer__nav-link">
                HOW TO DOWNLOAD INSTAGRAM VIDEOS
              </Link>
            </li>
          </ul>

          <ul className="footer__nav-list">
            <li>
              <Link 
                to="/contact-us" 
                onClick={() => handleSectionClick('contact-section')} 
                className="footer__nav-link"
              >
                CONTACT US
              </Link>
            </li>
            <li>
              <Link 
                to="/privacy-policy" 
                onClick={() => handleSectionClick('privacy-section')} 
                className="footer__nav-link"
              >
                PRIVACY POLICY
              </Link>
            </li>
            <li>
              <Link 
                to="/terms-and-conditions" 
                onClick={() => handleSectionClick('terms-section')} 
                className="footer__nav-link"
              >
                TERMS & CONDITIONS
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__brand">
          <img src="/static/logo.svg" alt="InstaSave Logo" className="footer__logo" width="180" height="40" />
          <p className="footer__copyright">© 2020-2025 InstaSave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 