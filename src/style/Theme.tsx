import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    muted: '#7E8299',
  },
};

export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    muted: '#7E8299',
  },
};

export type AppTheme = typeof CombinedDefaultTheme;
export const useAppTheme = (): AppTheme => {
  return useTheme<AppTheme>();
};
