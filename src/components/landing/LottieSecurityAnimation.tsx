'use client'; // Lottie player likely uses client-side features

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
// type LottieComponentProps = React.ComponentProps<typeof Lottie>; // Removed unused type

interface LottieAnimationProps {
  animationPath: string; // Custom prop to fetch animation data
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  // LottieComponentProps['loop'] and ['autoplay'] were duplicates, removed.
  // The simple boolean types above are what this wrapper component directly accepts.
}

const LottieSecurityAnimation: React.FC<LottieAnimationProps> = ({
  animationPath,
  loop = true,
  autoplay = true,
  className,
}) => {
  // Use 'object' for animationData as a more specific type than 'any'
  const [animationData, setAnimationData] = useState<object | null>(null); 

  useEffect(() => {
    fetch(animationPath)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, [animationPath]);

  if (!animationData) {
    return <div className={className || "w-60 h-60 flex items-center justify-center text-text-muted-strong"}>Loading Animation...</div>;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
};

export default LottieSecurityAnimation;
