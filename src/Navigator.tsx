import { ReactElement, useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screen components
import { Authentication, Home } from './screens';

// Authentication helpers
import { AuthContext } from './helpers/auth';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

function App(): ReactElement {
  // State for hiding / showing status bar based on route
  const [statusHidden, setStatusHidden] = useState<boolean>(true);

  // Auth helper
  const auth = useContext(AuthContext);
  if (auth.loading) return null;

  return (
    <NavigationContainer>
      <StatusBar style='auto' hidden={statusHidden} />
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
        initialRouteName={auth.authenticated ? 'Home' : 'Authentication'}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Authentication' component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
