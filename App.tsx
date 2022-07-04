import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

// Import screen components
import { Home } from './src/screens';

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
