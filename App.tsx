import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';

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
        <Navigator />
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
