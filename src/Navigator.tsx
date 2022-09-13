import { ReactElement, useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

// Import screen components
import { Authentication, Explore, Home, Project, Projects, WebView } from './screens';

// Authentication helpers
import { AuthContext } from './helpers/auth';

const Stack = createNativeStackNavigator();

function App(): ReactElement {
  // State for hiding / showing status bar based on route
  const [statusHidden, setStatusHidden] = useState<boolean>(true);
  const theme = useTheme();

  // Auth helper
  const auth = useContext(AuthContext);
  if (auth.loading) return null;

  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden={statusHidden} />
      <Stack.Navigator
        defaultScreenOptions={{
          contentStyle: {
            backgroundColor: theme.background.primary,
          },
        }}
        screenListeners={({ route }) => ({
          state: () => {
            switch (route.name) {
              default:
                break;
              case 'Authentication':
                setStatusHidden(false);
                break;
              case 'Home':
                setStatusHidden(false);
                break;
            }
          },
        })}
        screenOptions={{ headerShown: false }}
        initialRouteName={auth.authenticated ? 'Home' : 'Authentication'}>
        <Stack.Group>
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen
            name="Projects"
            component={Projects}
            options={{ animation: 'simple_push' }}
          />
          <Stack.Screen name="Project" component={Project} options={{ animation: 'simple_push' }} />
          <Stack.Screen
            name="WebView"
            component={WebView}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Explore"
            component={Explore}
            options={{ animation: 'slide_from_bottom' }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
