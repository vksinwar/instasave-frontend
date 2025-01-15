import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="max-w-3xl mx-auto prose">
        <p className="mb-4">
          Last updated: January 15, 2024
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using InstaSave, you accept and agree to be bound by the terms and conditions outlined here.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p>
            You agree to use our service only for lawful purposes and in accordance with these terms. You are responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Ensuring you have the right to download content</li>
            <li>Using downloaded content in compliance with applicable laws</li>
            <li>Not using our service for any illegal activities</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Terms; 