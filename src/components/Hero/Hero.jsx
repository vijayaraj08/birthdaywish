import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const handleStartStory = () => {
    console.log("Story Started");
    const target = document.getElementById('two-months-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.38,
        delayChildren: 0.3,
      },
    },
  };

  // Child element motion variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Button specific motion variant
  const buttonVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.94, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Bottom scroll indicator variant
  const indicatorVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 0.7,
      y: 0,
      transition: {
        delay: 2.1,
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="hero-section" id="hero-section">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Soft floating decorative badge */}
        <motion.div variants={itemVariants} className="hero-pill-badge">
          <span className="badge-sparkle">✦</span>
          <span>A little gift for you</span>
          <span className="badge-sparkle">✦</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          Hey You... <span className="blue-heart">💙</span>
        </motion.h1>

        {/* Subtitle 1 */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          I made something special for you.
        </motion.p>

        {/* Subtitle 2 / Emotional Journey Line */}
        <motion.p variants={itemVariants} className="hero-caption">
          Just a small journey through a few memories...
        </motion.p>

        {/* Interactive Start Story Button */}
        <motion.div variants={buttonVariants} className="hero-button-wrapper">
          <motion.button
            id="start-story-btn"
            className="start-story-button"
            onClick={handleStartStory}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 35px rgba(96, 165, 250, 0.75), 0 0 70px rgba(59, 130, 246, 0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            aria-label="Start the Story"
          >
            {/* Shimmer light sweep on the button */}
            <span className="button-shimmer" />
            <span className="button-text">Start the Story ✨</span>
            <span className="button-glow-ring" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Decorative Element */}
      <motion.div
        className="scroll-indicator"
        variants={indicatorVariants}
        initial="hidden"
        animate="visible"
        onClick={handleStartStory}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        title="Scroll down to begin the story"
      >
        <motion.div
          className="indicator-inner"
          animate={{
            y: [0, 7, 0],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="indicator-text">the story begins here</span>
          <span className="indicator-arrow">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
