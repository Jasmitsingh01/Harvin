// MagnifiedImage.tsx

import React, { HTMLAttributes } from 'react';
import ReactImageZoom from 'react-image-zoom';

interface MagnifiedImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const MagnifiedImage: React.FC<MagnifiedImageProps> = ({ src, ...rest }) => {
  const zoomProps = {
    width: 300,
    height: 300,
    zoomWidth: 500,
    img: src,
    zoomStyle: 'opacity: 0.8; background-color: white;',
    zoomLensStyle: 'opacity: 0.4; background-color: gray;',
  };

  return (
    <div {...rest}>
      <ReactImageZoom {...zoomProps} />
    </div>
  );
};

export default MagnifiedImage;
