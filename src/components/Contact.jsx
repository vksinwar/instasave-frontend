import React from 'react';

function Contact() {
  return (
    <div className="container">
      <div className="contact-wrapper">
        <div className="contact-content">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            Have questions about our services? We're here to help! Our team is ready to assist you with any inquiries you might have.
          </p>
          <div className="contact-method">
            <img src="/static/icons/email.svg" alt="" className="contact-icon" width="24" height="24" />
            <a href="mailto:contact@instasave.world" className="contact-email">contact@instasave.world</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 