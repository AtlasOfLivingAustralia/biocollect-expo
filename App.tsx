import { Text, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import axios from 'axios';
import { themes } from 'theme';

// Import screen components
import Navigator from './src/Navigator';

// Authentication helpers
import { AuthProvider } from './src/helpers/auth';
import { APIProvider } from './src/helpers/api';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

axios.interceptors.request.use((config) => {
  console.log(
    `[API : Request] ${config.method.toUpperCase()} request to ${
      config.url
    }\n${JSON.stringify(config.params, null, 2)}`
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
    <AuthProvider>
      <APIProvider>
        <ThemeProvider theme={themes[scheme]}>
          <Navigator />
        </ThemeProvider>
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
