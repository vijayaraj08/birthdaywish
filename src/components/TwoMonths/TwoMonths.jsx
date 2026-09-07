import React from 'react';
import { motion } from 'framer-motion';
import './TwoMonths.css';

// Easily editable memory/stats items
const MEMORY_STATS = [
  {
    id: 1,
    icon: '☕',
    value: 'Kosmo Café',
    label: 'Where it all began with Cold Milo',
    highlight: false,
  },
  {
    id: 2,
    icon: '🍔',
    value: 'Flip Diner',
    label: 'Burgers, soups & late night mischief',
    highlight: false,
  },
  {
    id: 3,
    icon: '🌱',
    value: 'Ups & Downs',
    label: 'Struggles we pushed through together',
    highlight: false,
  },
  {
    id: 4,
    icon: '🚗',
    value: 'Hyderabad',
    label: 'From that first drink to the open road',
    highlight: true,
  },
];

// Timeline milestones
const TIMELINE_POINTS = [
  { id: 'kosmo', label: 'Kosmo Café', subtitle: 'The first Cold Milo ☕', icon: '☕' },
  { id: 'flip', label: 'Flip Diner', subtitle: 'Burgers, soups & mischief 🍔', icon: '🍔' },
  { id: 'struggles', label: 'Ups & Downs', subtitle: 'Stronger through it all 🌧️', icon: '🌱' },
  { id: 'trip', label: 'Hyderabad', subtitle: 'The road trip & memories 🚗', icon: '🚗' },
];

export default function TwoMonths() {
  // Stagger container variant for the entire section
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

  // Fade-up animation variant for text lines
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Card stagger variant
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.1 + i * 0.14,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Timeline container variant
  const timelineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Main quote variant
  const quoteVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 2.0,
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Bottom scroll indicator
  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.75,
      transition: {
        delay: 2.4,
        duration: 1.0,
      },
    },
  };

  return (
    <section className="two-months-section" id="two-months-section">
      {/* Subtle Nostalgic Ambient Glow Overlay */}
      <div className="section-ambient-glow" aria-hidden="true" />

      <motion.div
        className="two-months-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Step 1: Small Intro Text */}
        <motion.div variants={fadeUpVariant} className="intro-badge">
          <span className="sparkle-icon">✦</span>
          <span>Okay... let's go back a little. 💙</span>
          <span className="sparkle-icon">✦</span>
        </motion.div>

        {/* Step 2: Main Heading */}
        <motion.div variants={fadeUpVariant} className="heading-wrapper">
          <h2 className="two-months-title">
            <span className="title-prefix">Only </span>
            <span className="title-highlight">2 Months.</span>
          </h2>
        </motion.div>

        {/* Step 3 & 4 & 5: Subtle Narrative Text Sequence */}
        <motion.div variants={fadeUpVariant} className="narrative-wrapper">
          <p className="narrative-line short-line">That's it.</p>
          <p className="narrative-line pause-line">And yet...</p>
          <p className="narrative-line reveal-line">
            somehow, we already have so many memories.
          </p>
        </motion.div>

        {/* Step 6: Memory & Stats Glass Cards */}
        <div className="stats-grid">
          {MEMORY_STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`stat-card ${stat.highlight ? 'stat-card-featured' : ''}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow:
                  '0 12px 35px rgba(10, 25, 65, 0.7), 0 0 25px rgba(96, 165, 250, 0.35)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <div className="stat-icon-wrapper">
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <div className="card-shimmer-edge" />
            </motion.div>
          ))}
        </div>

        {/* Step 7: Artistic Friendship Timeline */}
        <motion.div
          className="timeline-container"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="timeline-track">
            {/* Glowing continuous line */}
            <motion.div
              className="timeline-line-glow"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7, duration: 1.2, ease: 'easeOut' }}
            />
            {TIMELINE_POINTS.map((point, index) => (
              <div key={point.id} className="timeline-node">
                <div className="node-dot-wrapper">
                  <span className="node-dot" />
                  <span className="node-pulse-ring" />
                </div>
                <div className="node-info">
                  <span className="node-title">{point.label}</span>
                  <span className="node-subtitle">{point.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 8: Main Emotional Quote */}
        <motion.div
          className="quote-container"
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="quote-mark">“</span>
          <p className="quote-text">
            Sometimes you don't need years to create memories that stay with you.
          </p>
          <span className="quote-mark">”</span>
        </motion.div>
      </motion.div>

      {/* Step 9: Bottom Scroll Cue ("There's more... ↓") */}
      <motion.div
        className="next-scroll-cue"
        variants={scrollIndicatorVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onClick={() => {
          const target = document.getElementById('hyderabad-section');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ cursor: 'pointer' }}
        title="Scroll to next memory"
      >
        <motion.div
          className="cue-inner"
          animate={{
            y: [0, 6, 0],
            opacity: [0.5, 0.95, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="cue-text">There's more...</span>
          <span className="cue-arrow">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
