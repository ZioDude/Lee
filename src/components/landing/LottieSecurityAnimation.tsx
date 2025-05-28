'use client'; // Lottie player likely uses client-side features

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
// Use ComponentProps to derive the type from the Lottie component itself
type LottieComponentProps = React.ComponentProps<typeof Lottie>;

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
  // Use 'any' for animationData if LottieProps['animationData'] is problematic, 
  // or find the correct type for Bodymovin JSON
  const [animationData, setAnimationData] = useState<any>(null); 

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
