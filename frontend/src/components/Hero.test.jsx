import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';
import { BrowserRouter } from 'react-router-dom';

describe('Hero Component', () => {
  it('renders the main heading correctly', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    
    // Using a regex to find text that might be broken up by spans
    expect(screen.getByText(/Handmade with Intention/i)).toBeInTheDocument();
  });

  it('renders the Explore the Collection button', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /Explore the Collection/i });
    expect(button).toBeInTheDocument();
  });
});
