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
import ButtonSelect from 'components/ButtonSelect';
import Body from 'components/Body';

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${Platform.OS === 'android' ? 48 : 24}px;
`;

const SearchView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

export default function Home(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [search, setSearch] = useState<string>('');
  const [isUserPage, setIsUserPage] = useState<boolean>(false);
  const [focusTrigger, setFocusTrigger] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      setFocusTrigger(!focusTrigger);
    });
  }, [props.navigation, focusTrigger]);

  useEffect(() => {
    if (!auth.authenticated) {
      setSearch('');
      setIsUserPage(false);
    }
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
              onEndEditing={() => setRefreshTrigger(!refreshTrigger)}
              style={{ flexGrow: 1 }}
              placeholder="Search"
            />
            <ButtonSelect
              options={['all', 'my']}
              onSelect={(option) => {
                setIsUserPage(option === 'my');
                setRefreshTrigger(!refreshTrigger);
              }}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
            <Body>projects</Body>
          </SearchView>
        </SafeAreaView>
        <AllProjects
          search={search}
          focusTrigger={focusTrigger}
          refreshTrigger={refreshTrigger}
          isUserPage={isUserPage}
          onProjectSelect={(project) => props.navigation.navigate('Project', project)}
        />
      </ThemeView>
    </>
  );
}
