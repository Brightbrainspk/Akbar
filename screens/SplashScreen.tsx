
import React, { useEffect, useState } from 'react';
import { Logo, TAGLINE } from '../constants';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3500); // Animation time
    
    const finishTimer = setTimeout(() => {
        onFinish();
    }, 4000); // Total time before callback

    return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 bg-[#1a1a2e] flex flex-col items-center justify-center transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="animate-pulse">
            <Logo />
        </div>
        <p className="mt-6 text-xl text-yellow-300 font-semibold animate-fade-in-up">
            {TAGLINE}
        </p>
    </div>
  );
};

export default SplashScreen;