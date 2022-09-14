import { useRef, useEffect, Component } from 'react';
import { View, Animated, Easing, StyleSheet, ImageBackground } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native';

// Images
import imageSplash from 'assets/images/ui/splash.png';
import Wave from 'assets/images/ui/wave.svg';

class WaveComponent extends Component<SvgProps> {
  render() {
    return <Wave {...this.props} />;
  }
}

const AnimatedWave = Animated.createAnimatedComponent(WaveComponent);

interface RootProps {
  height: number;
}

const Root = styled(View)<RootProps>`
  width: 100%;
  height: ${({ height }) => height || 240}px;
`;

const Image = styled(ImageBackground)<RootProps>`
  width: 100%;
  height: ${({ height }) => height || 240}px;
`;

interface HeaderProps extends RootProps {
  exitAnim: boolean;
}

export default function Header({ height, exitAnim }: HeaderProps) {
  const swirlAnim = useRef(new Animated.Value(600)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(swirlAnim, {
      toValue: exitAnim ? 600 : 100,
      duration: exitAnim ? 1000 : 1500,
      easing: exitAnim ? Easing.bezier(0.25, 0.1, 0.25, 1) : Easing.bezier(0.2, 0.8, 0, 1),
      useNativeDriver: false,
    }).start();
  }, [swirlAnim, exitAnim]);

  return (
    <Root height={height}>
      <View style={localStyles.header}>
        <Image height={height} resizeMode="cover" source={imageSplash}>
          <AnimatedWave
            fill={theme.background.primary}
            style={{
              ...localStyles.wave,
              height: swirlAnim,
            }}
            preserveAspectRatio="xMinYMin slice"
          />
        </Image>
      </View>
    </Root>
  );
}

const localStyles = StyleSheet.create({
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
