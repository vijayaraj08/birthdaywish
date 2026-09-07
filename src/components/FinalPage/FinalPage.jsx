import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BIRTHDAY_CONFIG,
  FINAL_MEMORIES,
  OPTIONAL_FINAL_PHOTO,
  WISH_LINES,
  SELFISH_WISH_LINES,
  DIARY_PROMISE_MESSAGE,
} from './finalPageData';
import './FinalPage.css';

export default function FinalPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // All photos for lightbox (including optional centerpiece if enabled)
  const allPhotos = [
    ...FINAL_MEMORIES,
    ...(OPTIONAL_FINAL_PHOTO.enabled
      ? [
          {
            id: 999,
            image: OPTIONAL_FINAL_PHOTO.image,
            fallbackBg: OPTIONAL_FINAL_PHOTO.fallbackBg,
            caption: `${OPTIONAL_FINAL_PHOTO.caption} ${OPTIONAL_FINAL_PHOTO.subcaption}`,
            tag: OPTIONAL_FINAL_PHOTO.tag,
          },
        ]
      : []),
  ];

  // Prevent background scrolling when lightbox is active
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
        setSelectedPhotoIndex((prev) => (prev + 1) % allPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, allPhotos.length]);

  const openLightbox = (photoId) => {
    const index = allPhotos.findIndex((p) => p.id === photoId);
    if (index !== -1) setSelectedPhotoIndex(index);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="final-page-section" id="final-message-section">
      {/* Cinematic Deep Atmosphere & Ethereal Blue Glow */}
      <div className="final-ambient-glow" aria-hidden="true" />
      <div className="final-star-field" aria-hidden="true" />

      <div className="final-page-container">
        {/* =================================================================
            1. Opening / Cinematic Introduction
            ================================================================= */}
        <motion.div
          className="final-intro-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            className="intro-particle-orb"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <span className="orb-center" />
            <span className="orb-radiance" />
          </motion.div>

          <motion.div variants={fadeUpVariant} className="chapter-pill">
            <span className="pill-heart">💙</span>
            <span>Finale</span>
            <span className="pill-heart">✦</span>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="intro-quiet-line-1">
            One last thing...
          </motion.p>
          <motion.h2 variants={fadeUpVariant} className="intro-quiet-line-2">
            Before you go...
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="intro-quiet-line-3">
            I want you to remember something.
          </motion.p>
        </motion.div>

        {/* =================================================================
            2. Floating Memory Wall (4–6 Photos)
            ================================================================= */}
        {FINAL_MEMORIES.length > 0 && (
          <motion.div
            className="floating-memory-wall-wrapper"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0 }}
          >
            <div className="memory-wall-grid">
              {FINAL_MEMORIES.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  className="final-memory-card"
                  style={{ '--tilt-deg': photo.tilt }}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: photo.tilt }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: idx * 0.12 }}
                  whileHover={{
                    scale: 1.06,
                    rotate: 0,
                    y: -8,
                    zIndex: 20,
                    boxShadow:
                      '0 20px 45px rgba(2, 6, 20, 0.85), 0 0 35px rgba(96, 165, 250, 0.45)',
                  }}
                  onClick={() => openLightbox(photo.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View memory: ${photo.caption}`}
                >
                  <div className="final-photo-frame" style={{ background: photo.fallbackBg }}>
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      className="final-photo-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="final-fallback-view">
                      <span className="fallback-cam">📷</span>
                      <span className="fallback-tag">{photo.tag}</span>
                    </div>
                  </div>
                  <div className="final-card-caption">
                    <p className="final-caption-text">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* =================================================================
            3. Transition From Memories to Core Message
            ================================================================= */}
        <motion.div
          className="transition-reflection-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={fadeUpVariant} className="refl-line-1">
            Funny how...
          </motion.p>
          <motion.p variants={fadeUpVariant} className="refl-line-2">
            Some people can become part of your story so unexpectedly.
          </motion.p>
          <motion.p variants={fadeUpVariant} className="refl-line-3">
            And somehow...
          </motion.p>
          <motion.p variants={fadeUpVariant} className="refl-line-4">
            We already have moments that feel worth keeping.
          </motion.p>
          <motion.p variants={fadeUpVariant} className="refl-line-5">
            That's probably my favorite thing about this whole story.
          </motion.p>
        </motion.div>

        {/* =================================================================
            4. Main Final Emotional Message
            ================================================================= */}
        <motion.div
          className="main-final-message-card"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="uncertainty-lines">
            <motion.p variants={fadeUpVariant} className="unc-line">
              I don't know what the future will look like.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="unc-line">
              I don't know how many more random conversations we'll have.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="unc-line">
              I don't know how many more crazy plans we'll make.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="unc-line">
              I don't know where the next road will take us.
            </motion.p>
          </div>

          <motion.p variants={fadeUpVariant} className="know-one-thing">
            But I do know one thing.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            className="glad-part-of-story"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="story-climax-text">
              I'm really glad you're part of my story. <span className="blue-heart">💙</span>
            </h3>
          </motion.div>
        </motion.div>

        {/* =================================================================
            5. The Birthday Wish Sequence
            ================================================================= */}
        <motion.div
          className="birthday-wish-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUpVariant} className="wish-lead-1">
            So today...
          </motion.p>
          <motion.p variants={fadeUpVariant} className="wish-lead-2">
            On your birthday...
          </motion.p>
          <motion.h4 variants={fadeUpVariant} className="wish-lead-3">
            I hope you get everything you deserve.
          </motion.h4>

          <div className="wishes-stack">
            {WISH_LINES.map((w, idx) => (
              <motion.div
                key={w}
                className="wish-item-pill"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <span className="wish-bullet">✦</span>
                <span className="wish-text">{w}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            6. Personal Friendship Message ("And selfishly...")
            ================================================================= */}
        <motion.div
          className="selfish-friendship-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUpVariant} className="selfish-lead">
            And selfishly...
          </motion.p>
          <motion.p variants={fadeUpVariant} className="selfish-subtitle">
            I hope I get to be around for some of those moments too.
          </motion.p>

          <div className="selfish-lines-grid">
            {SELFISH_WISH_LINES.map((line, idx) => (
              <motion.div
                key={line}
                className="selfish-line-badge"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <span>{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            6.5. Human Diary Promise Card (Heartfelt Emotional Peak)
            ================================================================= */}
        <motion.div
          className="diary-promise-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="diary-promise-glow" aria-hidden="true" />
          <div className="diary-header-tag">
            <span className="diary-icon">📖</span>
            <span className="diary-tag-text">{DIARY_PROMISE_MESSAGE.header}</span>
          </div>

          <div className="diary-stanzas-flow">
            {DIARY_PROMISE_MESSAGE.stanzas.map((stanza) => (
              <motion.div
                key={stanza.id}
                className={`diary-stanza-block ${stanza.isHighlight ? 'stanza-highlight' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
              >
                {stanza.lines.map((l, lIdx) => (
                  <p key={lIdx} className="diary-line">
                    {l}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================================
            7. Big Final Statement (Cinematic Peak)
            ================================================================= */}
        <motion.div
          className="big-final-statement-block"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="statement-glow-halo" aria-hidden="true" />

          <p className="statement-line-1">YOU DESERVE A REALLY GOOD YEAR.</p>
          <p className="statement-line-2">SO GO MAKE IT ONE.</p>

          <h2 className="statement-happy-birthday">
            ✨ HAPPY BIRTHDAY ✨
          </h2>
          <span className="statement-heart">💙</span>
        </motion.div>

        {/* =================================================================
            8. Optional Final Centerpiece Photo
            ================================================================= */}
        {OPTIONAL_FINAL_PHOTO.enabled && (
          <motion.div
            className="optional-centerpiece-wrapper"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0 }}
          >
            <div
              className="centerpiece-polaroid-frame"
              onClick={() => openLightbox(999)}
              role="button"
              tabIndex={0}
            >
              <div
                className="centerpiece-media-box"
                style={{ background: OPTIONAL_FINAL_PHOTO.fallbackBg }}
              >
                <img
                  src={OPTIONAL_FINAL_PHOTO.image}
                  alt={OPTIONAL_FINAL_PHOTO.caption}
                  className="centerpiece-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="centerpiece-fallback">
                  <span className="centerpiece-cam-icon">📷</span>
                  <span className="centerpiece-hint">Tap to enlarge</span>
                </div>
              </div>

              <div className="centerpiece-captions">
                <p className="cp-caption-1">{OPTIONAL_FINAL_PHOTO.caption}</p>
                <p className="cp-caption-2">{OPTIONAL_FINAL_PHOTO.subcaption}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* =================================================================
            9. Final Signature
            ================================================================= */}
        <motion.div
          className="final-signature-block"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <p className="signature-effort">Made with way too much effort...</p>
          <p className="signature-expected">...for someone who probably didn't expect any of this. 😂</p>
          <p className="signature-signoff">— {BIRTHDAY_CONFIG.signature} 💙</p>
        </motion.div>

        {/* =================================================================
            10. Final Screen & Restart
            ================================================================= */}
        <motion.div
          className="final-screen-closing"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <div className="final-screen-inner">
            <h3 className="final-name-heading">
              Happy Birthday, {BIRTHDAY_CONFIG.name}. <span className="blue-heart">💙</span>
            </h3>

            <p className="final-closing-lead">Here's to the next chapter.</p>
            <p className="final-closing-sub">And whatever memories come next...</p>
            <p className="final-closing-climax">Let's make them good ones.</p>

            <span className="final-sparkle-glyph">✨</span>

            {/* Subtle Restart Button */}
            <motion.button
              className="restart-journey-btn"
              onClick={handleRestart}
              whileHover={{ scale: 1.05, opacity: 1 }}
              whileTap={{ scale: 0.96 }}
              type="button"
            >
              <span>↻ Experience It Again</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* =================================================================
          11. Lightbox Modal
          ================================================================= */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            className="final-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              className="final-lightbox-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close-icon"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                type="button"
              >
                ✕
              </button>

              <button
                className="lightbox-arrow-btn prev-btn"
                onClick={handlePrevPhoto}
                aria-label="Previous Memory"
                type="button"
              >
                ‹
              </button>

              <div
                className="lightbox-preview-box"
                style={{ background: allPhotos[selectedPhotoIndex]?.fallbackBg }}
              >
                <img
                  src={allPhotos[selectedPhotoIndex]?.image}
                  alt={allPhotos[selectedPhotoIndex]?.caption || 'Memory'}
                  className="lightbox-full-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="lightbox-fallback-display">
                  <span className="lightbox-fallback-icon">📸</span>
                  <span className="lightbox-fallback-title">
                    {allPhotos[selectedPhotoIndex]?.tag || 'Memory'}
                  </span>
                </div>
              </div>

              <div className="lightbox-bottom-bar">
                <p className="lightbox-caption">
                  {allPhotos[selectedPhotoIndex]?.caption}
                </p>
                <span className="lightbox-counter">
                  {selectedPhotoIndex + 1} / {allPhotos.length}
                </span>
              </div>

              <button
                className="lightbox-arrow-btn next-btn"
                onClick={handleNextPhoto}
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
