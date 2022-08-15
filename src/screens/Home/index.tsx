import { useCallback, useState, useContext, useEffect } from 'react';
import {
  Animated,
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(
  props: NativeStackScreenProps<RootStackParamList, 'Home'>
) {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
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

    getData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeThemeView>
      <Animated.View
        style={{
          // opacity: fadeInAnim,
          opacity: 1,
        }}
      >
        <Title>Home Screen</Title>
        <Button
          text='Sign Out'
          onPress={async () => {
            await auth.signOut();
            props.navigation.goBack();
          }}
          // onPress={() => api.call()}
        />
      </Animated.View>
      <ScrollView
        contentContainerStyle={localStyles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {projects
          ? projects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))
          : [0, 1, 2, 3].map((id) => <ProjectCard key={id} project={null} />)}
        <Text>Hello world</Text>
      </ScrollView>
    </SafeThemeView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
