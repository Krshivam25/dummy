'use client';

import React, { useState, useEffect } from 'react';
import styles from './TimeLeft.module.css';

interface TimeLeftProps {
  totalSeconds: number;
}

const TimeLeft: React.FC<TimeLeftProps> = ({ totalSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.clock}>
        <div className={styles.circle}></div>
        <div className={styles.time}>{formatTime(timeLeft)}</div>
      </div>
      {/* <p className={styles.description}>Time Left for the Challenge</p> */}
    </div>
  );
};

export default TimeLeft;
