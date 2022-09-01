import { Text, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import axios from 'axios';
import { themes } from 'theme';
import 'intl';
import 'intl/locale-data/jsonp/en';

// Import screen components
import Navigator from './src/Navigator';

// Authentication helpers
import { AppEnvironmentProvider } from 'helpers/appenv';
import { AuthProvider } from 'helpers/auth';
import { APIProvider } from 'helpers/api';
import { BioCollectProject } from 'types';
import ThemeView from 'components/ThemeView';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
  Project: BioCollectProject;
};

axios.interceptors.request.use((config) => {
  console.log(
    `[API : Request] ${config.method.toUpperCase()} request to ${config.url}${
      config.params ? `\n${JSON.stringify(config.params, null, 2)}` : ''
    }`
  );

  return config;
});

function App() {
  const scheme = useColorScheme();

  // Load the Lato font
  const [fontsLoaded, fontsError] = useFonts({
    Lato: require('./assets/fonts/Lato.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  // Wait until the fonts have been loaded
  if (!fontsLoaded) return null;
  if (fontsError) return <Text>Font Error!</Text>;

  return (
    <AppEnvironmentProvider>
      <AuthProvider>
        <APIProvider>
          <ThemeProvider theme={themes[scheme]}>
            <ThemeView>
              <Navigator />
            </ThemeView>
          </ThemeProvider>
        </APIProvider>
      </AuthProvider>
    </AppEnvironmentProvider>
  );
}

export default App;
