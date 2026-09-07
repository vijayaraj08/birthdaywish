import React from 'react';
import { motion } from 'framer-motion';
import {
  LETTER_OPENING,
  LETTER_PARAGRAPHS,
  POSTSCRIPT_NOTE,
  LETTER_FINALE,
} from './letterData';
import './Letter.css';

export default function Letter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.15,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const paragraphReveal = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="letter-section" id="letter-section">
      {/* Ambient Quiet Night Sky Glow & Starry Dust */}
      <div className="letter-ambient-glow" aria-hidden="true" />
      <div className="letter-night-stars" aria-hidden="true" />

      <div className="letter-container">
        {/* =================================================================
            1. Opening / Quiet Cinematic Entrance
            ================================================================= */}
        <motion.div
          className="letter-entrance-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Glowing Beacon Dot that expands */}
          <motion.div
            className="quiet-beacon-orb"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span className="beacon-core" />
            <span className="beacon-pulse" />
          </motion.div>

          <motion.div variants={fadeUpVariant} className="chapter-pill">
            <span className="pill-star">✦</span>
            <span>Chapter Six</span>
            <span className="pill-star">✦</span>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="entrance-quiet-lead">
            Okay...
          </motion.p>

          <motion.h2 variants={fadeUpVariant} className="entrance-serious-title">
            Here comes the serious part. <span className="blue-heart">💙</span>
          </motion.h2>

          <div className="entrance-rule-lines">
            <motion.p variants={fadeUpVariant} className="rule-item">
              No jokes.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="rule-item">
              No chaos.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="rule-item">
              No dramatic friendship analysis. 😂
            </motion.p>
          </div>

          <motion.p variants={fadeUpVariant} className="entrance-final-cue">
            Just something I wanted to tell you.
          </motion.p>

          <motion.div
            className="entrance-scroll-down"
            animate={{ y: [0, 6, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="scroll-arrow">↓</span>
          </motion.div>
        </motion.div>

        {/* =================================================================
            2. The Digital Handwritten Letter Paper
            ================================================================= */}
        <motion.div
          className="letter-paper-wrapper"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Decorative Stamp & Washi Tape */}
          <div className="letter-wax-seal" aria-hidden="true">
            <span>💙</span>
          </div>

          <article className="letter-parchment-sheet">
            {/* Salutation */}
            <motion.header
              className="letter-header"
              variants={paragraphReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="letter-salutation">{LETTER_OPENING.salutation}</h3>
            </motion.header>

            {/* Letter Intro Sequence */}
            <motion.div
              className="letter-paragraph intro-paragraph"
              variants={paragraphReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="intro-lead-text">{LETTER_OPENING.introLead}</p>
              <p>{LETTER_OPENING.introTimeline}</p>
              <p className="intro-pause-text">{LETTER_OPENING.introPause}</p>
              <p className="intro-climax-text">{LETTER_OPENING.introClimax}</p>
            </motion.div>

            {/* Main Letter Paragraphs */}
            <div className="letter-body-flow">
              {LETTER_PARAGRAPHS.map((p) => {
                if (p.type === 'highlight') {
                  return (
                    <motion.div
                      key={p.id}
                      className="letter-highlight-moment"
                      variants={paragraphReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <span className="highlight-lead">{p.lead}</span>
                      <h4 className="highlight-climax">{p.climax}</h4>
                      <div className="highlight-divider" />
                    </motion.div>
                  );
                }

                if (p.type === 'lines') {
                  return (
                    <motion.div
                      key={p.id}
                      className="letter-paragraph lines-paragraph"
                      variants={paragraphReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      {p.lines.map((line, lIdx) => (
                        <p key={lIdx} className="flow-line">
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  );
                }

                if (p.type === 'appreciations') {
                  return (
                    <motion.div
                      key={p.id}
                      className="letter-paragraph appreciations-paragraph"
                      variants={paragraphReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <p className="apprec-intro">{p.intro}</p>
                      <ul className="apprec-list">
                        {p.points.map((pt, ptIdx) => (
                          <li key={ptIdx} className="apprec-item">
                            <span className="apprec-bullet">✦</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                }

                if (p.type === 'birthday_wishes') {
                  return (
                    <motion.div
                      key={p.id}
                      className="letter-paragraph birthday-wishes-paragraph"
                      variants={paragraphReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <p className="wishes-lead">{p.lead}</p>
                      <div className="wishes-list">
                        {p.wishes.map((w, wIdx) => (
                          <p key={wIdx} className="wish-line">
                            {w}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                if (p.type === 'closing') {
                  return (
                    <motion.div
                      key={p.id}
                      className="letter-paragraph closing-paragraph"
                      variants={paragraphReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <h4 className="closing-signoff">{p.signoff}</h4>
                      <p className="closing-thank-you">{p.thankYou}</p>
                    </motion.div>
                  );
                }

                // Standard paragraph
                return (
                  <motion.div
                    key={p.id}
                    className="letter-paragraph standard-paragraph"
                    variants={paragraphReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <p>{p.content}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Subtle Stationery Watermark */}
            <div className="sheet-watermark" aria-hidden="true">
              <span>FOR YOU 💙</span>
            </div>
          </article>
        </motion.div>

        {/* =================================================================
            3. Handwritten P.S. Note
            ================================================================= */}
        <motion.div
          className="postscript-note-wrapper"
          initial={{ opacity: 0, rotate: -2, y: 30 }}
          whileInView={{ opacity: 1, rotate: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
        >
          <div className="ps-washi-tape" />
          <div className="ps-card-inner">
            <h4 className="ps-heading">{POSTSCRIPT_NOTE.header}</h4>
            <div className="ps-lines-flow">
              {POSTSCRIPT_NOTE.lines.map((line, idx) => (
                <p key={idx} className="ps-line">
                  {line}
                </p>
              ))}
            </div>
            <p className="ps-signature">{POSTSCRIPT_NOTE.signature}</p>
          </div>
        </motion.div>

        {/* =================================================================
            4. Letter Finale & Transition to Page 8
            ================================================================= */}
        <motion.div
          className="letter-finale-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="finale-dialogue">
            <motion.p variants={fadeUpVariant} className="finale-step-1">
              {LETTER_FINALE.line1}
            </motion.p>
            <motion.p variants={fadeUpVariant} className="finale-step-2">
              {LETTER_FINALE.line2}
            </motion.p>
            <motion.p variants={fadeUpVariant} className="finale-step-3">
              {LETTER_FINALE.line3}
            </motion.p>
            <motion.h4 variants={fadeUpVariant} className="finale-step-4">
              {LETTER_FINALE.line4}
            </motion.h4>
          </div>

          <motion.div variants={fadeUpVariant} className="finale-button-wrapper">
            <motion.button
              id="goto-surprise-btn"
              className="next-thing-btn"
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 35px rgba(96, 165, 250, 0.8), 0 0 65px rgba(59, 130, 246, 0.45)',
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const target = document.getElementById('surprise-section');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.log("Navigating to Page 8 — The Surprise");
                }
              }}
              type="button"
            >
              <span className="btn-spark-left">✨</span>
              <span className="btn-text">{LETTER_FINALE.buttonLabel}</span>
              <span className="btn-arrow-right">→</span>
            </motion.button>
            <p className="finale-button-hint">{LETTER_FINALE.buttonHint}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
