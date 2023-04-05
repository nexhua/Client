import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import {CombinedDefaultTheme, CombinedDarkTheme} from './src/style/Theme';

import {PreferencesContext} from './src/contexts/PreferenceContext';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {type StackParamList} from './src/navigation/NavigationTypes';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

import {type FirebaseAuthTypes} from '@react-native-firebase/auth';
import {subscribe} from './src/services/auth/Auth';
import Main from './src/pages/Main';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null): void {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = subscribe(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="SignIn">
            {user === null ? (
              <>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
