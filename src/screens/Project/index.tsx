import { useState } from 'react';
import { SafeAreaView, ImageBackground, Dimensions, Text } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Components
import ThemeView from 'components/ThemeView';
import Header from 'components/Header/Header';
import styled from 'styled-components/native';
import Button from 'components/Button';
import SkeletonRect from 'components/Skeleton/Rect';

interface HeaderImageProps {
  height: number;
}

const HeaderImage = styled(ImageBackground)<HeaderImageProps>`
  height: ${({ height }) => height}px;
  width: 100%;
`;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const { params: project } = props.route;
  const { width } = Dimensions.get('screen');

  const height = 250;
  return (
    <>
      <ThemeView>
        {project.fullSizeImageUrl ? (
          <HeaderImage
            resizeMode='cover'
            height={height}
            source={{ uri: project.fullSizeImageUrl }}
            onLoad={() => setHeaderLoaded(true)}
          >
            {!headerLoaded && <SkeletonRect width='100%' height={height} />}
          </HeaderImage>
        ) : null}
        <SafeAreaView>
          <Header size={28}>{project.name.trim()}</Header>
          <Button text='Go Back' onPress={() => props.navigation.goBack()} />
        </SafeAreaView>
      </ThemeView>
    </>
  );
}
