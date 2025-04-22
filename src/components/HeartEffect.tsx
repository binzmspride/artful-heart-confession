
import { useState, useEffect } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export const HeartEffect = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new heart
      const newHeart: Heart = {
        id: Date.now(),
        x: Math.random() * 100, // random x position (0-100%)
        y: 110, // start below the viewport
        size: 20 + Math.random() * 30, // random size
        opacity: 0.5 + Math.random() * 0.5, // random opacity
        speed: 1 + Math.random() * 2, // random speed
      };
      
      setHearts((prevHearts) => [...prevHearts, newHeart]);
      
      // Remove hearts that have moved off screen (after 7 seconds)
      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter(heart => heart.id !== newHeart.id));
      }, 7000);
      
    }, 700); // Add a new heart every 700ms
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setHearts((prevHearts) => 
        prevHearts.map((heart) => ({
          ...heart,
          y: heart.y - heart.speed * 0.5, // Move up
        }))
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: `${heart.y}%`,
            opacity: heart.opacity,
            transform: `rotate(${Math.random() * 60 - 30}deg)`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`rgba(234, 56, 76, ${heart.opacity})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
