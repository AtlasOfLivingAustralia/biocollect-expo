import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { View } from 'react-native';
import { useTheme } from 'styled-components';

interface SkeletonCircleProps {
  size: number;
}

export default ({ size }: SkeletonCircleProps) => {
  const theme = useTheme();
  return (
    <View>
      <ContentLoader
        interval={0}
        speed={2}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        backgroundColor={theme.skeleton.primary}
        foregroundColor={theme.skeleton.secondary}
      >
        <Circle cx={size / 2} cy={size / 2} r={size / 2} />
      </ContentLoader>
    </View>
  );
};
