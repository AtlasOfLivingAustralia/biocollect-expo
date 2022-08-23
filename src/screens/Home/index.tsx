import { useState, useContext, useEffect } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { AxiosError } from 'axios';
import styled from 'styled-components/native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import Button from 'components/Button';
import ProjectCard from 'components/ProjectCard';
import Header from 'components/Header/Header';
import Subheader from 'components/Header/Subheader';
import Profile from 'components/Profile';
import ProfileSideImage from 'components/ProfileSideImage';
import Body from 'components/Body';
import ThemeView from 'components/ThemeView';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';

// API / Auth
import { AuthContext } from 'helpers/auth';
import { APIContext } from 'helpers/api';
import { BioCollectProject } from 'types';
import HomeModal from './HomeModal';
import TextInput from 'components/TextInput';

const ErrorView = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 148px;
`;

const ErrorHeader = styled.Text`
  color: ${({ theme }) => theme.text.primary};
  font-family: 'RobotoBold';
  font-size: 22px;
  margin-bottom: 12px;
`;

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
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<AxiosError | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const api = useContext(APIContext);

  useEffect(() => {
    async function getData() {
      try {
        // console.log(auth.credentials.accessToken);
        const data = await api.biocollect.projectSearch(0, false, search);
        setProjects(data.projects);
      } catch (apiError) {
        setError(apiError);
        console.log(apiError);
      }

      setRefreshing(false);
    }

    if (refreshing) getData();
  }, [refreshing]);

  // Handler for refreshing
  const onRefresh = () => {
    setProjects(null);
    setRefreshing(true);
    setError(null);
  };

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      if (!projects) onRefresh();
    });
  }, [props.navigation, projects]);

  useEffect(() => {
    if (!auth.authenticated) {
      setProjects(null);
      setError(null);
      setSearch('');
      setRefreshing(false);
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
              onEndEditing={onRefresh}
              style={{ marginBottom: 14 }}
              placeholder="Search"
            />
          </SearchView>
        </SafeAreaView>
        {error ? (
          <ErrorView>
            <ErrorHeader>Woah there,</ErrorHeader>
            <Body>It looks like an error occurred.</Body>
            <Body>{error.message}</Body>
            <Button style={{ marginTop: 32 }} text="Try Again" onPress={onRefresh} />
          </ErrorView>
        ) : (
          <ScrollView
            contentContainerStyle={localStyles.scrollView}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {(() => {
              // If we've recieved an API response
              if (projects) {
                return projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard
                      key={project.projectId}
                      project={project}
                      onPress={() => props.navigation.navigate('Project', project)}
                    />
                  ))
                ) : (
                  <Body>It looks like we can&apos;t find any projects.</Body>
                );
              } else {
                // If projects is null (we're waiting on an API request)
                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                  <ProjectCard key={id} project={null} />
                ));
              }
            })()}
          </ScrollView>
        )}
      </ThemeView>
    </>
  );
}

const localStyles = StyleSheet.create({
  scrollView: {
    padding: 12,
  },
});
