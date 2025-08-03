// MagnifiedImage.tsx

import React, { HTMLAttributes, useState, useRef } from 'react';

interface MagnifiedImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const MagnifiedImage: React.FC<MagnifiedImageProps> = ({
  src,
  alt,
  ...rest
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div
      {...rest}
      ref={containerRef}
      className="magnified-image-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'zoom-in',
        ...rest.style,
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transform: isZoomed ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transition: isZoomed ? 'none' : 'transform 0.3s ease',
        }}
      />
    </div>
  );
};

export default MagnifiedImage;
