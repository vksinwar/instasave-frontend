import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const scrollToFormSection = () => {
      const formElement = document.getElementById('form-block');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Handle scrolling based on path
    if (location.pathname.includes('-downloader')) {
      scrollToFormSection();
    }

    // Set active section based on path
    if (location.pathname === '/privacy-policy') {
      setActiveSection('privacy-section');
    } else if (location.pathname === '/terms-and-conditions') {
      setActiveSection('terms-section');
    } else if (location.pathname === '/contact-us') {
      setActiveSection('contact-section');
    }
  }, [location.pathname]);

  const handlePageChange = (section) => {
    const element = document.querySelector(`.${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent activeSection={activeSection} />} />
        <Route path="/video-downloader" element={<MainContent type="video" activeSection={activeSection} />} />
        <Route path="/short-downloader" element={<MainContent type="short" activeSection={activeSection} />} />
        <Route path="/reels-downloader" element={<MainContent type="reel" activeSection={activeSection} />} />
        <Route path="/story-downloader" element={<MainContent type="story" activeSection={activeSection} />} />
        <Route path="/privacy-policy" element={<MainContent activeSection="privacy-section" />} />
        <Route path="/terms-and-conditions" element={<MainContent activeSection="terms-section" />} />
        <Route path="/contact-us" element={<MainContent activeSection="contact-section" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer onPageChange={handlePageChange} />
    </>
  );
}

export default App; 