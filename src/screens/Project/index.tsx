import { useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Components
import styled, { useTheme } from 'styled-components/native';
import ThemeView from 'components/ThemeView';
import Header from 'components/Header/Header';
import Skeleton from 'components/Skeleton';
import NavButton from 'components/NavButton';
import Body from 'components/Body';

// Assets
import alaLogo from 'assets/images/ui/ala.png';

interface HeaderImageProps {
  height: number;
}

const HeaderImage = styled(ImageBackground)<HeaderImageProps>`
  display: flex;
  justify-content: flex-end;
  height: ${({ height }) => height}px;
  width: 100%;
`;

const Subheader = styled(Text)`
  font-family: 'RobotoBold';
  font-size: 20px;
  background-color: white;
  padding-top: 14px;
  padding-bottom: 14px;
`;

// padding: ${({ theme }) => theme.defaults.viewPadding}px;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const { params: project } = props.route;
  const theme = useTheme();

  const height = 225;
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
            >
              {(project.tags || []).includes('isContributingDataToAla') &&
                headerLoaded && (
                  <BlurView tint='dark'>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 14,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Image
                        source={alaLogo}
                        style={{ width: 25, height: 25 }}
                      />
                      <Body
                        style={{
                          marginLeft: 8,
                          fontFamily: 'RobotoBold',
                          color: 'white',
                        }}
                        primary
                      >
                        Contributes to ALA
                      </Body>
                    </View>
                  </BlurView>
                )}
            </HeaderImage>
          </Skeleton.Rect>
        ) : null}
        <SafeAreaView>
          <View
            style={{
              padding: theme.defaults.viewPadding,
              paddingTop: 12,
              paddingBottom: 0,
            }}
          >
            <NavButton onPress={() => props.navigation.goBack()} />
            <Header size={28}>{project.name}</Header>
          </View>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            padding: theme.defaults.viewPadding,
            paddingTop: 6,
            paddingBottom: 48,
          }}
          stickyHeaderIndices={[0, 3]}
        >
          <Subheader>Aim</Subheader>
          <Body>{project.aim}</Body>

          <Subheader>Description</Subheader>
          <Body>{project.description}</Body>
        </ScrollView>
      </ThemeView>
    </>
  );
}
