import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import FeatureCards from '../components/FeatureCards';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <FeatureCards />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
