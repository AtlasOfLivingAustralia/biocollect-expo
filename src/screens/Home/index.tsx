import { useCallback, useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import Button from 'components/Button';
import ProjectCard from 'components/ProjectCard';
import SafeThemeView from 'components/SafeAreaThemeView';

// API / Auth
import { AuthContext } from 'helpers/auth';
import { APIContext } from 'helpers/api';
import { BioCollectProject } from 'types';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import Modal from 'components/Modal';
import jwtDecode from 'jwt-decode';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(
  props: NativeStackScreenProps<RootStackParamList, 'Home'>
) {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
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
      <Modal visible={showSettings} onClose={() => setShowSettings(false)} />
      <SafeThemeView>
        <View style={{ display: 'flex', padding: 24, alignItems: 'center' }}>
          <Title>Welcome,</Title>
          <Subtitle>{auth.profile?.name || ''}</Subtitle>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}
          >
            <Button
              style={{ marginRight: 3 }}
              text='Sign Out'
              onPress={async () => {
                await auth.signOut();
                props.navigation.navigate('Authentication');
              }}
              // onPress={() => api.call()}
            />
            <Button
              style={{ marginLeft: 3 }}
              onPress={() => {
                console.log(auth.access.role);
                setShowSettings(true);
              }}
              text='Settings Test'
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={localStyles.scrollView}
          refreshControl={
            <RefreshControl refreshing={!projects} onRefresh={onRefresh} />
          }
        >
          {projects
            ? projects.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))
            : [0, 1, 2, 3].map((id) => <ProjectCard key={id} project={null} />)}
        </ScrollView>
      </SafeThemeView>
    </>
  );
}

const localStyles = StyleSheet.create({
  scrollView: {
    padding: 12,
  },
});
