import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Import screen components
import Navigator from './src/Navigator';

// Authentication helpers
import { AuthProvider } from './src/helpers/auth';
import { APIProvider } from './src/helpers/api';

import Constants from 'expo-constants';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

function App() {
  console.log(
    'MANIFEST CONFIG',
    JSON.stringify(Constants.manifest.extra, null, 2)
  );
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
