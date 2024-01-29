import React, { useEffect } from 'react';

const RainEffect = () => {
  useEffect(() => {
    const container = document.querySelector('.rain-container');

    for(let i = 0; i < 100; i++){
      const raindrop = document.createElement('div');
      raindrop.className = 'raindrop';
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      container.appendChild(raindrop);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="rain-container"/>;
};

export default RainEffect;