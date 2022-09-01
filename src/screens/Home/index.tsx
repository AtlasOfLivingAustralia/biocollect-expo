import { useState, useContext } from 'react';
import { View, SafeAreaView, Platform, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

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

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${Platform.OS === 'android' ? 72 : 24}px;
`;

const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  padding-top: 12px;
  padding-bottom: 12px;
`;

export default function Home(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const theme = useTheme();

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
                icon="gear"
                onPress={() => setSettingsVisible(true)}
              />
            </ProfileSideImage>
          </HeaderView>
        </SafeAreaView>
        <ScrollView
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ padding: theme.defaults.viewPadding, paddingTop: 0 }}>
          <TitleView>
            <Body bold size={18}>
              My Projects
            </Body>
          </TitleView>
          <TitleView>
            <Body bold size={18}>
              Explore Your Area
            </Body>
          </TitleView>
          <ExploreCard />
        </ScrollView>
      </ThemeView>
    </>
  );
}
