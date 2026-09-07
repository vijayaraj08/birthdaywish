import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HyderabadTrip.css';

// Easily editable trip timeline milestones
const TIMELINE_STEPS = [
  { id: 'start', label: 'Start', icon: '🚗', title: 'The Beginning' },
  { id: 'journey', label: 'The Journey', icon: '🛣️', title: 'Open Highways' },
  { id: 'hyderabad', label: 'Hyderabad', icon: '📍', title: 'City Lights' },
  { id: 'memories', label: 'The Memories', icon: '📸', title: 'Captured Moments' },
  { id: 'chaos', label: 'The Chaos', icon: '😂', title: 'Unplanned Fun' },
  { id: 'favorite', label: 'Favorite', icon: '💙', title: 'Unforgettable' },
];

// Easily editable memory photos
const MAIN_MEMORIES = [
  {
    id: 1,
    src: '/hyd trip starts.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
    caption: 'When the road started... Highway sunrise 🌅',
    tag: 'Trip Begins 🚗',
    tilt: '-3deg',
    timelineRef: 'journey',
  },
  {
    id: 2,
    src: '/earlymorningride.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1e40af, #172554)',
    caption: 'Early morning ride vibes on the highway 🛣️',
    tag: 'Early Morning Ride 🛣️',
    tilt: '2.5deg',
    timelineRef: 'journey',
  },
  {
    id: 3,
    src: '/golconda in rain.jpeg',
    fallbackBg: 'linear-gradient(135deg, #2563eb, #1e293b)',
    caption: 'Golconda Fort in the rain — unplanned & unforgettable 🌧️',
    tag: 'Golconda in Rain 🌧️',
    tilt: '-2deg',
    timelineRef: 'hyderabad',
  },
  {
    id: 4,
    src: '/random but become favourite.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1d4ed8, #0f172a)',
    caption: 'Somewhere between endless chats and laughs 🌙',
    tag: 'Favorite Moments 💙',
    tilt: '3.5deg',
    timelineRef: 'memories',
  },
];

// Featured centerpiece memory
const FEATURED_MEMORY = {
  id: 100,
  src: '/chowmalla fav pic.jpeg',
  fallbackBg: 'linear-gradient(135deg, #1d4ed8, #0b1938)',
  title: "THE ONE I'LL ALWAYS REMEMBER",
  subtitle: 'Chowmahalla Palace — a moment from our trip that became a core memory.',
  tag: 'Chowmahalla Favorite ✨',
};

// Playful / funny memories
const FUNNY_MEMORIES = [
  {
    id: 201,
    src: '/chat went craze.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1e3a8a, #09173b)',
    caption: 'Zero planning. Maximum chaos.',
    tilt: '-4deg',
  },
  {
    id: 202,
    src: '/first snap of us.jpeg',
    fallbackBg: 'linear-gradient(135deg, #2563eb, #0b1938)',
    caption: 'Evidence that we should not be left unsupervised 😂',
    tilt: '3deg',
  },
  {
    id: 203,
    src: '/both like.jpeg',
    fallbackBg: 'linear-gradient(135deg, #1d4ed8, #050d24)',
    caption: 'A picture that both of us really love 💙',
    tilt: '-2.5deg',
  },
];

// All photos combined for lightbox navigation
const ALL_PHOTOS = [
  ...MAIN_MEMORIES,
  {
    id: FEATURED_MEMORY.id,
    src: FEATURED_MEMORY.src,
    fallbackBg: FEATURED_MEMORY.fallbackBg,
    caption: FEATURED_MEMORY.subtitle,
    tag: FEATURED_MEMORY.title,
    tilt: '0deg',
  },
  ...FUNNY_MEMORIES,
];

export default function HyderabadTrip() {
  const [activeTimeline, setActiveTimeline] = useState('start');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const openLightbox = (photoId) => {
    const index = ALL_PHOTOS.findIndex((p) => p.id === photoId);
    if (index !== -1) setSelectedPhotoIndex(index);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
  };

  return (
    <section className="hyderabad-section" id="hyderabad-section">
      {/* Background Atmosphere */}
      <div className="hyderabad-ambient-glow" aria-hidden="true" />
      <div className="hyderabad-grid-pattern" aria-hidden="true" />

      <div className="hyderabad-container">
        {/* =================================================================
            1. Section Header & Cinematic Reveal
            ================================================================= */}
        <motion.div
          className="hyderabad-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chapter-pill">
            <span className="chapter-icon">📖</span>
            <span>Chapter Two</span>
            <span className="chapter-icon">✦</span>
          </div>

          <p className="chapter-subline">Then came one of my favorite chapters...</p>

          <h2 className="hyderabad-title">
            THE HYDERABAD ROAD TRIP <span className="car-emoji">🚗</span>
          </h2>

          <div className="trip-three-lines">
            <span>One road.</span>
            <span className="dot-sep">•</span>
            <span>One trip.</span>
            <span className="dot-sep">•</span>
            <span className="glow-text">A lot of memories.</span>
          </div>
        </motion.div>

        {/* =================================================================
            2. Animated Road & Car Travel
            ================================================================= */}
        <motion.div
          className="road-animation-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <div className="road-container">
            {/* SVG Curved Road */}
            <svg className="road-svg" viewBox="0 0 900 140" fill="none">
              {/* Road Glow Base */}
              <motion.path
                d="M 40 70 Q 250 10, 450 70 T 860 70"
                stroke="rgba(59, 130, 246, 0.25)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Animated Glowing Dotted Center Line */}
              <motion.path
                d="M 40 70 Q 250 10, 450 70 T 860 70"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeDasharray="8 12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </svg>

            {/* Start Marker */}
            <div className="road-marker start-marker">
              <span className="marker-dot" />
              <span className="marker-label">START</span>
            </div>

            {/* Moving Car */}
            <motion.div
              className="travelling-car"
              initial={{ left: '5%', top: '48%', scale: 0.8 }}
              whileInView={{ left: '88%', top: '48%', scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ duration: 3.2, delay: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <div className="car-glow-ring" />
              <span className="car-symbol">🚗</span>
              <span className="car-speed-dust">💨</span>
            </motion.div>

            {/* Destination Marker */}
            <div className="road-marker dest-marker">
              <span className="pin-pulse" />
              <span className="dest-pin">📍</span>
              <span className="marker-label dest-name">HYDERABAD</span>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            3. Destination Welcome & Stylized Skyline Card
            ================================================================= */}
        <motion.div
          className="destination-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.3 }}
        >
          <div className="destination-inner">
            <div className="skyline-decor" aria-hidden="true">
              <span className="decor-star star-1">✦</span>
              <span className="decor-star star-2">★</span>
              <span className="decor-star star-3">✦</span>
              <div className="charminar-silhouette">🏛️ 🌃 🛣️</div>
            </div>

            <h3 className="dest-welcome-heading">
              Welcome to Hyderabad <span className="blue-heart">💙</span>
            </h3>

            <p className="dest-story-lead">
              Somewhere between the open roads, random conversations, and completely unplanned moments...
            </p>
            <p className="dest-story-punch">...we collected a few memories.</p>
          </div>
        </motion.div>

        {/* =================================================================
            4. Interactive Trip Timeline
            ================================================================= */}
        <div className="trip-timeline-section">
          <div className="timeline-nav">
            {TIMELINE_STEPS.map((step) => {
              const isActive = activeTimeline === step.id;
              return (
                <button
                  key={step.id}
                  className={`timeline-tab-btn ${isActive ? 'tab-active' : ''}`}
                  onClick={() => setActiveTimeline(step.id)}
                  type="button"
                >
                  <span className="tab-icon">{step.icon}</span>
                  <span className="tab-text">{step.label}</span>
                  {isActive && <motion.span layoutId="activeTabGlow" className="tab-glow-pill" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            5. Polaroid Photo Memory Grid
            ================================================================= */}
        <div className="photos-grid-wrapper">
          <div className="polaroid-grid">
            {MAIN_MEMORIES.map((photo, idx) => (
              <motion.div
                key={photo.id}
                className="polaroid-card"
                style={{ '--tilt-deg': photo.tilt }}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: photo.tilt }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  y: -8,
                  zIndex: 10,
                  boxShadow:
                    '0 20px 40px rgba(6, 15, 45, 0.8), 0 0 30px rgba(96, 165, 250, 0.45)',
                }}
                onClick={() => openLightbox(photo.id)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.caption}`}
              >
                {/* Vintage Tape Accent */}
                <div className="polaroid-tape" />

                {/* Photo Frame Container */}
                <div className="photo-media-box" style={{ background: photo.fallbackBg }}>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="photo-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback Graphic when user hasn't added images yet */}
                  <div className="fallback-placeholder">
                    <span className="placeholder-cam">📷</span>
                    <span className="placeholder-tag">{photo.tag}</span>
                    <span className="placeholder-hint">Click to enlarge</span>
                  </div>
                </div>

                {/* Handwritten Script Caption */}
                <div className="polaroid-caption-box">
                  <p className="polaroid-caption-text">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =================================================================
            6. Featured Central Memory
            ================================================================= */}
        <motion.div
          className="featured-memory-section"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="featured-card"
            onClick={() => openLightbox(FEATURED_MEMORY.id)}
            role="button"
            tabIndex={0}
          >
            <div className="featured-badge">
              <span className="badge-star">✦</span>
              <span>{FEATURED_MEMORY.title}</span>
              <span className="badge-star">✦</span>
            </div>

            <div className="featured-media" style={{ background: FEATURED_MEMORY.fallbackBg }}>
              <img
                src={FEATURED_MEMORY.src}
                alt={FEATURED_MEMORY.subtitle}
                className="featured-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="featured-placeholder">
                <span className="featured-icon">✨</span>
                <span className="featured-sub">Road Trip Centerpiece</span>
                <span className="featured-view-hint">🔍 Tap to open in Fullscreen</span>
              </div>
            </div>

            <p className="featured-story-quote">{FEATURED_MEMORY.subtitle}</p>
          </div>
        </motion.div>

        {/* =================================================================
            7. Funny Trip Moments / The Chaos Section
            ================================================================= */}
        <motion.div
          className="funny-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0 }}
        >
          <div className="funny-header">
            <span className="funny-emoji-badge">😂</span>
            <h3 className="funny-title">Of course... it wasn't all cinematic.</h3>
            <p className="funny-subtitle">A few chaotic highlights along the way</p>
          </div>

          <div className="funny-grid">
            {FUNNY_MEMORIES.map((item, idx) => (
              <motion.div
                key={item.id}
                className="funny-card"
                style={{ '--tilt-deg': item.tilt }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, rotate: item.tilt }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                whileHover={{ scale: 1.04, rotate: 0, y: -6 }}
                onClick={() => openLightbox(item.id)}
                role="button"
                tabIndex={0}
              >
                <div className="funny-media" style={{ background: item.fallbackBg }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="funny-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="funny-placeholder">
                    <span className="funny-sticker">🤪</span>
                    <span className="funny-hint">Tap to view</span>
                  </div>
                </div>
                <div className="funny-caption-box">
                  <p className="funny-caption">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            8. Ending Statement of Chapter Two
            ================================================================= */}
        <motion.div
          className="hyderabad-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
        >
          <p className="footer-lead">And that's the thing about memories...</p>
          <p className="footer-middle">You don't always need a long story.</p>
          <h4 className="footer-climax">
            Sometimes a short trip is enough to create a story you'll remember.
          </h4>

          {/* Next Section Indicator */}
          <div className="next-chapter-cue">
            <motion.div
              className="cue-bounce-box"
              animate={{ y: [0, 6, 0], opacity: [0.5, 0.95, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              onClick={() => {
                const target = document.getElementById('memories-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
              title="Scroll to memories"
            >
              <span className="cue-msg">Next memory</span>
              <span className="cue-arrow-icon">↓</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================================
          9. Fullscreen Photo Lightbox Modal
          ================================================================= */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                type="button"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                className="lightbox-nav-btn prev-btn"
                onClick={handlePrevPhoto}
                aria-label="Previous Photo"
                type="button"
              >
                ‹
              </button>

              {/* Lightbox Image Box */}
              <div
                className="lightbox-image-box"
                style={{ background: ALL_PHOTOS[selectedPhotoIndex]?.fallbackBg }}
              >
                <img
                  src={ALL_PHOTOS[selectedPhotoIndex]?.src}
                  alt={ALL_PHOTOS[selectedPhotoIndex]?.caption || 'Trip memory'}
                  className="lightbox-main-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="lightbox-fallback-display">
                  <span className="lightbox-fallback-icon">📸</span>
                  <span className="lightbox-fallback-title">
                    {ALL_PHOTOS[selectedPhotoIndex]?.tag || 'Road Trip Memory'}
                  </span>
                </div>
              </div>

              {/* Lightbox Caption Box */}
              <div className="lightbox-caption-panel">
                <p className="lightbox-caption-text">
                  {ALL_PHOTOS[selectedPhotoIndex]?.caption}
                </p>
                <span className="lightbox-counter">
                  {selectedPhotoIndex + 1} / {ALL_PHOTOS.length}
                </span>
              </div>

              {/* Next Button */}
              <button
                className="lightbox-nav-btn next-btn"
                onClick={handleNextPhoto}
                aria-label="Next Photo"
                type="button"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
