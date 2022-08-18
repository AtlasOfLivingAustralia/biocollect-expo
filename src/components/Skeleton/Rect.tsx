import { useEffect, useRef, useState } from 'react';
import { Animated, ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';

interface SkeletonRectProps extends ViewProps {
  width?: string | number;
  height?: string | number;
  loading: boolean;
}

export default ({
  width,
  height,
  loading,
  style,
  ...rest
}: SkeletonRectProps) => {
  const theme = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  const anim = useRef(
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
    )
  ).current;

  useEffect(() => {
    if (loading) {
      anim.start();
    } else {
      anim.stop();
      pulse.setValue(1);
    }
  }, [pulse, loading]);

  return (
    <Animated.View
      {...rest}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        ...(style as object),
        opacity: pulse,
        backgroundColor: loading ? theme.skeleton : 'transparent',
      }}
    ></Animated.View>
  );
};
