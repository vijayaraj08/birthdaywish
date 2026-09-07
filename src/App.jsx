import React from 'react';
import Hero from './components/Hero/Hero';
import TwoMonths from './components/TwoMonths/TwoMonths';
import HyderabadTrip from './components/HyderabadTrip/HyderabadTrip';
import Memories from './components/Memories/Memories';
import AboutHer from './components/AboutHer/AboutHer';
import FriendshipWords from './components/FriendshipWords/FriendshipWords';
import Letter from './components/Letter/Letter';
import BirthdaySurprise from './components/BirthdaySurprise/BirthdaySurprise';
import FinalPage from './components/FinalPage/FinalPage';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
function App() {
  return (
    <main className="app-main">
      <Analytics />
      {/* Dynamic Animated Cosmos & Glow Background */}
      <BackgroundEffects />

      {/* Landing Page Hero Section */}
      <Hero />

      {/* Story Introduction: Two Months Section */}
      <TwoMonths />

      {/* Chapter Two: The Hyderabad Road Trip Section */}
      <HyderabadTrip />

      {/* Chapter Three: Our Favorite Memories Section */}
      <Memories />

      {/* Chapter Four: Things That Make You... You Section */}
      <AboutHer />

      {/* Chapter Five: If I Had To Describe Us - Floating Words Section */}
      <FriendshipWords />

      {/* Chapter Six: The Birthday Letter Section */}
      <Letter />

      {/* Chapter Seven: The Birthday Surprise Section */}
      <BirthdaySurprise />

      {/* Finale: One Last Thing - Final Birthday Message */}
      <FinalPage />
    </main>
  );
}

export default App;
