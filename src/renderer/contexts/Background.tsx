import React, { useMemo, useState } from 'react';

const DEFAULT_BACKGROUND_VIDEO =
  'https://static.videezy.com/system/resources/previews/000/008/220/original/Triangles_01.mp4';

export const BackgroundStateContext = React.createContext<string>(
  DEFAULT_BACKGROUND_VIDEO
);

type BackgroundSetter = {
  setBackground: (video: string) => void;
  setDefaultBackground: () => void;
};

export const BackgroundSetterContext = React.createContext<BackgroundSetter | null>(
  null
);

const BackgroundProvider: React.FC = ({ children }) => {
  const [background, setBackground] = useState<string>(
    DEFAULT_BACKGROUND_VIDEO
  );
  const setters = useMemo(
    () => ({
      setBackground,
      setDefaultBackground: () => setBackground(DEFAULT_BACKGROUND_VIDEO),
    }),
    []
  );

  return (
    <BackgroundStateContext.Provider value={background}>
      <BackgroundSetterContext.Provider value={setters}>
        {children}
      </BackgroundSetterContext.Provider>
    </BackgroundStateContext.Provider>
  );
};

export default BackgroundProvider;
