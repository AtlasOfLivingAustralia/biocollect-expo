import { useState } from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Import screen components
import { Authentication, Home } from './src/screens';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

function App() {
  // State for hiding / showing status bar based on route
  const [statusHidden, setStatusHidden] = useState<boolean>(true);

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
    <NavigationContainer>
      <StatusBar style="auto" hidden={statusHidden} />
      <Stack.Navigator
        screenListeners={({ route }) => ({
          state: () => {
            switch (route.name) {
              default:
                break;
              case 'Authentication':
                setStatusHidden(true);
                break;
              case 'Home':
                setStatusHidden(false);
                break;
            }
          },
        })}
        screenOptions={{ headerShown: false, animation: 'none' }}
        initialRouteName="Authentication"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
