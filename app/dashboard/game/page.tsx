'use client';

import React, { useState, useEffect } from 'react';
import styles from './GameScreen.module.css';
import Card from 'components/card';
import { fetchTrendingCoins } from '../../../services/coinGeckoService';
import TimeLeft from 'components/timer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface SelectedOption {
  bucket: number;
  option: string;
  multiplier: number;
}

const GameScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const multipliers = [
    { label: '2x', cost: 8 },
    { label: '5x', cost: 20 },
    { label: '10x', cost: 40 },
    { label: '20x', cost: 0 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const coins = await fetchTrendingCoins();
      setTrendingCoins(coins);
    };

    fetchData();

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const groupedBuckets = () => {
    const buckets = [];
    for (let i = 0; i < trendingCoins.length; i += 5) {
      buckets.push(trendingCoins.slice(i, i + 5));
    }
    return buckets;
  };

  const handleOptionSelect = (bucketIndex: number, option: string) => {
    const existingIndex = selectedOptions.findIndex((item) => item.bucket === bucketIndex);

    if (existingIndex !== -1) {
      const updatedOptions = [...selectedOptions];
      updatedOptions[existingIndex] = { ...updatedOptions[existingIndex], option };
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([...selectedOptions, { bucket: bucketIndex, option, multiplier: 0 }]);
    }
  };

  const handleMultiplierSelect = (bucketIndex: number, multiplier: number) => {
    const updatedOptions = selectedOptions.map((item) =>
      item.bucket === bucketIndex ? { ...item, multiplier } : item
    );
    setSelectedOptions(updatedOptions);
  };

  const calculateTotalCost = () => {
    const entryFee = 20;
    const multiplierCost = selectedOptions.reduce((sum, item) => {
      const multiplier = multipliers.find((m) => m.label === `${item.multiplier}x`);
      return sum + (multiplier?.cost || 0);
    }, 0);
    return entryFee + multiplierCost;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the 24-Hour BlockGames Challenge</h1>
      {/* <p className={styles.timer}>Time Left: {new Date(timeLeft * 1000).toISOString().substr(11, 8)}</p> */}
      <TimeLeft totalSeconds={24 * 60 * 60} />

      <div className={styles.content}>
        {/* Options Section */}
        <div className={styles.optionsSection}>
          {groupedBuckets().map((bucket, index) => (
            <div key={index} className={styles.bucket}>
              <h3 className={styles.bucketTitle}>Bucket {index + 1}</h3>
              <div className={styles.cards}>
                {bucket.map((coin) => (
                  <Card
                    key={coin.id}
                    thumb={coin.thumb}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.price}
                    marketCap={coin.marketCap}
                    priceChange24h={coin.priceChange24h}
                    onSelect={() => handleOptionSelect(index, coin.name)}
                  />
                ))}
              </div>
              {selectedOptions.find((item) => item.bucket === index) && (
                <div className={styles.multipliers}>
                  {multipliers.map((multiplier) => (
                    <button
                      key={multiplier.label}
                      onClick={() => handleMultiplierSelect(index, parseInt(multiplier.label))}
                      className={`${styles.multiplierButton} ${
                        selectedOptions.find((item) => item.bucket === index)?.multiplier ===
                        parseInt(multiplier.label)
                          ? styles.selected
                          : ''
                      }`}
                    >
                      {multiplier.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {selectedOptions.some((item) => item.multiplier > 0) && (
          <div className={styles.cart}>
            <h2 className={styles.cartTitle}>Your Selections</h2>
            <ul className={styles.cartList}>
              {selectedOptions
                .filter((item) => item.multiplier > 0)
                .map((item) => (
                  <li key={item.bucket} className={styles.cartItem}>
                    <p>
                      Bucket {item.bucket + 1}: 
                    </p>
                    <p>{item.option} ({item.multiplier}x)</p>
                    <div className={styles.cartActions}>
                      <button
                        onClick={() => handleMultiplierSelect(item.bucket, 0)}
                        className={styles.editButton}
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedOptions(selectedOptions.filter((i) => i.bucket !== item.bucket))
                        }
                        className={styles.deleteButton}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <div className={styles.cartFooter}>
            <p className={styles.totalCost}>Total Cost: ${calculateTotalCost()}</p>
            <button className={styles.submitButton}>Submit Portfolio</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
