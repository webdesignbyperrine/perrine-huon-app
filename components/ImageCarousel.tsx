'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type MediaItem = {
  id: string;
  file_url: string;
  alt_text?: string;
};

type ImageCarouselProps = {
  images: MediaItem[];
  projectTitle: string;
};

export default function ImageCarousel({ images, projectTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxDragging, setLightboxDragging] = useState(false);
  const [lightboxStartX, setLightboxStartX] = useState(0);
  const [lightboxDeltaX, setLightboxDeltaX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.8;
      const gap = 24;
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  // Gestion du drag pour le slide
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Touch events pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mettre à jour l'index lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.offsetWidth * 0.8;
        const gap = 24;
        const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap));
        setCurrentIndex(Math.min(newIndex, images.length - 1));
      }
    };

    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', handleScroll);
    return () => carousel?.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  // Ouvrir la lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Fermer la lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Navigation lightbox
  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);

  // Lightbox drag/swipe
  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxDragging(true);
    setLightboxStartX(e.clientX);
    setLightboxDeltaX(0);
  };

  const handleLightboxMouseMove = (e: React.MouseEvent) => {
    if (!lightboxDragging) return;
    setLightboxDeltaX(e.clientX - lightboxStartX);
  };

  const handleLightboxMouseUp = () => {
    if (lightboxDragging) {
      if (lightboxDeltaX > 100) {
        lightboxPrev();
      } else if (lightboxDeltaX < -100) {
        lightboxNext();
      }
    }
    setLightboxDragging(false);
    setLightboxDeltaX(0);
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxDragging(true);
    setLightboxStartX(e.touches[0].clientX);
    setLightboxDeltaX(0);
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    if (!lightboxDragging) return;
    setLightboxDeltaX(e.touches[0].clientX - lightboxStartX);
  };

  const handleLightboxTouchEnd = () => {
    if (lightboxDragging) {
      if (lightboxDeltaX > 100) {
        lightboxPrev();
      } else if (lightboxDeltaX < -100) {
        lightboxNext();
      }
    }
    setLightboxDragging(false);
    setLightboxDeltaX(0);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="relative">
        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth pb-4"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Spacer pour centrer la première image */}
          <div className="flex-shrink-0 w-[10%]" />
          
          {images.map((media, index) => (
            <div
              key={media.id}
              className="flex-shrink-0 w-[80%] md:w-[60%] lg:w-[50%] aspect-video glass-light rounded-2xl overflow-hidden group cursor-pointer"
              style={{ scrollSnapAlign: 'center' }}
              onClick={() => !isDragging && openLightbox(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={media.file_url}
                  alt={media.alt_text || `${projectTitle} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                  draggable={false}
                />
                {/* Overlay avec icône zoom */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Spacer pour centrer la dernière image */}
          <div className="flex-shrink-0 w-[10%]" />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-light flex items-center justify-center transition-all ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:bg-white/10'
              }`}
              aria-label="Image précédente"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-light flex items-center justify-center transition-all ${
                currentIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:bg-white/10'
              }`}
              aria-label="Image suivante"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-secondary'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass-light flex items-center justify-center hover:bg-white/10 transition-colors z-10"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/70 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16 cursor-grab active:cursor-grabbing select-none"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            onMouseLeave={handleLightboxMouseUp}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <div 
              className="relative w-full h-full max-w-6xl max-h-[80vh] transition-transform duration-200"
              style={{ 
                transform: lightboxDragging ? `translateX(${lightboxDeltaX}px)` : 'translateX(0)'
              }}
            >
              <Image
                src={images[lightboxIndex].file_url}
                alt={images[lightboxIndex].alt_text || `${projectTitle} - Image ${lightboxIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                className="select-none"
                draggable={false}
                priority
              />
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-light flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all"
                aria-label="Image précédente"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-light flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all"
                aria-label="Image suivante"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(index); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === lightboxIndex
                      ? 'w-10 bg-white'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

