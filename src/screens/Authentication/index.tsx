import { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';

import Button from 'components/Button';
import globalStyles from 'components/styles';
import Header from './Header';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';
import alaLogo from 'assets/images/ui/ala-white.png';

interface AuthForm {
  username: string;
  password: string;
}

export default function Authentication() {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const styles = globalStyles();

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [fadeInAnim]);

  return (
    <View style={styles.authenticationContainer}>
      <StatusBar hidden />
      <Header />
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
        <Button text="Sign in with ALA" icon={alaLogo} />
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
