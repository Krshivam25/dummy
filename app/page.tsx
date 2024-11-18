// 'use client';

// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/navbar';
// import { usePrivy, useWallets } from '@privy-io/react-auth';
// import { useSetActiveWallet } from '@privy-io/wagmi';
// import { useAccount } from 'wagmi';
// import Tutorial from 'components/tutorial';
// import styles from './Home.module.css';
// import Popup from 'components/popup';
// import GameScreen from './dashboard/game/page';


// export default function Home() {
//   const [isPopupOpen, setIsPopupOpen] = useState(true); // Track popup visibility
//   const [showTutorial, setShowTutorial] = useState(false);

//   // Privy hooks
//   const { ready, authenticated, login, connectWallet, linkWallet, logout } = usePrivy();
//   const { wallets, ready: walletsReady } = useWallets();
//   const { setActiveWallet } = useSetActiveWallet();

//   useEffect(() => {
//     const tutorialShown = localStorage.getItem('blockgames-tutorial-shown');
//     if (!tutorialShown) {
//       setShowTutorial(true);
//     }
//   }, []);

//   const handleTutorialComplete = () => {
//     setShowTutorial(false);
//   };

//   // WAGMI hooks
//   const { address, isConnected } = useAccount();

//   // Handle popup connection
//   const handleConnectWallet = async () => {
//     try {
//       if (!authenticated) {
//         // Authenticate user with Privy
//         await login();
//       }

//       // Connect wallet via Privy
//       await connectWallet();
//       setIsPopupOpen(false);
//     } catch (error) {
//       console.error('Error connecting wallet:', error);
//     }
//   };

//   // Close popup without connecting
//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   return (
//     <>
//       {/* Navbar with wallet address */}
//       <Navbar walletAddress={isConnected ? address : ''} onConnectWallet={handleConnectWallet} />

//       <main className={styles.container}>
//         {/* Show popup if not connected */}
//         {isPopupOpen && (
//           <Popup onClose={handleClosePopup} onConnect={handleConnectWallet} />
//         )}

//         {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}

//         {!showTutorial && <GameScreen />}

//         {/* <div className={styles.textCenter}>
//           <h1 className={styles.title}>Welcome to BlockGames</h1>
//           <p className={styles.description}>
//             Enjoy the best gaming experience with rewards and challenges!
//           </p>
//         </div> */}

//         <div className={`${styles.grid} ${styles.gridTwoColumns} lg:${styles.gridTwoColumnsLg}`}>
//           {ready && authenticated && (
//             <>
//               <p>You are logged in with Privy</p>
//               <button onClick={connectWallet} className={styles.buttonBlue}>
//                 Connect another wallet
//               </button>
//               <button onClick={linkWallet} className={styles.buttonGreen}>
//                 Link another wallet
//               </button>
//               <button onClick={logout} className={styles.buttonRed}>
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { useAccount } from 'wagmi';
import Tutorial from 'components/tutorial';
import styles from './Home.module.css';
import Popup from 'components/popup';
import GameScreen from './dashboard/game/page';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Track popup visibility
  const [showTutorial, setShowTutorial] = useState(false);

  // Privy hooks
  const { ready, authenticated, login, connectWallet } = usePrivy();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const tutorialShown = localStorage.getItem('blockgames-tutorial-shown');
    if (isConnected && !tutorialShown) {
      setShowTutorial(true);
    }
  }, [isConnected]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('blockgames-tutorial-shown', 'true');
  };

  const handleConnectWallet = async () => {
    try {
      if (!authenticated) {
        await login(); // Authenticate with Privy
      }
      await connectWallet(); // Connect wallet via Privy
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <>
      {/* Navbar with wallet address */}
      <Navbar walletAddress={isConnected ? address : ''} onConnectWallet={handleConnectWallet} />

      <main className={styles.container}>
        {/* Show popup if wallet is not connected */}
        {isPopupOpen && <Popup onConnect={handleConnectWallet} />}

        {/* Show Tutorial if it has not been shown */}
        {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}

        {/* Show GameScreen only after Tutorial is completed */}
        {!showTutorial && !isPopupOpen && <GameScreen />}
      </main>
    </>
  );
}
