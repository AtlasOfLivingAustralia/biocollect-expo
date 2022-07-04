import { StyleSheet } from "react-native";

// Themes
import { getCurrentTheme } from 'theme';

export default () => {
  const theme = getCurrentTheme();
  
  return StyleSheet.create({
    textInput: {
      backgroundColor: theme.background.secondary,
      color: 'white',
      padding: 10,
      borderRadius: 12,
      marginBottom: 6,
      minWidth: 125,
    },
    homeContainer: {
      flex: 1,
      backgroundColor: theme.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    authenticationContainer: {
      flex: 1,
      backgroundColor: theme.background.primary
    },
  });
}