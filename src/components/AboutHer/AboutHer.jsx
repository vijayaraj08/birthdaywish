import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PERSONALITY_TRAITS,
  LEARNED_ITEMS,
  FRIENDSHIP_METERS,
} from './aboutHerData';
import './AboutHer.css';

export default function AboutHer() {
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  // Stagger container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Fade up variant
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="about-her-section" id="about-her-section">
      {/* Dynamic Ambient Glow & Geometric Particle Effects */}
      <div className="about-her-ambient-glow" aria-hidden="true" />
      <div className="abstract-shape shape-orb-1" aria-hidden="true" />
      <div className="abstract-shape shape-orb-2" aria-hidden="true" />
      <div className="abstract-shape shape-ring-1" aria-hidden="true" />

      <div className="about-her-container">
        {/* =================================================================
            1. Section Header & Cinematic Reveal
            ================================================================= */}
        <motion.div
          className="about-her-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUpVariant} className="chapter-pill">
            <span className="chapter-sparkle">✦</span>
            <span>Chapter Four</span>
            <span className="chapter-sparkle">✦</span>
          </motion.div>

          {/* Stepped intro dialogue */}
          <div className="dialogue-lines">
            <motion.p variants={fadeUpVariant} className="dialogue-step step-1">
              Okay...
            </motion.p>
            <motion.p variants={fadeUpVariant} className="dialogue-step step-2">
              Enough about the memories.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="dialogue-step step-3">
              Let's talk about YOU. <span className="blue-heart">💙</span>
            </motion.p>
          </div>

          <motion.h2 variants={fadeUpVariant} className="about-her-title">
            THINGS THAT MAKE YOU... <span className="script-you">YOU</span>
          </motion.h2>

          <div className="intro-exposé-box">
            <motion.p variants={fadeUpVariant} className="expose-lead">
              I've gotten to know you enough to notice a few things...
            </motion.p>
            <motion.p variants={fadeUpVariant} className="expose-middle">
              ...and yes, I'm going to expose you a little. 😂
            </motion.p>
          </div>
        </motion.div>

        {/* =================================================================
            2. Personality Cards Grid (Pure Abstract & UI - No Photos)
            ================================================================= */}
        <div className="personality-grid">
          {PERSONALITY_TRAITS.map((trait, idx) => (
            <motion.div
              key={trait.id}
              className="personality-card"
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow:
                  '0 20px 45px rgba(2, 6, 20, 0.85), 0 0 35px rgba(96, 165, 250, 0.4)',
              }}
            >
              {/* Abstract subtle glowing background orb */}
              <div
                className="card-glow-backdrop"
                style={{ background: trait.accentColor }}
                aria-hidden="true"
              />

              {/* Card Header with Icon and Tag */}
              <div className="card-top-row">
                <div className="card-icon-container">
                  <span className="card-icon">{trait.icon}</span>
                </div>
                <span className="card-tag-pill">{trait.tag}</span>
              </div>

              {/* Title & Description */}
              <h3 className="card-trait-title">{trait.title}</h3>
              <p className="card-trait-desc">{trait.description}</p>

              {/* Subtle bottom decorative line */}
              <div className="card-bottom-line" />
            </motion.div>
          ))}
        </div>

        {/* =================================================================
            3. Interactive "Reveal" Card
            ================================================================= */}
        <motion.div
          className="secret-reveal-section"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95 }}
        >
          <div className="secret-card">
            <div className="secret-card-header">
              <span className="secret-sparkle-icon">✨</span>
              <p className="secret-prompt">There's probably more I could say...</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSecretRevealed ? (
                <motion.div
                  key="button-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    className="reveal-trigger-btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(96, 165, 250, 0.65)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsSecretRevealed(true)}
                    type="button"
                  >
                    <span>Okay, one more thing</span>
                    <span className="btn-arrow-right">→</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed-state"
                  className="revealed-content-box"
                  initial={{ opacity: 0, height: 0, y: 15 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="revealed-text-main">
                    "Whether you do these things for everyone or not, I don't know. But I know how they made me feel — and that is what makes you so special to me."
                  </p>
                  <p className="revealed-text-sub">
                    Her smile, her songs, her trust, and everything in between. <span className="blue-heart">💙</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =================================================================
            4. Playful Subsection: "Things I've already learned about you..."
            ================================================================= */}
        <motion.div
          className="learned-section"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0 }}
        >
          <div className="learned-header">
            <span className="learned-badge-icon">💡</span>
            <h3 className="learned-title">Things I've already learned about you...</h3>
            <p className="learned-subtitle">The official field notes 📝</p>
          </div>

          <div className="learned-list">
            {LEARNED_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                className="learned-item-pill"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                whileHover={{ x: 6, backgroundColor: 'rgba(20, 42, 98, 0.65)' }}
              >
                <span className="learned-num-badge">{item.num}</span>
                <span className="learned-text">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            5. Playful "Official Friendship Analysis" Rating Panel
            ================================================================= */}
        <motion.div
          className="analysis-section"
          initial={{ opacity: 0, scale: 0.95, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.05 }}
        >
          <div className="analysis-card">
            <div className="analysis-header">
              <span className="analysis-icon">📊</span>
              <h3 className="analysis-title">Official Friendship Analysis</h3>
              <span className="analysis-badge">Verified ✓</span>
            </div>

            <div className="meters-container">
              {FRIENDSHIP_METERS.map((meter, index) => (
                <div key={meter.id} className="meter-row">
                  <div className="meter-label-row">
                    <span className="meter-label">{meter.label}</span>
                    <span className="meter-value">
                      {meter.percentage}%
                      {meter.note && <span className="meter-note"> ({meter.note})</span>}
                    </span>
                  </div>
                  <div className="meter-bar-track">
                    <motion.div
                      className="meter-bar-fill"
                      style={{ backgroundColor: meter.barColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${meter.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2 + index * 0.12, ease: 'easeOut' }}
                    >
                      <span className="meter-glow-head" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            6. Main Cinematic Quote
            ================================================================= */}
        <motion.div
          className="about-her-quote-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="quote-cinematic-wrapper">
            <motion.p variants={fadeUpVariant} className="quote-stagger-line line-a">
              Some people are easy to meet.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="quote-stagger-line line-b">
              Some people are easy to talk to.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="quote-stagger-line line-c">
              And then there are those rare people...
            </motion.p>
            <motion.p variants={fadeUpVariant} className="quote-stagger-line line-d">
              ...who somehow become easy to keep in your life.
            </motion.p>
            <motion.h4 variants={fadeUpVariant} className="quote-climax-line">
              You're one of those people. <span className="blue-heart">💙</span>
            </motion.h4>
          </div>
        </motion.div>

        {/* =================================================================
            7. Section Transition at Bottom
            ================================================================= */}
        <motion.div
          className="about-her-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
        >
          <p className="footer-compliment-line">
            Okay... that's enough compliments for now. 😂
          </p>
          <p className="footer-not-done-line">But we're not done yet.</p>
          <p className="footer-still-want-line">
            There's something I still want to tell you...
          </p>

          <motion.div
            className="continue-cue-box"
            animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => {
              const target = document.getElementById('friendship-words-section');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ cursor: 'pointer' }}
            title="Continue to the next chapter"
          >
            <span className="continue-btn-text">Continue</span>
            <span className="continue-arrow">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
