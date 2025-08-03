// import React, { useState, useEffect } from 'react';
// import ProgressiveImage from '../../shared/progressive-image';
// import MagnifiedImage from '../magnified-image/MagnifiedImage';
// import { SkeletonHomeBanner } from '../home/styled';
// import { Skeleton } from '@mui/material';
// import { range } from 'lodash';

// const LeftSideImageGallery = ({ images }: any) => {
//   const [bannerImage, setBannerImage] = useState<string>('');
//   const [imageLoaded, setImageLoaded] = useState<boolean>(false);

//   useEffect(() => {
//     if (images?.length && images?.length > 0) {
//       setBannerImage(images[0]?.original);
//     }
//   }, [images]);

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   const SliderSkeleton = ({ value }: { value: number }): any =>
//     range(value).map(() => (
//       <SkeletonHomeBanner key={value}>
//         <Skeleton variant="rectangular" width={1200} height={600} />
//       </SkeletonHomeBanner>
//     ));

//   return (
//     <div className="product-detail-left">
//       <div className="product-detail-img">
//         {!imageLoaded && <SliderSkeleton value={1} />}

//         <MagnifiedImage
//           src={bannerImage}
//           alt="Banner Image"
//           onLoad={handleImageLoad}
//           style={{ display: imageLoaded ? 'block' : 'none' }}
//         />
//       </div>
//       <div className="product-multiple-img-wrap">
//         {images?.map((image: any, index: number) => (
//           <div
//             className={`product-multiple-img ${
//               image.original === bannerImage && 'active'
//             }`}
//             onClick={() => setBannerImage(image?.original)}
//             key={index}
//           >
//             <ProgressiveImage src={image?.original} alt="" />
//           </div>
//         ))}
//         {/* {video && (
//           <div
//             className={`product-multiple-img ${video === bannerImage ? 'active' : ''}`}
//             onClick={() => setBannerImage(video)}
//           >
//             <button className="video-link">Video</button>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default LeftSideImageGallery;

import React, { useState, useEffect, useRef } from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import MagnifiedImage from '../magnified-image/MagnifiedImage';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import { SkeletonHomeBanner } from '../home/styled';
import { Skeleton } from '@mui/material';
import { range } from 'lodash';
import Image from 'next/image';
import pause from '../../assets/images/pause.png';
import play from '../../assets/images/play.png';
import { useRouter } from 'next/router';

const LeftSideImageGallery = ({ images, video, cover_image }: any) => {
  const playerRef = useRef<any>(null); // Create a reference to the ReactPlayer component
  const [bannerImage, setBannerImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isVideoActive, setIsVideoActive] = useState<boolean>(false); // Track if the video is active
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (images?.length && images?.length > 0) {
      setBannerImage(images[0]?.original);
    }

    setIsVideoActive(false);
  }, [images]);

  console.log(video, 'video');

  const router = useRouter(); // Next.js router
  // Existing state and functions...

  useEffect(() => {
    // Reset isPlaying state when route changes
    const handleRouteChange = () => {
      setIsPlaying(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleVideoClick = () => {
    setImageLoaded(true);
    setIsVideoActive(true); // Set video as active when clicked
    setBannerImage(video); // Set video as banner image
    setIsPlaying(true); // Start playing the video
  };

  const handlePlayPauseClick = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    // const video = document.querySelector('video');
    if (video && video.paused) {
      video.play();
      setIsPlaying(true);
    } else if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const SliderSkeleton = ({ value }: { value: number }): any =>
    range(value).map((index) => (
      <SkeletonHomeBanner key={index}>
        <Skeleton variant="rectangular" width={1200} height={600} />
      </SkeletonHomeBanner>
    ));

  return (
    <div className="product-detail-left">
      <div className="product-detail-img">
        {!imageLoaded && <SliderSkeleton value={1} />}

        {isVideoActive ? (
          <ReactPlayer
            ref={playerRef} // Pass the ref to the ReactPlayer component
            url={bannerImage}
            controls
            playing={isPlaying} // Pass isPlaying as the value for playing prop
            onPause={() => setIsPlaying(false)} // Pause event handler
            onPlay={() => setIsPlaying(true)} // Play event handler
          />
        ) : (
          <MagnifiedImage
            src={bannerImage}
            alt="Banner Image"
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        )}
      </div>
      <div className="product-multiple-img-wrap">
        {images?.map((image: any, index: number) => (
          <div
            className={`product-multiple-img ${
              image.original === bannerImage && 'active'
            }`}
            onClick={() => {
              setBannerImage(image?.original);
              setIsVideoActive(false);
              setIsPlaying(false);
            }}
            key={index}
          >
            <ProgressiveImage src={image?.original} alt="" />
          </div>
        ))}

        {video && (
          <div
            className={`product-multiple-img ${
              video === bannerImage ? 'active' : ''
            }`}
            onClick={handleVideoClick}
          >
            <div>
              <ProgressiveImage
                src={cover_image?.thumbnail || images[0]?.original}
                alt=""
              />
              <div style={{ display: 'none' }}>
                <video
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
              <div>
                {isPlaying ? (
                  <button onClick={handlePlayPauseClick}>
                    <div>
                      <Image src={pause} alt="play" width={14} height={19} />
                    </div>
                  </button>
                ) : (
                  <button onClick={handlePlayPauseClick}>
                    <div>
                      <Image src={play} alt="play" width={16} height={18} />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSideImageGallery;
