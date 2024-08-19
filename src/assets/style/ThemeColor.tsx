const gradientColorset: string[][] = [
  ['#fbc2eb', '#a6c1ee'], //Rainy Ashville //밝게
  ['#a1c4fd', '#c2e9fb'], //Winter Neva
  ['#84fab0', '#8fd3f4'], //Tempting AzureGet”,
  ['#a8edea', '#fed6e3'], //Rare Wind
  ['#d299c2', '#fef9d7'], //Wild Apple
  ['#66a6ff', '#89f7fe'], //Happy Fisher
  ['#fddb92', '#d1fdff'], //Blessing
  ['#9890e3', '#b1f4cf'], //Sharpeye Eagle
  ['#fff1eb', '#ace0f9'], //New York
  ['#e9defa', '#fbfcdb'], //Kind Steel
  ['#df89b5', '#bfd9fe'], //Forest Inei //밝게
  ['#accbee', '#e7f0fd'], //Febuary Ink
  ['#fdfcfb', '#e2d1c3'], //Everlasting Sky
  ['#c1dfc4', '#deecdd'], //Soft Grass
  ['#93a5cf', '#e4efe9'], //Mirror Clean
  ['#f3e7e9', '#e3eeff'], //Cloudy Apple
  ['#dad4ec', '#f3e7e9'], //Confident Cloud
  ['#E3FDF5', '#FFE6FA'], //Perfect White
];

export type ColorSet = {
  textColor: string;
  backgroundColor: string;
  appBackgroundColor: string;
  goalGradientColor: string[][];
};

type ColorTheme = {
  light: ColorSet;
  dark: ColorSet;
};

const Colors: ColorTheme = {
  light: {
    textColor: '#282828',
    backgroundColor: '#FFFFFF',
    appBackgroundColor: '#FDFDFD',
    goalGradientColor: gradientColorset,
  },
  dark: {
    textColor: '#FFFFFF',
    backgroundColor: '#282828',
    appBackgroundColor: '#121212',
    goalGradientColor: gradientColorset,
  },
};

export default Colors;
