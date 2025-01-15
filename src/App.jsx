import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

/**
 * Error Boundary component to catch and handle React errors gracefully
 * @extends {React.Component<{ children: React.ReactNode }, { hasError: boolean }>}
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state when an error occurs
   * @param {Error} error The error that was caught
   * @returns {{ hasError: boolean }} New state
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Log error details when caught
   * @param {Error} error The error that was caught
   * @param {React.ErrorInfo} errorInfo Additional error information
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main App component
 * @returns {JSX.Element}
 */
function App() {
  const [activeSection, setActiveSection] = useState('form-block');

  const handlePageChange = useCallback((section) => {
    try {
      setActiveSection(section);
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Section with id "${section}" not found`);
      }
    } catch (error) {
      console.error('Error changing section:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Header />
      <MainContent activeSection={activeSection} />
      <Footer onPageChange={handlePageChange} />
    </ErrorBoundary>
  );
}

export default App; 