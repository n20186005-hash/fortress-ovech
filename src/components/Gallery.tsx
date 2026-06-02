'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState, useCallback } from 'react';

const photos = [
  { src: '/gallery/fortress-ovech (1).jpg', alt: 'Fortress Ovech Photo 1' },
  { src: '/gallery/fortress-ovech (1).png', alt: 'Fortress Ovech Photo 2' },
  { src: '/gallery/fortress-ovech (10).jpg', alt: 'Fortress Ovech Photo 3' },
  { src: '/gallery/fortress-ovech (11).jpg', alt: 'Fortress Ovech Photo 4' },
  { src: '/gallery/fortress-ovech (13).jpg', alt: 'Fortress Ovech Photo 5' },
  { src: '/gallery/fortress-ovech (14).jpg', alt: 'Fortress Ovech Photo 6' },
  { src: '/gallery/fortress-ovech (17).jpg', alt: 'Fortress Ovech Photo 7' },
  { src: '/gallery/fortress-ovech (18).jpg', alt: 'Fortress Ovech Photo 8' },
  { src: '/gallery/fortress-ovech (19).jpg', alt: 'Fortress Ovech Photo 9' },
  { src: '/gallery/fortress-ovech (2).jpg', alt: 'Fortress Ovech Photo 10' },
  { src: '/gallery/fortress-ovech (21).jpg', alt: 'Fortress Ovech Photo 11' },
  { src: '/gallery/fortress-ovech (22).jpg', alt: 'Fortress Ovech Photo 12' },
  { src: '/gallery/fortress-ovech (23).jpg', alt: 'Fortress Ovech Photo 13' },
  { src: '/gallery/fortress-ovech (3).jpg', alt: 'Fortress Ovech Photo 14' },
  { src: '/gallery/fortress-ovech (5).jpg', alt: 'Fortress Ovech Photo 15' },
  { src: '/gallery/fortress-ovech (6).jpg', alt: 'Fortress Ovech Photo 16' },
  { src: '/gallery/fortress-ovech (7).jpg', alt: 'Fortress Ovech Photo 17' },
  { src: '/gallery/fortress-ovech (8).jpg', alt: 'Fortress Ovech Photo 18' },
  { src: '/gallery/fortress-ovech (9).jpg', alt: 'Fortress Ovech Photo 19' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const messages = useMessages() as any;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const captions = (messages?.gallery?.captions || []) as string[];

  const galleryPhotos = photos.map((photo: any, i: number) => {
    return {
      ...photo,
      alt: captions[i] || photo.alt,
    };
  });

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev: number) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  }, [galleryPhotos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev: number) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  }, [galleryPhotos.length]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  const mapsLink = messages?.hero?.mapsLink || 'https://maps.app.goo.gl/6i3FwKB2LmU58Bxw8';

  return (
    <>
      <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryPhotos.map((photo: any, i: number) => (
                <div
                  key={i}
                  className={`gallery-item relative group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => {
                    setCurrentIndex(i);
                    openLightbox();
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: i === 0 ? '400px' : '180px' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-end">
                    <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-4 items-center">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('viewAll')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={galleryPhotos[currentIndex].src}
            alt={galleryPhotos[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {galleryPhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
