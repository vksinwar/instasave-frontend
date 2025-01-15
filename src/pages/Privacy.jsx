import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto prose">
        <p className="mb-4">
          Last updated: January 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>
            We collect minimal information necessary to provide our service. This includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>URLs of content you want to download</li>
            <li>Basic usage statistics</li>
            <li>Technical information about your browser and device</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>
            We use the collected information solely to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process your download requests</li>
            <li>Improve our service</li>
            <li>Maintain service security</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 