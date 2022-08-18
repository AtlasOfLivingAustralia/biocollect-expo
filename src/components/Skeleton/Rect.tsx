import { useEffect, useRef, useState } from 'react';
import { Animated, ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';

interface SkeletonRectProps extends ViewProps {
  width?: string | number;
  height?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  margin?: string | number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderRadius?: number;
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
        opacity: pulse,
        backgroundColor: loading ? theme.skeleton : 'transparent',
        marginTop: rest.marginTop || 0,
        marginBottom: rest.marginBottom || 0,
        marginLeft: rest.marginLeft || 0,
        marginRight: rest.marginRight || 0,
        margin: rest.margin || 0,
        borderTopLeftRadius: rest.borderTopLeftRadius || theme.radius / 2,
        borderTopRightRadius: rest.borderTopRightRadius || theme.radius / 2,
        borderBottomLeftRadius: rest.borderBottomLeftRadius || theme.radius / 2,
        borderBottomRightRadius:
          rest.borderBottomRightRadius || theme.radius / 2,
        borderRadius: 0,
      }}
    ></Animated.View>
  );
};
