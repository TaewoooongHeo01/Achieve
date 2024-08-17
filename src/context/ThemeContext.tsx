import { createContext, useContext, useState } from 'react';
import Colors, { ColorTheme } from '../style/ThemeColor';

type ThemeContextType = {
  theme: ColorTheme;
  setColorTheme: (colors: ColorTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setColorTheme] = useState(Colors.dark);

  return (
    <ThemeContext.Provider value={{ theme, setColorTheme }}>
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
    setColorTheme: store.setColorTheme,
  };
};
