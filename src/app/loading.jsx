import React from 'react';
import './Loading.css';

const Loading = ({ loading }) => {
return (
    <div className="loading-spinner">
  {loading && (
   <div className="loading-overlay">
  <div className="skeleton-header"></div>
  <div className="skeleton-subheader"></div>
   <div className="skeleton-table">
   {[...Array(5)].map((_, index) => (
   <div className="skeleton-row" key={index}>
   <div className="skeleton-cell"></div>
   <div className="skeleton-cell"></div>
   <div className="skeleton-cell"></div>  
   <div className="skeleton-cell"></div>
   <div className="skeleton-cell"></div>
   </div>
  ))}
 </div>
 </div>
  )}
</div>
 );
 };

export default Loading;
