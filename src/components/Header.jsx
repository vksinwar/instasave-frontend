import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { languages } from '../data/languages';

function Header() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const handleLanguageChange = (code, name) => {
    setCurrentLanguage(name);
    setShowLanguageDropdown(false);
    // TODO: Implement language change functionality
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link to="/" aria-label="Home">
              <img src="/static/logo.svg" alt="InstaSave Logo" width="180" height="40" loading="lazy" />
            </Link>
          </div>
          <div className="language-selector">
            <button 
              className="language-select-btn" 
              aria-label="Select Language"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span>{currentLanguage}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" fill="currentColor"/>
              </svg>
            </button>
            
            {showLanguageDropdown && (
              <div className="language-dropdown">
                <div className="language-grid">
                  {Object.entries(languages).map(([code, { name, flag }]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code, name)}
                      className="language-option"
                    >
                      <img src={`/static/flags/${flag}.svg`} alt={name} />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 