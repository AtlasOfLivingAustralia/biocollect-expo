import { useCallback, useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import Button from 'components/Button';
import ProjectCard from 'components/ProjectCard';
import Header from 'components/Header/Header';
import Subheader from 'components/Header/Subheader';
import Modal from 'components/Modal';
import Profile from 'components/Profile';
import ProfileSideImage from 'components/ProfileSideImage';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';

// API / Auth
import { AppEnvironmentContext } from 'helpers/appenv';
import { AuthContext } from 'helpers/auth';
import { APIContext } from 'helpers/api';
import { BioCollectProject } from 'types';
import ThemeView from 'components/ThemeView';
import styled from 'styled-components/native';

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
`;

export default function Home(
  props: NativeStackScreenProps<RootStackParamList, 'Home'>
) {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { config: env } = useContext(AppEnvironmentContext);
  const auth = useContext(AuthContext);
  const api = useContext(APIContext);

  useEffect(() => {
    async function getData() {
      try {
        const data = await api.biocollect.projectSearch(0);
        setProjects(data.projects);
        console.log(data.total);
      } catch (error) {
        console.log(error);
      }
    }

    if (!projects) getData();
  }, [refreshing]);

  // Placeholder refresh logic
  const onRefresh = useCallback(() => {
    setProjects(null);
    setRefreshing(!refreshing);
  }, [refreshing]);

  return (
    <>
      <Modal visible={showSettings} onClose={() => setShowSettings(false)}>
        <Button
          text='My Profile'
          variant='outline'
          style={{ marginBottom: 8 }}
        />
        <Button
          text='Sign Out'
          variant='outline'
          style={{ marginBottom: 8 }}
          onPress={() => {
            Alert.alert('Confirmation', 'Are you sure you wish to sign out?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
                  setShowSettings(false);
                  await auth.signOut();
                  props.navigation.navigate('Authentication');
                },
              },
            ]);
          }}
        />
        {(auth.access?.role || []).includes('ROLE_ADMIN') && (
          <Button
            text='Developer Settings'
            variant='outline'
            style={{ marginBottom: 8 }}
          />
        )}
      </Modal>
      <ThemeView>
        <SafeAreaView>
          <HeaderView>
            <View>
              <Subheader>G'Day,</Subheader>
              <Header>{auth.profile?.given_name || ''}</Header>
            </View>
            <ProfileSideImage image={biocollectLogo}>
              <Profile
                name={auth.profile?.name || ''}
                size={52}
                icon='gear'
                onPress={() => setShowSettings(true)}
              />
            </ProfileSideImage>
          </HeaderView>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={localStyles.scrollView}
          refreshControl={
            <RefreshControl refreshing={!projects} onRefresh={onRefresh} />
          }
        >
          {projects
            ? projects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  onPress={() => {
                    // WebBrowser.openBrowserAsync(
                    //   `${env.biocollect.biocollect_url}/project/index/${project.projectId}?mobile=true`
                    // );
                    props.navigation.navigate('Project', project);
                  }}
                />
              ))
            : [0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
                <ProjectCard key={id} project={null} />
              ))}
        </ScrollView>
      </ThemeView>
    </>
  );
}

const localStyles = StyleSheet.create({
  scrollView: {
    padding: 12,
  },
});
