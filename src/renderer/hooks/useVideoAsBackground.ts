import { useContext, useEffect } from 'react';
import { BackgroundSetterContext } from '@/renderer/contexts/Background';

export const useVideoAsBackground = (video?: string): void => {
  const setter = useContext(BackgroundSetterContext);
  useEffect(() => {
    video ? setter?.setBackground(video) : setter?.setDefaultBackground();
  }, [video, setter]);
};
