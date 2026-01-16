import React from 'react';
import { useSelector } from 'react-redux';

const LoadingComponent: React.FC = () => {
  const isLoading = useSelector((state: any) => state?.LoadingPage?.isLoading);

  if (isLoading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 9999, 
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
            </div>
    );
}

  return null;
};

export default LoadingComponent;
