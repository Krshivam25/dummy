import React from 'react';
import styles from './Popup.module.css';

interface PopupProps {
//   onClose: () => void;
  onConnect: () => void;
}

const Popup: React.FC<PopupProps> = ({ onConnect }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Close Button */}
        {/* <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button> */}

        {/* Image Section */}
        <div className={styles.imageContainer}>
          <img
            src="/logo.png" // Replace with your BlockDreams image path
            alt="BlockDreams Logo"
            className={styles.logo}
          />
        </div>

        {/* Disclaimer Section */}
        <div className={styles.disclaimer}>
          <h2 className={styles.disclaimerTitle}>Welcome to BlockDreams</h2>
          <p className={styles.disclaimerText}>
            By connecting your wallet, you agree to the BlockDreams Terms of
            Service and Privacy Policy.
          </p>
        </div>

        {/* Connect Wallet Button */}
        <div className={styles.buttonContainer}>
          <button onClick={onConnect} className={styles.connectButton}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
