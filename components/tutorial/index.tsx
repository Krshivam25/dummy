'use client';

import React, { useState } from 'react';
import styles from './Tutorial.module.css';

interface Slide {
  image: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: '/images/slide1.png',
    description: 'Welcome to BlockGames! This is your ultimate gaming platform.',
  },
  {
    image: '/images/slide2.png',
    description: 'You can play various games and earn rewards as you progress.',
  },
  {
    image: '/images/slide3.png',
    description: 'Challenge your friends or join tournaments to win big!',
  },
  {
    image: '/images/slide4.png',
    description: 'Let’s get started and explore the world of BlockGames!',
  },
];

const Tutorial = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('blockgames-tutorial-shown', 'true');
      onComplete();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={slides[currentSlide].image}
            alt="Tutorial Slide"
            className={styles.image}
          />
        </div>

        {/* Description */}
        <div className={styles.description}>
          <p>{slides[currentSlide].description}</p>
        </div>

        {/* Next Button */}
        <div className={styles.buttonContainer}>
          <button onClick={nextSlide} className={styles.nextButton}>
            {currentSlide < slides.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
