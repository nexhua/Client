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
import i18n from './src/localization/_i18n';

import {enGB, tr, registerTranslation} from 'react-native-paper-dates';

import {ApiClient, ApiProvider} from 'jsonapi-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

registerTranslation('en-GB', enGB);
registerTranslation('tr', tr);

const Stack = createNativeStackNavigator<StackParamList>();

const schema = {
  recipes: {
    type: 'recipes',
    relationships: {
      utensils: {
        type: 'utensils',
      },
      nutrients: {
        type: 'nutrients',
      },
      instructions: {
        type: 'instructions',
      },
      ingredients: {
        type: 'ingredients',
      },
    },
  },
};

const client = new ApiClient({
  url: 'http://192.168.0.14:37001',
  schema,
});

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
    <GestureHandlerRootView style={{flex: 1}}>
      <ApiProvider client={client}>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Stack.Navigator initialRouteName="SignIn">
                {user === null ? (
                  <>
                    <Stack.Screen
                      name="SignUp"
                      component={SignUp}
                      options={{
                        title: i18n.t('sign-up'),
                        headerTitleAlign: 'center',
                      }}
                    />
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
      </ApiProvider>
    </GestureHandlerRootView>
  );
}

export default App;
