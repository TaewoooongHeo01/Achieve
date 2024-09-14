const gradientColorset: string[][] = [
  ['white', 'white'],
  //빨, 주, 노, 초, 파, 남, 보, 핑, 아이보리
  ['rgba(250, 97, 115, 1)', 'rgba(250, 97, 115, 1)'],
  ['rgb(252, 111, 70)', 'rgb(252, 111, 70)'],
  ['rgb(245, 206, 71)', 'rgb(245, 206, 71)'],
  ['#ddff33', '#ddff33'],
  ['rgb(51, 231, 131)', 'rgb(51, 231, 131)'],
  ['rgb(92, 171, 208)', 'rgb(92, 171, 208)'],
  ['rgba(207, 66, 184, 1)', 'rgba(207, 66, 184, 1)'],
  ['rgb(239, 229, 222)', 'rgb(239, 229, 222)'],
  ['rgb(237, 133, 173)', 'rgb(237, 133, 173)'],

  //파스텔 톤
  ['#ffadad', '#ffadad'],
  ['#ffd6a5', '#ffd6a5'],
  ['#fdffb6', '#fdffb6'],
  ['#caffbf', '#caffbf'],
  ['#9bf6ff', '#9bf6ff'],
  ['#a0c4ff', '#a0c4ff'],
  ['#bdb2ff', '#bdb2ff'],
  ['#ffc6ff', '#ffc6ff'],

  //그라데이션
  ['#ff6f91', '#ff9671', '#f9f871'],
  ['#ddff33', '#6ce46a'],
  ['#84fab0', '#8fd3f4'], //초-파
  ['#d299c2', '#fef9d7'], //핑-노
  ['#5e60ce', '#64dfdf'], //노-파
  ['#e7c6ff', '#b8c0ff'], //Kind Steel
  ['#accbee', '#e7f0fd'], //Febuary Ink
  ['#f3e7e9', '#e3eeff'], //Cloudy Apple
];

export const ligthmodeHeatmapColorSet: string[] = [
  '#97ef7f',
  '#68ce4e',
  '#258c0b',
  '#378025',
  '#165607',
];

export const darkmodeHeatmapColorSet: string[] = [
  'rgba(8, 74, 0, 1)',
  '#0a5d00',
  '#089000',
  '#1fc600',
  '#0eff00',
];

const lightmodeRed: string = 'rgba(255, 91, 91, 1)';
const lightmodeGreen: string = 'rgba(72, 217, 35, 1)';

const darkmodeRed: string = '	rgb(195,1,1)';
const darkmodeGreen: string = 'rgb(38, 177, 83)';

export type ColorSet = {
  textColor: string;
  backgroundColor: string;
  appBackgroundColor: string;
  gradientColor: string[][];
  heatmapColor: string[];
  red: string;
  green: string;
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
    gradientColor: gradientColorset,
    heatmapColor: ligthmodeHeatmapColorSet,
    red: lightmodeRed,
    green: lightmodeGreen,
  },
  dark: {
    textColor: '#FFFFFF',
    backgroundColor: '#282828',
    appBackgroundColor: '#121212',
    gradientColor: gradientColorset,
    heatmapColor: darkmodeHeatmapColorSet,
    red: darkmodeRed,
    green: darkmodeGreen,
  },
};

export default Colors;
