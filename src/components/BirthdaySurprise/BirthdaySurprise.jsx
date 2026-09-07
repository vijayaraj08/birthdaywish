import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  REVEAL_MESSAGES,
  BIRTHDAY_SURPRISE_MESSAGE,
} from './birthdaySurpriseData';
import './BirthdaySurprise.css';

export default function BirthdaySurprise() {
  // State machine: 'idle' | 'blackout' | 'loading' | 'error' | 'silence' | 'reveal' | 'gift' | 'opening' | 'message' | 'closing'
  const [surpriseStage, setSurpriseStage] = useState('idle');
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [errorIndex, setErrorIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(0);

  const timersRef = useRef([]);

  const addTimer = (fn, delay) => {
    const timer = setTimeout(fn, delay);
    timersRef.current.push(timer);
    return timer;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Keyboard accessibility: Escape to close surprise when message is visible
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && surpriseStage === 'message') {
        handleCloseSurprise();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [surpriseStage]);

  // Step 1: Start Surprise from Idle
  const handleStartSurprise = () => {
    clearAllTimers();
    setSurpriseStage('blackout');

    // Step 2: Blackout -> Loading (after 1000ms)
    addTimer(() => {
      setSurpriseStage('loading');
      setLoadingIndex(0);

      // Loading message 2
      addTimer(() => {
        setLoadingIndex(1);
      }, 1000);

      // Loading message 3
      addTimer(() => {
        setLoadingIndex(2);
      }, 2000);

      // Step 3: Loading -> Error (at 2800ms)
      addTimer(() => {
        setSurpriseStage('error');
        setErrorIndex(0);

        // Iterate through all funny error diagnostic lines
        const stepDelay = 650;
        for (let i = 1; i < ERROR_MESSAGES.length; i++) {
          addTimer(() => {
            setErrorIndex(i);
          }, i * stepDelay);
        }

        // Step 4: Error -> Silence
        const totalErrorDuration = (ERROR_MESSAGES.length + 1) * stepDelay + 500;
        addTimer(() => {
          setSurpriseStage('silence');

          // Step 5: Silence -> Reveal (at 1400ms after silence)
          addTimer(() => {
            setSurpriseStage('reveal');
            setRevealIndex(0);

            addTimer(() => {
              setRevealIndex(1);
            }, 800);

            addTimer(() => {
              setRevealIndex(2);
            }, 1700);

            // Step 6: Reveal -> Gift (at 2800ms after reveal start)
            addTimer(() => {
              setSurpriseStage('gift');
              // Automatic timers stop here! User must click the gift box.
            }, 2900);
          }, 1400);
        }, totalErrorDuration);
      }, 2800);
    }, 1000);
  };

  // Step 7: User clicks the gift box
  const handleOpenGift = () => {
    if (surpriseStage !== 'gift') return;
    setSurpriseStage('opening');

    // Opening animation duration (1600ms) -> Message appears
    addTimer(() => {
      setSurpriseStage('message');
    }, 1600);
  };

  // Step 11: Close button -> Transition to Page 9
  const handleCloseSurprise = () => {
    setSurpriseStage('closing');
    addTimer(() => {
      setSurpriseStage('idle');
      const target = document.getElementById('final-message-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="surprise-section" id="surprise-section">
      {/* Ambient background glow for default state */}
      <div className="surprise-ambient-glow" aria-hidden="true" />

      {/* Main Page 8 Container (Visible in 'idle' state) */}
      <div className="surprise-container">
        <motion.div
          className="surprise-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUpVariant} className="chapter-pill">
            <span className="pill-gift">🎁</span>
            <span>Chapter Seven</span>
            <span className="pill-gift">✦</span>
          </motion.div>

          <div className="opening-lead-dialogue">
            <motion.p variants={fadeUpVariant} className="open-line-1">
              Wait...
            </motion.p>
            <motion.h2 variants={fadeUpVariant} className="open-line-2">
              You thought that was the end?
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="open-line-3">
              Absolutely not. 😂
            </motion.p>
            <motion.p variants={fadeUpVariant} className="open-line-4">
              I still have one little surprise.
            </motion.p>
          </div>

          <motion.div variants={fadeUpVariant} className="show-me-trigger-box">
            <motion.button
              id="start-surprise-btn"
              className="show-me-btn"
              onClick={handleStartSurprise}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 35px rgba(96, 165, 250, 0.85), 0 0 70px rgba(59, 130, 246, 0.5)',
              }}
              whileTap={{ scale: 0.96 }}
              type="button"
            >
              <span className="btn-eyes">👀</span>
              <span className="btn-label">Okay... Show Me</span>
              <span className="btn-spark">✨</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* =================================================================
          CINEMATIC SURPRISE OVERLAY (Fullscreen Takeover)
          ================================================================= */}
      <AnimatePresence>
        {surpriseStage !== 'idle' && (
          <motion.div
            key="surprise-cinematic-overlay"
            className={`cinematic-surprise-overlay stage-${surpriseStage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Background Atmosphere Layers based on Stage */}
            <div className="cinematic-backdrop-layer" />
            {(surpriseStage === 'reveal' || surpriseStage === 'gift' || surpriseStage === 'opening' || surpriseStage === 'message') && (
              <>
                <motion.div
                  className="reveal-ambient-glow"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <div className="reveal-sparkles-field" aria-hidden="true">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className="star-sparkle"
                      style={{
                        top: `${(i * 19) % 94}%`,
                        left: `${(i * 23) % 94}%`,
                        animationDelay: `${(i * 0.35) % 2.5}s`,
                        animationDuration: `${2.2 + (i % 3) * 0.8}s`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Flash Effect on Box Opening */}
            {surpriseStage === 'opening' && (
              <motion.div
                className="opening-flash-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            )}

            {/* Content Container by Stage */}
            <div className="cinematic-content-stage">
              {/* STAGE 1: BLACKOUT */}
              {surpriseStage === 'blackout' && (
                <motion.div
                  key="stage-blackout"
                  className="stage-view-blackout"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* STAGE 2: LOADING SCREEN */}
              {surpriseStage === 'loading' && (
                <motion.div
                  key="stage-loading"
                  className="stage-view-loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="minimal-spinner-circle" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingIndex}
                      className="loading-step-text"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {LOADING_MESSAGES[loadingIndex]}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* STAGE 3: SYSTEM ERROR & CRASH */}
              {surpriseStage === 'error' && (
                <motion.div
                  key="stage-error"
                  className="stage-view-error glitch-shake-box"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, -5, 5, -3, 3, 0],
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="error-screen-card">
                    <div className="error-header-badge">
                      <span className="error-badge-icon">⚠️</span>
                      <span className="error-badge-text">ERROR</span>
                    </div>

                    <div className="error-lines-flow">
                      {ERROR_MESSAGES.slice(1, errorIndex + 1).map((msg, idx) => (
                        <motion.p
                          key={idx}
                          className={`error-dialogue-line ${idx === errorIndex - 1 ? 'line-latest' : ''}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {msg.text}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: SILENCE & TINY GROWING BLUE DOT */}
              {surpriseStage === 'silence' && (
                <motion.div
                  key="stage-silence"
                  className="stage-view-silence"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="silent-blue-dot"
                    initial={{ scale: 0.2, opacity: 0.3 }}
                    animate={{ scale: [0.2, 1.4, 2.8], opacity: [0.3, 0.9, 1] }}
                    transition={{ duration: 1.3, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}

              {/* STAGE 5: MYSTERIOUS REVEAL */}
              {surpriseStage === 'reveal' && (
                <motion.div
                  key="stage-reveal"
                  className="stage-view-reveal"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="reveal-lines-box">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={revealIndex}
                        className="reveal-dialogue-line"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                      >
                        {REVEAL_MESSAGES[revealIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* STAGE 6 & 7: 3D CSS GIFT BOX (Interactive) */}
              {(surpriseStage === 'gift' || surpriseStage === 'opening') && (
                <motion.div
                  key="stage-gift"
                  className="stage-view-gift"
                  initial={{ opacity: 0, scale: 0.85, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.p
                    className="gift-hint-top"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    I think this belongs to you. 🎁
                  </motion.p>

                  {/* 3D Modern CSS Gift Box */}
                  <div
                    className="gift-interactive-wrapper"
                    onClick={handleOpenGift}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenGift();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Open birthday gift"
                  >
                    <div className={`css-gift-3d-box ${surpriseStage === 'opening' ? 'box-opening-anim' : 'box-floating-anim'}`}>
                      {/* Box Lid & Ribbon */}
                      <div className="gift-box-lid">
                        <div className="lid-top-ribbon-v" />
                        <div className="lid-top-ribbon-h" />
                        <div className="gift-bow-wrapper">
                          <div className="bow-loop bow-loop-left" />
                          <div className="bow-loop bow-loop-right" />
                          <div className="bow-knot" />
                        </div>
                      </div>

                      {/* Box Body & Ribbon */}
                      <div className="gift-box-body">
                        <div className="body-ribbon-v" />
                        <div className="body-ribbon-h" />
                        <div className="box-inner-light" />
                      </div>

                      {/* Box Shadow */}
                      <div className="gift-box-shadow" />
                    </div>

                    {/* Particle Burst on Opening */}
                    {surpriseStage === 'opening' && (
                      <div className="opening-sparks-burst">
                        {[...Array(18)].map((_, idx) => (
                          <span
                            key={idx}
                            className="burst-particle"
                            style={{
                              transform: `rotate(${idx * 20}deg) translateY(-80px)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.p
                    className="gift-hint-bottom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {surpriseStage === 'opening' ? 'Opening surprise...' : 'Open me 🎁'}
                  </motion.p>
                </motion.div>
              )}

              {/* STAGE 8: CENTRED BIRTHDAY MESSAGE */}
              {surpriseStage === 'message' && (
                <motion.div
                  key="stage-message"
                  className="stage-view-message"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="birthday-message-card">
                    <motion.div
                      className="msg-badge"
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <span>{BIRTHDAY_SURPRISE_MESSAGE.badge}</span>
                    </motion.div>

                    <motion.h2
                      className="msg-main-heading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.7 }}
                    >
                      {BIRTHDAY_SURPRISE_MESSAGE.heading}
                    </motion.h2>

                    <motion.div
                      className="msg-body-lines"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <p className="msg-lead">{BIRTHDAY_SURPRISE_MESSAGE.lead}</p>
                      <p className="msg-body">{BIRTHDAY_SURPRISE_MESSAGE.body}</p>
                      <p className="msg-wish1">{BIRTHDAY_SURPRISE_MESSAGE.wish1}</p>
                      <div className="msg-final-wish-box">
                        <span className="msg-wish2">{BIRTHDAY_SURPRISE_MESSAGE.wish2}</span>
                        <p className="msg-wish3">{BIRTHDAY_SURPRISE_MESSAGE.wish3}</p>
                      </div>
                    </motion.div>

                    {/* Step 10: Close Button */}
                    <motion.div
                      className="close-btn-wrapper"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                    >
                      <motion.button
                        id="close-surprise-btn"
                        className="close-surprise-btn"
                        onClick={handleCloseSurprise}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 30px rgba(96, 165, 250, 0.7), 0 0 60px rgba(59, 130, 246, 0.35)',
                        }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                      >
                        <span>{BIRTHDAY_SURPRISE_MESSAGE.closeButtonText}</span>
                      </motion.button>
                      <p className="close-btn-hint">(Press Esc or click to continue)</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
