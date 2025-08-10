import styled from 'styled-components';

export const CollectionStyled = styled.section`
  &.collection { 
    padding: 40px 0 40px 0;
    background: #fef9f8;
  }
  
  &.collection .collection-title {
    border-radius: 10px;
    background-image: url('https://api.harvinchairs.com//storage//72//667131d7f06b8_Wooden-Chairs.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 0 28px 0 28px;
    position: relative;
    min-height: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &.collection .collection-title::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 26, 0.8);
    z-index: 1;
  }
  
  &.collection .collection-title h3 {
    line-height: 41px;
    color: white;
    position: relative;
    z-index: 2;
  }
  
  .collection-img {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .collection-img img {
    width: 100%;
    cursor: pointer;
  }
  
  .collection-img .collection-name-wrap {
    position: absolute;
    width: 100%;
    bottom: 0px;
    visibility: hidden;
    opacity: 0;
    padding: 0 20px;
    transition: all 0.3s ease;
  }
  
  .collection-img .collection-name {
    padding: 20px 28px 20px 28px;
    color: white;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.5s ease;
    display: inline-block;
  }
  
  .collection-img:hover .collection-name-wrap {
    visibility: visible;
    opacity: 1;
    bottom: 30px;
  }
`;
