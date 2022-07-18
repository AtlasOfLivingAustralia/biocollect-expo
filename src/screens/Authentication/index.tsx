import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

// Auth Session Helpers
import {
  fetchDiscoveryAsync,
  CodeChallengeMethod,
  AuthRequest,
  AccessTokenRequest,
} from 'expo-auth-session';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from 'components/Button';
import globalStyles from 'components/styles';
import Header from './Header';
import { RootStackParamList } from '../../../App';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';
import alaLogo from 'assets/images/ui/ala-white.png';

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Authentication'>
) {
  const [authenticating, setAuthenticating] = useState<boolean>(false);

  // Animation / styling
  const [exitAnim, setExitAnim] = useState<boolean>(false);
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const styles = globalStyles();

  // Animation effect
  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: exitAnim ? 0 : 1,
      duration: exitAnim ? 200 : 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [fadeInAnim, exitAnim]);

  // Authentication handler
  const handleAuth = async () => {
    // Update the UI to disable the button
    setAuthenticating(true);

    // Create a deep link for authentication redirects
    const redirectUri = Linking.createURL('/auth');

    // Construct the OIDC code request
    const codeRequest = new AuthRequest({
      clientId: 'oidc-expo-test',
      redirectUri,
      scopes: ['openid', 'email', 'profile'],
      codeChallengeMethod: CodeChallengeMethod.S256,
    });

    try {
      // Fetch the discovery metadata
      const discovery = await fetchDiscoveryAsync(
        'https://auth-test.ala.org.au/cas/oidc'
      );

      // Start the authentication flow
      const result = await codeRequest.promptAsync(discovery);
      console.log(result);

      // If the authentication was successfull
      if (result.type === 'success') {
        // Construct the OIDC access token request
        const tokenRequest = new AccessTokenRequest({
          clientId: codeRequest.clientId,
          scopes: codeRequest.scopes,
          code: result.params.code,
          redirectUri,
          extraParams: {
            code_verifier: codeRequest.codeVerifier,
          },
        });

        const accessToken = await tokenRequest.performAsync(discovery);
        console.log(accessToken);

        // Trigger the exit animation, and then actually navigate
        setExitAnim(true);
        setTimeout(() => props.navigation.navigate('Home'), 1100);
      } else {
        setAuthenticating(false);
      }
    } catch (error) {
      setAuthenticating(false);
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.authenticationContainer}>
        <Header exitAnim={exitAnim} />
        <Animated.View
          style={{
            ...localStyles.content,
            opacity: fadeInAnim,
          }}
        >
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              source={biocollectLogo}
              style={{ width: 125, height: 125, marginBottom: 12 }}
            />
            <Text style={styles.title}>BioCollect</Text>
            <Text style={styles.subtitle}>Welcome</Text>
          </View>
          <Button
            text='Sign in with ALA'
            icon={alaLogo}
            disabled={exitAnim || authenticating}
            loading={authenticating}
            // onPress={handleAuth}
            onPress={handleAuth}
          />
        </Animated.View>
      </View>
    </>
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
