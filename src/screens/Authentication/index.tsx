import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput } from 'react-native';

import globalStyles from 'components/styles';
import Header from './Header';

// Theming imports
import { getCurrentTheme } from '../../theme';

interface AuthForm {
  username: string;
  password: string;
}

export default function Authentication() {
  const theme = getCurrentTheme();
  const [authForm, setAuthForm] = useState<AuthForm>({
    username: '',
    password: '',
  });
  const styles = globalStyles();

  const updateAuthForm = useCallback(
    (property, value) => {
      setAuthForm({ ...authForm, [property]: value });
    },
    [authForm]
  );

  return (
    <View style={styles.authenticationContainer}>
      <StatusBar hidden />
      <Header />
      <TextInput
        style={styles.textInput}
        value={authForm.username}
        onChangeText={(value) => updateAuthForm('username', value)}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        value={authForm.password}
        onChangeText={(value) => updateAuthForm('password', value)}
        placeholder="Password"
      />
    </View>
  );
}
