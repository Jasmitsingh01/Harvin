import React from 'react';
// import './LoadingComponent.css'; // Import your updated styles

const Loading = ({ innerDiv }: any) => {
  return (
    <div className={`parent-loading-container ${innerDiv && 'innerDiv'}`}>
      <div className="loadingio-spinner-spinner-tnhehy9ah">
        <div className="ldio-4qd17q7gjde">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
