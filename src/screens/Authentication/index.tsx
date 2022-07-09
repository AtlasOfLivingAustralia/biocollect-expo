import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet } from 'react-native';

import globalStyles from 'components/styles';
import Header from './Header';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';

// Theming imports
import { getCurrentTheme } from 'theme/index';

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
      {/* <TextInput
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
      /> */}
      <View style={localStyles.content}>
        <Image
          source={biocollectLogo}
          style={{ width: 125, height: 125, marginBottom: 12 }}
        />
        <Text style={styles.title}>BioCollect</Text>
        <Text style={styles.subtitle}>Mobile</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  content: {
    display: 'flex',
    alignItems: 'center',
    padding: 12,
  },
});
