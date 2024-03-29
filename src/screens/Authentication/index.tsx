import { useState, useEffect, useRef, useContext } from 'react';
import { View, Image, Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from 'components/Button';
import Title from 'components/Header/Header';
import Subtitle from 'components/Header/Subheader';
import Header from './Header';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Application contexts
import { AuthContext } from 'helpers/auth';
import { AppEnvironmentContext } from 'helpers/appenv';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';
import alaLogo from 'assets/images/ui/ala-white.png';
import ThemeView from 'components/ThemeView';
import DevModal from './DevModal';

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Authentication'>
) {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const appenv = useContext(AppEnvironmentContext);

  // Animation / styling
  const [exitAnim, setExitAnim] = useState<boolean>(false);
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
      if (await auth.signIn()) {
        setExitAnim(true);
        setTimeout(() => props.navigation.navigate('Home'), 1100);
      } else setAuthenticating(false);
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

  return (
    <>
      <DevModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <ThemeView>
        <Header height={190 + insets.top} exitAnim={exitAnim} />
        <Animated.View
          style={{
            ...localStyles.content,
            opacity: fadeInAnim,
          }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ width: 125, height: 125, marginBottom: 12 }}
              activeOpacity={1}
              onLongPress={() => {
                if (appenv.type !== 'prod') setModalVisible(true);
              }}>
              <Image
                source={biocollectLogo}
                style={{ width: 125, height: 125, marginBottom: 12 }}
              />
            </TouchableOpacity>
            <Title>BioCollect</Title>
            <Subtitle>Welcome</Subtitle>
          </View>
          <SafeAreaView>
            <Button
              text="Sign in with ALA"
              icon={alaLogo}
              disabled={exitAnim || authenticating}
              loading={authenticating}
              // onPress={handleAuth}
              onPress={handleAuth}
            />
          </SafeAreaView>
        </Animated.View>
      </ThemeView>
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
    paddingBottom: 48,
  },
});
