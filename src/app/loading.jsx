import React from 'react';
import './Loading.css';

const Loading = ({ loading }) => {
    return (
        <div className="loading-spinner">
            <p>Loading...</p>
            {loading && <div className="loading-overlay"></div>}
        </div>
    );
};

export default Loading;
