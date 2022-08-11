import { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';

import Button from 'components/Button';
import globalStyles from 'components/styles';
import Header from './Header';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Authentication
import { AuthContext } from '../../helpers/auth';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';
import alaLogo from 'assets/images/ui/ala-white.png';

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Authentication'>
) {
  const auth = useContext(AuthContext);
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

    // Attempt to sign in
    try {
      if ((await auth.signIn()) !== null) {
        setExitAnim(true);
        setTimeout(() => props.navigation.navigate('Home'), 1100);
      }
    } catch (error) {
      console.log(error);
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      setExitAnim(false);
      setAuthenticating(false);
    });
  }, [props.navigation]);

  // useEffect(() => {
  //   console.log('exitAnim', exitAnim);
  // }, [exitAnim]);

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
            text="Sign in with ALA"
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
