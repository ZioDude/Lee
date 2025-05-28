'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';

const VaultModel: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '500px', pointerEvents: 'none' }}> {/* Adjust size as needed, added pointerEvents: 'none' */}
      <Spline scene="https://prod.spline.design/ohELC1M5XBP7nsFH/scene.splinecode" />
    </div>
  );
};

export default VaultModel;
