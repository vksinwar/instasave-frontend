import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
      <div className="max-w-2xl mx-auto">
        <p className="mb-6">
          Have questions or feedback? We'd love to hear from you. Get in touch with our team using the information below.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600">support@instasave.com</p>
            </div>
            <div>
              <h3 className="font-medium">Response Time</h3>
              <p className="text-gray-600">We typically respond within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 