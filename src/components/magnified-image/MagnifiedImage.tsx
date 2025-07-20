// MagnifiedImage.tsx

import React, { HTMLAttributes } from 'react';
import ReactImageMagnify from 'react-image-magnify';

interface MagnifiedImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const MagnifiedImage: React.FC<MagnifiedImageProps> = ({
  src,
  alt,
  ...rest
}) => {
  return (
    <div {...rest}>
      <ReactImageMagnify
        {...{
          smallImage: {
            src,
            alt,
            isFluidWidth: true,
            width: 300,
            height: 300,
          },
          largeImage: {
            src,
            width: 1200,
            height: 1200,
          },
          enlargedImageContainerDimensions: {
            width: '120%',
            height: '100%',
          },
          enlargedImageContainerStyle: {
            backgroundColor: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
          enlargedImageStyle: {
            objectFit: 'contain',
          },
          style: {
            width: '100%',
            height: '100%',
            position: 'relative',
          },
          cursorStyle: {
            border: '2px solid #fff',
            borderRadius: '50%',
            width: 50,
            height: 50,
            position: 'absolute',
          },
          magnifierStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      />
    </div>
  );
};

export default MagnifiedImage;
