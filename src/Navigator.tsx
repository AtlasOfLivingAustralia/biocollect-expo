import { ReactElement, useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screen components
import { Authentication, Home, Project } from './screens';

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
        screenOptions={{ headerShown: false }}
        initialRouteName={auth.authenticated ? 'Home' : 'Authentication'}>
        <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ animation: 'none' }}
        />
        <Stack.Screen name="Project" component={Project} options={{ animation: 'simple_push' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
