import React, { Suspense, lazy } from 'react';
import DownloadForm from './DownloadForm';
import HowTo from './HowTo';
import FAQ from './FAQ';

// Lazy load non-critical components
const Contact = lazy(() => import('./Contact'));
const Privacy = lazy(() => import('./Privacy'));
const Terms = lazy(() => import('./Terms'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-container" aria-label="Loading content">
    <div className="loading-spinner" role="progressbar"></div>
  </div>
);

/**
 * @typedef {'form-block' | 'contact-section' | 'privacy-section' | 'terms-section'} SectionType
 * @param {{ activeSection: SectionType }} props
 */
const MainContent = React.memo(({ activeSection }) => {
  return (
    <main id="main-content" role="main">
      <h1 className="visually-hidden">InstaSave - Instagram Video Downloader</h1>
      
      <article className="form-block" id="form-block">
        <h2 className="visually-hidden">Download Instagram Content</h2>
        <DownloadForm />
      </article>

      <article className="how-to">
        <h2 className="visually-hidden">How to Download Instagram Content</h2>
        <HowTo />
      </article>

      <article className="faq-section">
        <h2 className="visually-hidden">Frequently Asked Questions</h2>
        <FAQ />
      </article>

      <Suspense fallback={<LoadingFallback />}>
        {activeSection === 'contact-section' && (
          <article className="contact-section active" id="contact-section">
            <h2 className="visually-hidden">Contact Us</h2>
            <Contact />
          </article>
        )}

        {activeSection === 'privacy-section' && (
          <article className="privacy-section active" id="privacy-section">
            <h2 className="visually-hidden">Privacy Policy</h2>
            <Privacy />
          </article>
        )}

        {activeSection === 'terms-section' && (
          <article className="terms-section active" id="terms-section">
            <h2 className="visually-hidden">Terms and Conditions</h2>
            <Terms />
          </article>
        )}
      </Suspense>
    </main>
  );
});

MainContent.displayName = 'MainContent';

export default MainContent; 