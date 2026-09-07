import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MEMORIES_DATA,
  FEATURED_SPECIAL_MEMORY,
  SPECIAL_VIDEO_MEMORY,
  FILM_STRIP_PHOTOS,
  CATEGORIES,
} from './memoriesData';
import './Memories.css';

export default function Memories() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  // Filtered photos based on selected category
  const filteredMemories =
    activeCategory === 'All'
      ? MEMORIES_DATA
      : MEMORIES_DATA.filter((m) => m.category === activeCategory);

  // All photos for lightbox navigation (including featured memory)
  const allLightboxPhotos = [
    ...MEMORIES_DATA,
    {
      id: FEATURED_SPECIAL_MEMORY.id,
      image: FEATURED_SPECIAL_MEMORY.image,
      fallbackBg: FEATURED_SPECIAL_MEMORY.fallbackBg,
      caption: `${FEATURED_SPECIAL_MEMORY.lead} ${FEATURED_SPECIAL_MEMORY.punchline}`,
      date: 'Special',
      category: 'Featured',
    },
  ];

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % allLightboxPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex(
          (prev) => (prev - 1 + allLightboxPhotos.length) % allLightboxPhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, allLightboxPhotos.length]);

  const openLightbox = (photoId) => {
    const index = allLightboxPhotos.findIndex((p) => p.id === photoId);
    if (index !== -1) setSelectedPhotoIndex(index);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % allLightboxPhotos.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex(
      (prev) => (prev - 1 + allLightboxPhotos.length) % allLightboxPhotos.length
    );
  };

  return (
    <section className="memories-section" id="memories-section">
      {/* Ambient background glow and grid */}
      <div className="memories-ambient-glow" aria-hidden="true" />
      <div className="memories-stars-field" aria-hidden="true" />

      <div className="memories-container">
        {/* =================================================================
            1. Section Intro & Animated Heading
            ================================================================= */}
        <motion.div
          className="memories-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="memories-pill-badge">
            <span className="badge-sparkle">✦</span>
            <span>Chapter Three</span>
            <span className="badge-sparkle">✦</span>
          </div>

          <div className="intro-philosophy">
            <p className="philosophy-line-1">Not everything needs a story...</p>
            <p className="philosophy-line-2">
              Some moments are special simply because we were there.
            </p>
          </div>

          <h2 className="memories-main-title">
            OUR FAVORITE MEMORIES <span className="camera-emoji">📸</span>
          </h2>

          <p className="memories-subheading">
            Here are a few moments I'd keep forever.
          </p>
        </motion.div>

        {/* =================================================================
            2. Animated 3D Scrapbook Opening Intro
            ================================================================= */}
        <motion.div
          className="scrapbook-intro-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onViewportEnter={() => setIsAlbumOpen(true)}
        >
          <div className={`scrapbook-book ${isAlbumOpen ? 'book-opened' : ''}`}>
            <div className="book-cover-left">
              <div className="cover-emboss">
                <span className="cover-title">MEMORIES</span>
                <span className="cover-subtitle">vol. 1</span>
              </div>
            </div>
            <div className="book-spine" />
            <div className="book-page-right">
              <div className="page-content">
                <span className="page-stamp">COLLECTED MOMENTS 💙</span>
                <p className="page-quote">
                  "Sometimes, a few good moments are all it takes to create memories worth keeping."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            3. Memory Filter Tabs
            ================================================================= */}
        <motion.div
          className="filters-bar-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="filters-container">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`filter-btn ${isActive ? 'filter-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  aria-pressed={isActive}
                >
                  <span className="filter-label">{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="filter-active-glow"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =================================================================
            4. Scrapbook / Masonry Photo Gallery
            ================================================================= */}
        <motion.div layout className="scrapbook-gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                className={`memory-scrapbook-card size-${item.size}`}
                style={{ '--tilt-deg': item.tilt }}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: item.tilt }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.65, delay: idx * 0.08 }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 20,
                  boxShadow:
                    '0 22px 45px rgba(2, 6, 20, 0.85), 0 0 35px rgba(96, 165, 250, 0.4)',
                }}
                onClick={() => openLightbox(item.id)}
                role="button"
                tabIndex={0}
                aria-label={`View photo memory: ${item.caption}`}
              >
                {/* Washi Tape / Paper Clip Decor */}
                <div className="washi-tape" />

                {/* Floating Handwritten Sticky Note */}
                {item.stickyNote && (
                  <div className={`sticky-note note-${item.stickyPosition}`}>
                    <span>{item.stickyNote}</span>
                  </div>
                )}

                {/* Photo Media Box */}
                <div className="card-photo-box" style={{ background: item.fallbackBg }}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Graceful Fallback Illustration */}
                  <div className="card-fallback-placeholder">
                    <span className="fallback-cam-icon">📷</span>
                    <span className="fallback-date-pill">{item.date}</span>
                    <span className="fallback-click-hint">Click to enlarge ✨</span>
                  </div>
                </div>

                {/* Polaroid Bottom Caption Area */}
                <div className="card-bottom-caption">
                  <p className="handwritten-caption">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* =================================================================
            5. Special Centerpiece Featured Memory
            ================================================================= */}
        <motion.div
          className="featured-centerpiece-wrapper"
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="featured-centerpiece-card"
            onClick={() => openLightbox(FEATURED_SPECIAL_MEMORY.id)}
            role="button"
            tabIndex={0}
          >
            <div className="featured-top-badge">
              <span className="badge-spark">✦</span>
              <span>{FEATURED_SPECIAL_MEMORY.title}</span>
              <span className="badge-spark">✦</span>
            </div>

            <div
              className="featured-photo-frame"
              style={{ background: FEATURED_SPECIAL_MEMORY.fallbackBg }}
            >
              <img
                src={FEATURED_SPECIAL_MEMORY.image}
                alt={FEATURED_SPECIAL_MEMORY.punchline}
                className="featured-photo-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="featured-center-fallback">
                <span className="featured-gem-icon">💎</span>
                <span className="featured-tagline">The Core Memory</span>
                <span className="featured-zoom-label">🔍 Tap to open fullscreen</span>
              </div>
            </div>

            <div className="featured-quote-block">
              <p className="quote-lead">{FEATURED_SPECIAL_MEMORY.lead}</p>
              <p className="quote-punch">{FEATURED_SPECIAL_MEMORY.punchline}</p>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            5.5 Special Video Highlight (Live Video in Motion)
            ================================================================= */}
        <motion.div
          className="special-video-wrapper"
          initial={{ opacity: 0, scale: 0.95, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="special-video-card">
            <div className="special-video-header">
              <div className="video-badge">
                <span className="badge-spark">✦</span>
                <span>{SPECIAL_VIDEO_MEMORY.tag}</span>
                <span className="badge-spark">✦</span>
              </div>
              <h3 className="special-video-title">{SPECIAL_VIDEO_MEMORY.title}</h3>
              <p className="special-video-subtitle">{SPECIAL_VIDEO_MEMORY.subtitle}</p>
            </div>

            <div className="video-player-frame">
              <video
                src={SPECIAL_VIDEO_MEMORY.src}
                controls
                playsInline
                preload="metadata"
                className="special-video-element"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="special-video-footer">
              <span className="video-camera-icon">🎬</span>
              <p className="video-footer-caption">{SPECIAL_VIDEO_MEMORY.caption}</p>
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            6. Dynamic Memory Counter
            ================================================================= */}
        <motion.div
          className="memory-counter-wrapper"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <div className="counter-glass-box">
            <span className="counter-label">Moments collected</span>
            <motion.span
              className="counter-number"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 200 }}
            >
              {String(MEMORIES_DATA.length).padStart(2, '0')}
            </motion.span>
            <span className="counter-subtext">and counting... 💙</span>
          </div>
        </motion.div>

        {/* =================================================================
            7. Film Strip Showcase Section
            ================================================================= */}
        <motion.div
          className="film-strip-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0 }}
        >
          <div className="film-strip-header">
            <span className="film-icon">🎞️</span>
            <span className="film-title">Memory Film Roll</span>
          </div>

          <div className="film-strip-track">
            {/* Top Sprocket Holes */}
            <div className="sprocket-row top-sprockets">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="sprocket-hole" />
              ))}
            </div>

            {/* Photos in Film Frame */}
            <div className="film-frames-container">
              {FILM_STRIP_PHOTOS.map((film, index) => (
                <div key={film.id} className="film-single-frame" style={{ background: film.bg }}>
                  <img
                    src={film.src}
                    alt={film.label}
                    className="film-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="film-fallback">
                    <span className="film-frame-number">#{index + 1}</span>
                    <span className="film-frame-label">{film.label}</span>
                  </div>
                  <div className="film-caption-overlay">
                    <span className="film-overlay-num">#{index + 1}</span>
                    <span className="film-overlay-txt">{film.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="sprocket-row bottom-sprockets">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="sprocket-hole" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* =================================================================
            8. Ending Message & Next Section Cue
            ================================================================= */}
        <motion.div
          className="memories-footer-ending"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
        >
          <div className="ending-narrative">
            <p className="narrative-line-1">Some moments don't need years behind them to become special.</p>
            <p className="narrative-line-2">These moments already feel worth remembering.</p>
            <h4 className="narrative-line-3">Here's to many more. 💙</h4>
          </div>

          <div className="loading-cue-wrapper">
            <div className="typing-loading-text">
              <span>More memories loading</span>
              <span className="dots-animated">...</span>
            </div>

            <motion.button
              className="next-memory-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(96, 165, 250, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const target = document.getElementById('about-her-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
            >
              <span>Next</span>
              <span className="btn-arrow">→</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* =================================================================
          9. Fullscreen Lightbox Modal
          ================================================================= */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            className="memories-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              className="memories-lightbox-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="lightbox-close-icon"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                type="button"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                className="lightbox-arrow-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Memory"
                type="button"
              >
                ‹
              </button>

              {/* Lightbox Image Preview */}
              <div
                className="lightbox-preview-box"
                style={{ background: allLightboxPhotos[selectedPhotoIndex]?.fallbackBg }}
              >
                <img
                  src={allLightboxPhotos[selectedPhotoIndex]?.image}
                  alt={allLightboxPhotos[selectedPhotoIndex]?.caption || 'Memory'}
                  className="lightbox-full-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="lightbox-fallback-art">
                  <span className="lightbox-art-icon">📷</span>
                  <span className="lightbox-art-title">
                    {allLightboxPhotos[selectedPhotoIndex]?.category || 'Memory'}
                  </span>
                </div>
              </div>

              {/* Bottom Caption & Counter */}
              <div className="lightbox-bottom-bar">
                <div className="lightbox-text-group">
                  <p className="lightbox-caption">
                    {allLightboxPhotos[selectedPhotoIndex]?.caption}
                  </p>
                  {allLightboxPhotos[selectedPhotoIndex]?.date && (
                    <span className="lightbox-date">
                      {allLightboxPhotos[selectedPhotoIndex]?.date}
                    </span>
                  )}
                </div>
                <div className="lightbox-counter-pill">
                  {selectedPhotoIndex + 1} / {allLightboxPhotos.length}
                </div>
              </div>

              {/* Next Button */}
              <button
                className="lightbox-arrow-btn next-btn"
                onClick={handleNext}
                aria-label="Next Memory"
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
