import React from 'react';
import Hero from '../components/Hero';
import CuratedCategories from '../components/CuratedCategories';
import HumanTouch from '../components/HumanTouch';
import NewArrivals from '../components/NewArrivals';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <CuratedCategories />
      <HumanTouch />
      <NewArrivals />
    </div>
  );
};

export default LandingPage;
