import { useRef, useEffect } from 'react';
import { SafeAreaView, Animated, Easing } from 'react-native';

import globalStyles from 'components/styles';

export default function Home() {
  const styles = globalStyles();
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  // Animation effect
  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [fadeInAnim]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Animated.Text
        style={{
          ...styles.title,
          opacity: fadeInAnim,
        }}
      >
        Home Screen
      </Animated.Text>
    </SafeAreaView>
  );
}
