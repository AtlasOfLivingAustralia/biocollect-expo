import { View, Text, StyleSheet, TextInput } from 'react-native';
import { getCurrentTheme } from '../theme';

import globalStyles from '../components/styles';
import { useCallback, useState } from 'react';

interface AuthForm {
  username: string;
  password: string;
}

export default function Authentication() {
  const [authForm, setAuthForm] = useState<AuthForm>({
    username: '',
    password: ''
  })
  const styles = globalStyles();

  const updateAuthForm = useCallback((property, value) => {
    setAuthForm({ ...authForm, [property]: value });
  }, [authForm]);

  return (
    <View style={styles.homeContainer}>
      <Text>Authentication</Text>
      <TextInput
        style={styles.textInput} value={authForm.username}
        onChangeText={(value) => updateAuthForm('username', value)}
        />
      <TextInput
        style={styles.textInput} value={authForm.password}
        onChangeText={(value) => updateAuthForm('password', value)}
        />
    </View>
  );
}