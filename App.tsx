import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Import screen components
import { Authentication, Home } from './src/screens';

const Stack = createNativeStackNavigator();

function App() {
  // Load the Lato font
  const [fontsLoaded, fontsError] = useFonts({
    Lato: require('./assets/fonts/Lato.ttf')
  });

  // TODO: Update with better loading animation
  if (!fontsLoaded) return <Text>Loading fonts...</Text>;
  if (fontsError) return <Text>Font Error!</Text>;

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Authentication">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
