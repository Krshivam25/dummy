import React from 'react';
import Image from 'next/image';
import styles from './navbar.module.css';
import Logo from '../../public/logo.png';
import { usePrivy } from '@privy-io/react-auth';


interface NavbarProps {
    walletAddress: string | any;
    onConnectWallet: () => void;
  }
  
  const Navbar: React.FC<NavbarProps> = ({ walletAddress, onConnectWallet }) => {
    // Function to truncate wallet address
    const truncateAddress = (address: string) =>
      `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
    return (
      <nav className={styles.navbar}>
        <div className={styles['navbar-container']}>
          {/* Logo Section */}
          <div className={styles['navbar-left']}>
            <Image src={Logo} alt="BlockDreams Logo" className={styles['navbar-logo-img']} />
            <div className={styles['navbar-logo']}>BlockDreams</div>
          </div>
  
          {/* Wallet Address or Connect Wallet */}
          <div className={styles['navbar-right']}>
            {walletAddress ? (
              <span className={styles['navbar-wallet']}>{truncateAddress(walletAddress)}</span>
            ) : (
              <button className={styles['navbar-button']} onClick={onConnectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;