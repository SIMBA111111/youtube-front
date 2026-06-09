import React, { useState, useEffect } from 'react';

const LoadingDots = ({ interval = 500, dotsCount = 3 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev + 1) % (dotsCount + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [interval, dotsCount]);

  const dots = '.'.repeat(count);

  return <span>{dots}</span>;
};

export default LoadingDots;