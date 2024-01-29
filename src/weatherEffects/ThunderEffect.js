import React, { useState, useEffect } from 'react';

const ThunderEffect = () => {
  const [flashVisible, setFlashVisible] = useState(false);

  useEffect(() => {
    const generateRandomTime = () => Math.floor(Math.random() * 2500) + 500;

    const flashInterval = () => {
      setFlashVisible(true);

      setTimeout(() => {
        setFlashVisible(false);

        setTimeout(() => {
            flashInterval();
        }, generateRandomTime());
      }, 200);
    };

    flashInterval();

    return () => clearTimeout(flashInterval);
  }, []);

  return (
    <div className={`flash-container ${flashVisible ? 'flash-visible' : ''}`}>
        <div className="flash-effect"></div>
    </div>
  );
};

export default ThunderEffect;