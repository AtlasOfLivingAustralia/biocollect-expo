import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Import screen components
import Navigator from './src/Navigator';

// Authentication helpers
import { AuthProvider } from './src/helpers/auth';

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

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
      <Navigator />
    </AuthProvider>
  );
}

export default App;
