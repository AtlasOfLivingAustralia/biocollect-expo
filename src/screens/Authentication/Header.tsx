import { useRef, useEffect, Component } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

// Theming
import { getCurrentTheme } from '../../theme';

// Images
import imageSplash from 'assets/images/ui/splash.png';
import Wave from 'assets/images/ui/wave.svg';

class WaveComponent extends Component<SvgProps> {
  render() {
    return <Wave {...this.props} />;
  }
}

const AnimatedWave = Animated.createAnimatedComponent(WaveComponent);

export default function Home() {
  const anim = useRef(new Animated.Value(1000)).current;
  const theme = getCurrentTheme();

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 100,
      duration: 1500,
      easing: Easing.bezier(0.2, 0.8, 0, 1),
      useNativeDriver: false,
    }).start();
  }, [anim]);

  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <ImageBackground
          style={localStyles.image}
          resizeMode="cover"
          source={imageSplash}
        >
          <AnimatedWave
            fill={theme.background.primary}
            style={{
              ...localStyles.wave,
              height: anim,
            }}
            preserveAspectRatio="xMinYMin slice"
          />
        </ImageBackground>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
  },
  image: {
    width: '100%',
    height: 240,
  },
  wave: {
    marginTop: 'auto',
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
