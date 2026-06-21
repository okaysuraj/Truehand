import React from 'react';
import './HumanTouch.css';

const HumanTouch = () => {
  return (
    <section className="human-touch">
      <div className="container touch-container">
        <div className="touch-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l4 4-4 4-4-4 4-4z" />
            <path d="M12 10l4 4-4 4-4-4 4-4z" />
            <path d="M12 18l4 4-4 4-4-4 4-4z" />
          </svg>
        </div>
        <h2 className="touch-title">The Human Touch</h2>
        <p className="touch-text">
          In a <strong>world of mass production</strong>, we champion the slow, the deliberate, and the beautifully imperfect. Every piece on TrueHand carries the story of its maker—a testament to skill, patience, and the <strong>enduring value</strong> of human craftsmanship.
        </p>
        <button className="btn-secondary">Read Our Story</button>
      </div>
    </section>
  );
};

export default HumanTouch;
