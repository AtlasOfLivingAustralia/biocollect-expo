import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

// Authentication helpers
import {
  openAuthSessionAsync,
  WebBrowserRedirectResult,
} from 'expo-web-browser';

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
    const redirect_uri = Linking.createURL('/auth');
    const result = await openAuthSessionAsync(
      `https://auth-test.ala.org.au/cas/oidc/oidcAuthorize?client_id=oidc-expo-test&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}&response_type=token&scope=openid%20email%20profile%20users%3Aread`,
      redirect_uri
    );

    // If the authentication was successfull
    if (result.type === 'success') {
      console.log(
        result,
        Linking.parse(
          (result as WebBrowserRedirectResult).url.replace('auth#', 'auth?')
        )
      );

      // Trigger the exit animation, and then actually navigate
      setExitAnim(true);
      setTimeout(() => props.navigation.navigate('Home'), 1100);
    }
  };

  return (
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
          text="Sign in with ALA"
          icon={alaLogo}
          disabled={exitAnim}
          // onPress={handleAuth}
          onPress={handleAuth}
        />
      </Animated.View>
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
