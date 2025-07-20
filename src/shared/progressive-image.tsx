import * as React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
const ProgressiveImage: NextPage | any = (props: any) => {
  const {
    src,
    style,
    alt,
    width,
    height,
    className,
    key,
    layout = 'responsive',
  } = props;
  return (
    <div className="img-container" key={key}>
      <Image
        src={src}
        key={key}
        width={width || 800}
        height={height || 800}
        className={className}
        layout={layout}
        style={
          style || {
            maxWidth: '100%',
            height: 'auto',
          }
        }
        alt={alt}
        loading="eager"
      />
    </div>
  );
};

export default ProgressiveImage;
