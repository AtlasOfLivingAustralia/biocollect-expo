import { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';

interface SkeletonRectProps extends ViewProps {
  width: string | number;
  height: string | number;
}

export default (props: SkeletonRectProps) => {
  const theme = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);

  return (
    <Animated.View
      {...props}
      style={{
        width: props.width,
        height: props.height,
        ...(props.style as object),
        opacity: pulse,
        backgroundColor: theme.skeleton,
      }}
    ></Animated.View>
  );
};
