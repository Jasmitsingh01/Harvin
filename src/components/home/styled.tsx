import styled from 'styled-components';

export const BannerSectionStyled = styled.section`
  /* .banner {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    margin: 20px 1px 0 1px;
    cursor: pointer;
  }
  .banner-listing {
    .slick-dots {
      display: flex !important;
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translate(-50%, 0);
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        margin: 0 4px;
        button {
          border-radius: 50%;
          font-size: 0;
          padding: 5px;
          border: 0;
          background-color: #ffffff91;
          transition: all 0.3s;
          &:hover {
            background-color: #ffffff;
          }
        }
        &.slick-active {
          button {
            border-radius: 10px;
            background-color: white;
            padding: 5px 8px;
          }
        }
      }
    }
  }



  @media screen and (min-width: 768px) and (max-width: 991px) {
    .banner-section .banner-listing .slick-dots {
      bottom: 14px;
    }
    .banner {
      margin-top: 10px !important;
    }
  }

  @media screen and (max-width: 767px) {
    .banner {
      margin-top: 10px !important;
    }
    .banner-section .banner-listing .slick-dots {
      bottom: 4px;
    }
    .banner-section .banner-listing .slick-dots li {
      margin: 0 3px;
    }
    .banner-section .banner-listing .slick-dots li button {
      padding: 3px;
    }
    .banner-section .banner-listing .slick-dots li.slick-active button {
      padding: 3px 5px;
    }
  } */
`;

export const SkeletonHomeBanner = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
