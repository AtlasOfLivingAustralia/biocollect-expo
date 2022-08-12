import { StyleSheet } from 'react-native';

// Themes
import { getCurrentTheme } from 'theme/index';

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
      padding: 12,
    },
    authenticationContainer: {
      flex: 1,
      backgroundColor: theme.background.primary,
    },
    title: {
      fontFamily: 'Lato',
      fontSize: 36,
      color: theme.text.primary,
    },
    subtitle: {
      fontFamily: 'Lato',
      fontSize: 24,
      color: theme.text.secondary,
    },
  });
};
