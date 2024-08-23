import { createContext, useContext, useState } from 'react';
import Colors, { ColorSet } from '../assets/style/ThemeColor';

export type ThemeContextType = {
  theme: ColorSet;
  currentTheme: string;
  applyColor: (colors: ColorSet, currentTheme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setColorTheme] = useState(Colors.dark);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const applyColor = (colorSet: ColorSet, colorTheme: string) => {
    setColorTheme(colorSet);
    setCurrentTheme(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, applyColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useColors = (): ThemeContextType => {
  const store = useContext(ThemeContext);
  if (store == null) {
    throw new Error('color theme is null');
  }
  return {
    theme: store.theme,
    currentTheme: store.currentTheme,
    applyColor: store.applyColor,
  };
};
