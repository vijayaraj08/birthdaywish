import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FLOATING_WORDS,
  LITTLE_THINGS_LINES,
  STATUS_REPORT,
} from './friendshipWordsData';
import './FriendshipWords.css';

export default function FriendshipWords() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [interactedCount, setInteractedCount] = useState(0);

  const handleWordClick = (wordObj) => {
    if (selectedWord?.id === wordObj.id) {
      setSelectedWord(null);
    } else {
      setSelectedWord(wordObj);
      setInteractedCount((prev) => prev + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="friendship-words-section" id="friendship-words-section">
      {/* Ambient Blue Deep Cosmic Glow & Floating Dots */}
      <div className="words-ambient-glow" aria-hidden="true" />
      <div className="words-particle-mesh" aria-hidden="true" />

      <div className="friendship-words-container">
        {/* =================================================================
            1. Section Header & Cinematic Intro
            ================================================================= */}
        <motion.div
          className="words-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUpVariant} className="chapter-pill">
            <span className="pill-spark">✦</span>
            <span>Chapter Five</span>
            <span className="pill-spark">✦</span>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="words-lead-tag">
            IF I HAD TO DESCRIBE US...
          </motion.p>

          <motion.h2 variants={fadeUpVariant} className="words-main-title">
            A Few Words.
          </motion.h2>

          <motion.h3 variants={fadeUpVariant} className="words-subtitle">
            One Unexpected Friendship.
          </motion.h3>

          <div className="words-intro-narrative">
            <motion.p variants={fadeUpVariant} className="intro-line-1">
              We haven't known each other forever...
            </motion.p>
            <motion.p variants={fadeUpVariant} className="intro-line-2">
              ...but somehow, this little friendship already has its own collection of memories.
            </motion.p>
          </div>
        </motion.div>

        {/* =================================================================
            2. Interactive Floating Word Universe
            ================================================================= */}
        <div className="floating-universe-wrapper">
          <div className="universe-instruction">
            <span className="universe-hint-icon">👆</span>
            <span>Tap any floating word to discover its story</span>
          </div>

          <div className="floating-words-cloud">
            {FLOATING_WORDS.map((item, index) => {
              const isSelected = selectedWord?.id === item.id;
              const isDimmed = selectedWord && !isSelected;

              return (
                <motion.button
                  key={item.id}
                  className={`floating-word-pill size-${item.size} ${
                    isSelected ? 'word-selected' : ''
                  } ${isDimmed ? 'word-dimmed' : ''}`}
                  onClick={() => handleWordClick(item)}
                  type="button"
                  style={{
                    color: item.color,
                    '--glow-color': item.glowColor,
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay }}
                  animate={{
                    y: isSelected ? 0 : [0, -6 + (index % 4) * 2, 0],
                    x: isSelected ? 0 : [0, 4 - (index % 3) * 2, 0],
                    rotate: isSelected ? 0 : [-1.5 + (index % 3), 1.5 - (index % 3), -1.5 + (index % 3)],
                  }}
                  transition={{
                    y: { duration: 3.8 + (index % 3) * 0.8, repeat: Infinity, ease: 'easeInOut' },
                    x: { duration: 4.5 + (index % 2) * 1.2, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 5 + (index % 2) * 1.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.12, zIndex: 30 }}
                  whileTap={{ scale: 0.96 }}
                  aria-pressed={isSelected}
                >
                  <span className="word-text">{item.word}</span>
                  {isSelected && <span className="word-active-star">✦</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Selected Word Details Panel */}
          <AnimatePresence mode="wait">
            {selectedWord && (
              <motion.div
                key={selectedWord.id}
                className="selected-word-spotlight"
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="spotlight-close-btn"
                  onClick={() => setSelectedWord(null)}
                  aria-label="Close word details"
                  type="button"
                >
                  ✕
                </button>

                <div className="spotlight-badge">
                  <span className="spotlight-spark">✦</span>
                  <span>{selectedWord.word}</span>
                </div>

                <p className="spotlight-description">{selectedWord.description}</p>
                <span className="spotlight-subhint">Click another word or close</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =================================================================
            3. Center Transformation ("It's all the little things.")
            ================================================================= */}
        <motion.div
          className="center-transformation-section"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0 }}
        >
          <div className="transformation-lead-box">
            <p className="trans-lead-1">Maybe that's what makes it special.</p>
            <p className="trans-lead-2">It's not one big thing.</p>
            <h3 className="trans-lead-3">It's all the little things.</h3>
          </div>

          <div className="little-things-grid">
            {LITTLE_THINGS_LINES.map((line, idx) => (
              <motion.div
                key={line}
                className="little-thing-pill"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.12 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 8px 24px rgba(96, 165, 250, 0.35)',
                }}
              >
                <span className="thing-sparkle">✦</span>
                <span className="thing-text">{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            4. Main Message & Cinematic Typography
            ================================================================= */}
        <motion.div
          className="main-message-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="main-message-card">
            <motion.p variants={fadeUpVariant} className="msg-line-quiet">
              Maybe I don't need a perfect word to describe our friendship.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="msg-line-lead">
              Because some friendships aren't planned.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="msg-line-happen">
              Some just... <span className="happen-sparkle">✨ happen.</span>
            </motion.p>

            <div className="climax-three-lines">
              <motion.span variants={fadeUpVariant} className="climax-part part-1">
                One random day.
              </motion.span>
              <motion.span variants={fadeUpVariant} className="climax-part part-2">
                One unexpected friendship.
              </motion.span>
              <motion.span variants={fadeUpVariant} className="climax-part part-3">
                A ridiculous amount of memories.
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            5. Playful Fake System / Status Report
            ================================================================= */}
        <motion.div
          className="status-report-section"
          initial={{ opacity: 0, scale: 0.96, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.05 }}
        >
          <div className="status-hud-card">
            <div className="hud-top-bar">
              <div className="hud-dots">
                <span className="hud-dot dot-red" />
                <span className="hud-dot dot-yellow" />
                <span className="hud-dot dot-green" />
              </div>
              <span className="hud-title">SYSTEM STATUS // FRIENDSHIP TELEMETRY</span>
              <span className="hud-live-tag">LIVE ●</span>
            </div>

            <div className="hud-header-text">
              <span className="hud-lead-icon">📋</span>
              <h4 className="hud-heading">Officially speaking...</h4>
            </div>

            <div className="hud-rows-list">
              {STATUS_REPORT.map((row, idx) => (
                <motion.div
                  key={row.label}
                  className="hud-row"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="hud-row-left">
                    <span className="hud-row-icon">{row.icon}</span>
                    <span className="hud-row-label">{row.label}</span>
                  </div>
                  <div className="hud-row-right">
                    <span className="hud-row-value">{row.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            6. Final Minimal Quote
            ================================================================= */}
        <motion.div
          className="words-final-quote-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUpVariant} className="final-quote-line-1">
            "Sometimes you don't need years to know that someone is going to become a good memory."
          </motion.p>
          <motion.p variants={fadeUpVariant} className="final-quote-line-2">
            And sometimes...
          </motion.p>
          <motion.h4 variants={fadeUpVariant} className="final-quote-line-3">
            the best stories start without much planning at all. <span className="blue-heart">💙</span>
          </motion.h4>
        </motion.div>

        {/* =================================================================
            7. Transition to Next Page (Page 7 - The Letter)
            ================================================================= */}
        <motion.div
          className="words-transition-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
        >
          <div className="transition-dialogue">
            <p className="trans-step-1">Okay...</p>
            <p className="trans-step-2">I've said enough for now.</p>
            <p className="trans-step-3">But there is something I haven't told you yet.</p>
            <p className="trans-step-4">And this time...</p>
            <p className="trans-step-5">I want to say it properly.</p>
          </div>

          <motion.button
            id="open-letter-btn"
            className="letter-transition-btn"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 35px rgba(96, 165, 250, 0.75), 0 0 60px rgba(59, 130, 246, 0.4)',
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              const target = document.getElementById('letter-section');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                console.log("Navigating to Page 7 — The Letter");
              }
            }}
            type="button"
          >
            <span className="btn-letter-icon">✉️</span>
            <span className="btn-letter-text">There's a Letter for You</span>
            <span className="btn-letter-arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
