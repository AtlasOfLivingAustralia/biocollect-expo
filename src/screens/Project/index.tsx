import { useContext, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import * as WebBrowser from 'expo-web-browser';

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
import Chip from 'components/Chip';

// App environment configuration
import { AppEnvironmentContext } from 'helpers/appenv';

// Assets
import alaLogo from 'assets/images/ui/ala.png';
import Button from 'components/Button';

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
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
  padding-top: 14px;
  padding-bottom: 14px;
`;

// padding: ${({ theme }) => theme.defaults.viewPadding}px;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const { config: env } = useContext(AppEnvironmentContext);
  const { params: project } = props.route;
  const theme = useTheme();

  const height = 225;
  return (
    <>
      <ThemeView>
        {project.fullSizeImageUrl ? (
          <Skeleton.Rect loading={!headerLoaded} borderRadius={1}>
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
                        Contributes to the ALA
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NavButton
                icon='arrow-left'
                text='GO BACK'
                onPress={() => props.navigation.goBack()}
              />
              <NavButton
                icon='link'
                text='VIEW ON ALA'
                onPress={() => {
                  // Linking.openUrl(`${env.biocollect.biocollect_url}/project/index/${project.projectId}?mobile=true`)
                  WebBrowser.openBrowserAsync(
                    `${env.biocollect.biocollect_url}/project/index/${project.projectId}?mobile=true`
                  );
                }}
              />
            </View>
            <Header size={28}>{project.name}</Header>
          </View>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            padding: theme.defaults.viewPadding,
            paddingTop: 6,
            paddingBottom: 48,
          }}
          stickyHeaderIndices={[1, 3, 5]}
        >
          <View style={{ display: 'flex', paddingTop: 8, paddingBottom: 6 }}>
            <Button padding={8} text='View Records' />
          </View>
          <Subheader>Aim</Subheader>
          <Body>{project.aim}</Body>
          <Subheader>Timeframe</Subheader>
          <Body>
            {DateTime.fromISO(project.startDate).toLocaleString(
              DateTime.DATE_SHORT
            )}
          </Body>
          <Subheader>Description</Subheader>
          <Body>{project.description}</Body>
          <Subheader>Get Involved</Subheader>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {project.difficulty && (
              <Chip
                variant='outline'
                style={{ marginRight: 6, marginBottom: 6 }}
              >
                Difficulty: {project.difficulty}
              </Chip>
            )}
            {(project.tags || [])
              .filter((tag) => tag !== 'isContributingDataToAla')
              .map((tag) => (
                <Chip
                  key={tag}
                  style={{ marginRight: 6, marginBottom: 6 }}
                  variant='outline'
                >
                  {tag
                    .split(/(?=[A-Z])/)
                    .map(
                      (part) =>
                        `${part.charAt(0).toUpperCase()}${part.slice(1)}`
                    )
                    .join(' ')}
                </Chip>
              ))}
          </View>
        </ScrollView>
      </ThemeView>
    </>
  );
}
