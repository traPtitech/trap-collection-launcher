import { useContext, useEffect } from 'react';
import { BackgroundSetterContext } from '@/renderer/contexts/Background';

export const useVideoAsBackground = (video?: string): void => {
  const setter = useContext(BackgroundSetterContext);
  useEffect(() => {
    if (video) {
      setter?.setBackground(video);
    } else {
      setter?.setBackgroundDefault();
    }
  }, [video, setter]);
};
