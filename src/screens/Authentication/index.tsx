import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Button from 'components/Button';
import globalStyles from 'components/styles';
import Header from './Header';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';
import alaLogo from 'assets/images/ui/ala-white.png';

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
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            source={biocollectLogo}
            style={{ width: 125, height: 125, marginBottom: 12 }}
          />
          <Text style={styles.title}>BioCollect</Text>
          <Text style={styles.subtitle}>Welcome</Text>
        </View>
        <Button text="Sign in with ALA" icon={alaLogo} />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingTop: 12,
    paddingBottom: 132,
  },
});
