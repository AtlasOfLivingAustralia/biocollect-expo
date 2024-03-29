import { useContext, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { DateTime } from 'luxon';
import * as WebBrowser from 'expo-web-browser';
import { BioCollectSurvey } from 'types';
import {
  SafeAreaView,
  ImageBackground,
  View,
  ScrollView,
  Text,
  Image,
  Platform,
} from 'react-native';

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
import { APIContext } from 'helpers/api';
import { AppEnvironmentContext } from 'helpers/appenv';

// Assets
import alaLogo from 'assets/images/ui/ala.png';
import Button from 'components/Button';
import SurveyModal from './SurveyModal';

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

const ALAContributeView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ALAContributeText = styled(Body)`
  margin-left: 8px;
  font-family: 'RobotoBold';
  color: white;
`;

interface HeaderViewProps {
  hasBackgroundImage: boolean;
}

const HeaderView = styled(View)<HeaderViewProps>`
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${({ hasBackgroundImage }) =>
    hasBackgroundImage ? 12 : Platform.OS === 'android' ? 48 : 24}px;
  padding-bottom: 0px;
`;

const HeaderLinkView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const [headerLoaded, setHeaderLoaded] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<BioCollectSurvey[] | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { type: env } = useContext(AppEnvironmentContext);
  const { params: project } = props.route;
  const insets = useSafeAreaInsets();
  const api = useContext(APIContext);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.biocollect.listSurveys(project.projectId);
        setSurveys(data);
      } catch (error) {
        console.log('ERROR', error);
      }
    })();
  }, []);

  return (
    <>
      <SurveyModal
        surveys={surveys}
        visible={modalVisible}
        navigate={props.navigation.navigate}
        onClose={() => setModalVisible(false)}
      />
      <ThemeView>
        {project.fullSizeImageUrl ? (
          <Skeleton.Rect loading={!headerLoaded} borderRadius={1}>
            <HeaderImage
              resizeMode="cover"
              height={175 + insets.top}
              source={{ uri: project.fullSizeImageUrl }}
              onLoad={() => setHeaderLoaded(true)}>
              {(project.tags || []).includes('isContributingDataToAla') && headerLoaded && (
                <BlurView tint="dark">
                  <ALAContributeView>
                    <Image source={alaLogo} style={{ width: 25, height: 25 }} />
                    <ALAContributeText>Contributes to the ALA</ALAContributeText>
                  </ALAContributeView>
                </BlurView>
              )}
            </HeaderImage>
          </Skeleton.Rect>
        ) : null}
        <SafeAreaView>
          <HeaderView hasBackgroundImage={Boolean(project.fullSizeImageUrl)}>
            <HeaderLinkView>
              <NavButton
                icon="arrow-left"
                text="GO BACK"
                onPress={() => props.navigation.goBack()}
              />
              <NavButton
                icon="link"
                text="VIEW ON ALA"
                onPress={() => {
                  // Linking.openUrl(`${env.biocollect.biocollect_url}/project/index/${project.projectId}?mobile=true`)
                  WebBrowser.openBrowserAsync(
                    `https://biocollect-${env}.ala.org.au/project/index/${project.projectId}?mobile=true`
                  );
                }}
              />
            </HeaderLinkView>
            <View style={{ paddingBottom: 14 }}>
              <Header size={28}>{project.name}</Header>
            </View>
          </HeaderView>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            padding: theme.defaults.viewPadding,
            paddingTop: 6,
            paddingBottom: 48,
          }}
          stickyHeaderIndices={[1, 2, 4, 6]}>
          <Button icon="search" padding={8} text="View Records" />
          <Button
            icon="plus"
            iconSize={24}
            style={{ marginTop: 8, marginBottom: 6 }}
            onPress={() => setModalVisible(true)}
            padding={8}
            text="Create Record"
            variant="outline"
          />
          <Subheader>Aim</Subheader>
          <Body>{project.aim}</Body>
          <Subheader>Description</Subheader>
          <Body>{project.description}</Body>
          <Subheader>Timeframe</Subheader>
          <Body>{`${DateTime.fromISO(project.startDate).toLocaleString(DateTime.DATE_SHORT)}${
            project.endDate
              ? ` to ${DateTime.fromISO(project.endDate).toLocaleString(DateTime.DATE_SHORT)}`
              : ''
          }`}</Body>
          <Subheader>Get Involved</Subheader>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {project.difficulty && (
              <Chip variant="outline" style={{ marginRight: 6, marginBottom: 6 }}>
                Difficulty: {project.difficulty}
              </Chip>
            )}
            {(project.tags || [])
              .filter((tag) => tag !== 'isContributingDataToAla')
              .map((tag) => (
                <Chip key={tag} style={{ marginRight: 6, marginBottom: 6 }} variant="outline">
                  {tag
                    .split(/(?=[A-Z])/)
                    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
                    .join(' ')}
                </Chip>
              ))}
          </View>
        </ScrollView>
      </ThemeView>
    </>
  );
}
