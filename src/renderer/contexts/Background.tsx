import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

const DEFAULT_BACKGROUND_VIDEO =
  'https://static.videezy.com/system/resources/previews/000/008/220/original/Triangles_01.mp4';

const BackgroundStateContext = React.createContext<string>(
  DEFAULT_BACKGROUND_VIDEO
);

const BackgroundSetterContext = React.createContext<
  ((video: string) => void) | null
>(null);

export const useBackgroundVideoState = (): string => {
  return useContext(BackgroundStateContext);
};

export const useBackgroundVideo = (
  video: string = DEFAULT_BACKGROUND_VIDEO
): void => {
  const setBackground = useContext(BackgroundSetterContext);

  useEffect(() => {
    setBackground?.(video);
  }, [video, setBackground]);
};

const BackgroundProvider: React.FC = ({ children }) => {
  const [background, _setBackground] = useState<string>(
    DEFAULT_BACKGROUND_VIDEO
  );

  const prevBackground = useRef<string>(DEFAULT_BACKGROUND_VIDEO);
  useEffect(() => {
    prevBackground.current = background;
  }, [background]);

  const setBackground = useCallback((video: string) => {
    if (video !== prevBackground.current) {
      _setBackground(video);
    }
  }, []);

  return (
    <BackgroundStateContext.Provider value={background}>
      <BackgroundSetterContext.Provider value={setBackground}>
        {children}
      </BackgroundSetterContext.Provider>
    </BackgroundStateContext.Provider>
  );
};

export default BackgroundProvider;
