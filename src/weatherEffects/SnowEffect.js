import React, { useEffect } from 'react';

const SnowEffect = () => {
  useEffect(() => {
    const container = document.querySelector('.snow-container');

    for(let i = 0; i < 100; i++){
      const size = Math.random() * 5 + 5;
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 4 + 2}s`;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      container.appendChild(snowflake);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="snow-container"/>;
};

export default SnowEffect;