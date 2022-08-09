import { useRef, useEffect, useContext } from 'react';
import { SafeAreaView, Animated, Easing, Text } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import globalStyles from 'components/styles';
import Button from 'components/Button';
import { AuthContext } from '../helpers/auth';

export default function Home(
  props: NativeStackScreenProps<RootStackParamList, 'Home'>
) {
  const auth = useContext(AuthContext);
  const styles = globalStyles();
  // const fadeInAnim = useRef(new Animated.Value(0)).current;

  // // Animation effect
  // useEffect(() => {
  //   Animated.timing(fadeInAnim, {
  //     toValue: 1,
  //     duration: 250,
  //     easing: Easing.ease,
  //     useNativeDriver: false,
  //   }).start();
  // }, [fadeInAnim]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Animated.View
        style={{
          // opacity: fadeInAnim,
          opacity: 1,
        }}
      >
        <Text style={styles.title}>Home Screen</Text>
        <Button
          text='Sign Out'
          onPress={async () => {
            await auth.signOut();
            props.navigation.navigate('Authentication');
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
