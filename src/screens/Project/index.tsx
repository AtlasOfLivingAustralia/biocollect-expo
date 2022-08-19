import { useState } from 'react';
import { SafeAreaView, ImageBackground, Dimensions, View } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Components
import ThemeView from 'components/ThemeView';
import Header from 'components/Header/Header';
import styled from 'styled-components/native';
import Button from 'components/Button';
import Skeleton from 'components/Skeleton';
import Rect from 'components/Skeleton/Rect';

interface HeaderImageProps {
  height: number;
}

const HeaderImage = styled(ImageBackground)<HeaderImageProps>`
  height: ${({ height }) => height}px;
  width: 100%;
`;

const Root = styled.View`
  display: flex;
  flex-grow: 1;
`;

// padding: ${({ theme }) => theme.defaults.viewPadding}px;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const { params: project } = props.route;

  const height = 250;
  return (
    <>
      <ThemeView>
        {project.fullSizeImageUrl ? (
          <Skeleton.Rect loading={!headerLoaded}>
            <HeaderImage
              resizeMode='cover'
              height={height}
              source={{ uri: project.fullSizeImageUrl }}
              onLoad={() => setHeaderLoaded(true)}
            ></HeaderImage>
          </Skeleton.Rect>
        ) : null}
        <SafeAreaView>
          <Root>
            <Button
              text='test'
              variant='outline'
              onPress={() => props.navigation.goBack()}
            />
            <View>
              <Header size={28}>{project.name}</Header>
            </View>
          </Root>
        </SafeAreaView>
      </ThemeView>
    </>
  );
}
