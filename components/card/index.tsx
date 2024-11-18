import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  thumb: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: string;
  priceChange24h: number;
  onSelect: () => void;
}

const Card: React.FC<CardProps> = ({
  thumb,
  name,
  symbol,
  price,
  marketCap,
  priceChange24h,
  onSelect,
}) => {
  return (
    <div className={styles.card} onClick={onSelect}>
      <img src={thumb} alt={`${name} logo`} className={styles.logo} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.symbol}>{symbol.toUpperCase()}</p>
      <p className={styles.price}>Price: ${price.toFixed(6)}</p>
      <p className={styles.marketCap}>Mkt Cap: {marketCap}</p>
      <p
        className={`${styles.priceChange} ${
          priceChange24h >= 0 ? styles.positive : styles.negative
        }`}
      >
        24h: {priceChange24h.toFixed(2)}%
      </p>
    </div>
  );
};

export default Card;
