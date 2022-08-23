import { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Platform } from 'react-native';
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
import TextInput from 'components/TextInput';
import AllProjects from './components/AllProjects';

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${Platform.OS === 'android' ? 48 : 24}px;
`;

const SearchView = styled.View`
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

export default function Home(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [search, setSearch] = useState<string>('');
  const [focusTrigger, setFocusTrigger] = useState<boolean>(false);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      setFocusTrigger(!focusTrigger);
    });
  }, [props.navigation, focusTrigger]);

  useEffect(() => {
    if (!auth.authenticated) setSearch('');
  }, [auth.authenticated]);

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
          <SearchView>
            <TextInput
              value={search}
              onChangeText={setSearch}
              onEndEditing={() => setFocusTrigger(!focusTrigger)}
              style={{ marginBottom: 14 }}
              placeholder="Search"
            />
          </SearchView>
        </SafeAreaView>
        <AllProjects
          search={search}
          focusTrigger={focusTrigger}
          onProjectSelect={(project) => props.navigation.navigate('Project', project)}
        />
      </ThemeView>
    </>
  );
}
