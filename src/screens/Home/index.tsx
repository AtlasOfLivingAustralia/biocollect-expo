import { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import Header from 'components/Header/Header';
import Subheader from 'components/Header/Subheader';
import Profile from 'components/Profile';
import ProfileSideImage from 'components/ProfileSideImage';
import ThemeView from 'components/ThemeView';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';

// API / Auth
import { AuthContext } from 'helpers/auth';
import HomeModal from './components/SettingsModal';
import Body from 'components/Body';
import ExploreCard from './components/ExploreCard';
import MyProjects from './components/MyProjects';
import NavButton from 'components/NavButton';
import HeaderView from 'components/HeaderView';

const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.primary};
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

const ExploreView = styled.View`
  padding-top: 12px;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

export default function Home(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [focusTrigger, setFocusTrigger] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      setFocusTrigger(!focusTrigger);
    });
  }, [props.navigation, focusTrigger]);

  return (
    <>
      <HomeModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        navigate={props.navigation.navigate}
      />
      <ThemeView>
        <SafeAreaView>
          <HeaderView>
            <View>
              <Subheader>G&apos;Day,</Subheader>
              <Header>{auth.profile?.given_name || ''}</Header>
            </View>
            <ProfileSideImage profileSize={52} image={biocollectLogo}>
              <Profile
                name={auth.profile?.name || ''}
                size={52}
                icon="cog"
                onPress={() => setSettingsVisible(true)}
              />
            </ProfileSideImage>
          </HeaderView>
        </SafeAreaView>
        <ScrollView stickyHeaderIndices={[0, 2]}>
          <TitleView>
            <Body bold size={18}>
              My Projects
            </Body>
            <NavButton
              icon="search"
              text="VIEW ALL"
              onPress={() => props.navigation.navigate('Projects')}
            />
          </TitleView>
          <MyProjects
            onProjectSelect={(project) => props.navigation.navigate('Project', project)}
            focusTrigger={focusTrigger}
          />
          <TitleView style={{ marginTop: 12 }}>
            <Body bold size={18}>
              Explore Your Area
            </Body>
          </TitleView>
          <ExploreView>
            <ExploreCard navigate={props.navigation.navigate} />
          </ExploreView>
        </ScrollView>
      </ThemeView>
    </>
  );
}
