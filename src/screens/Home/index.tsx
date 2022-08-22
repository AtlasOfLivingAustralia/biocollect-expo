import { useCallback, useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { AxiosError } from 'axios';
import styled from 'styled-components/native';

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
import Body from 'components/Body';
import ThemeView from 'components/ThemeView';
import ButtonSelect from 'components/ButtonSelect';

// BioCollect logo
import biocollectLogo from 'assets/images/ui/logo.png';

// API / Auth
import { AuthContext } from 'helpers/auth';
import { APIContext } from 'helpers/api';
import { BioCollectProject } from 'types';

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

export default function Home(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const api = useContext(APIContext);

  useEffect(() => {
    async function getData() {
      try {
        // console.log(auth.credentials.accessToken);
        const data = await api.biocollect.projectSearch(0, false);
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
  const onRefresh = useCallback(() => {
    setProjects(null);
    setRefreshing(true);
  }, [refreshing]);

  // Handler for retrying when errors occur
  const onRetry = () => {
    setRefreshing(true);
    setError(null);
  };

  const isAdmin = (auth.access?.role || []).includes('ROLE_ADMIN');

  return (
    <>
      <Modal visible={showSettings} onClose={() => setShowSettings(false)}>
        {isAdmin && <ButtonSelect options={['test', 'blah']} style={{ marginBottom: 8 }} />}
        <Button text="My Profile" variant="outline" style={{ marginBottom: 8 }} />
        <Button
          text="Sign Out"
          variant="outline"
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
        {isAdmin && (
          <Button text="Developer Settings" variant="outline" style={{ marginBottom: 8 }} />
        )}
      </Modal>
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
                onPress={() => setShowSettings(true)}
              />
            </ProfileSideImage>
          </HeaderView>
        </SafeAreaView>
        {error ? (
          <ErrorView>
            <ErrorHeader>Woah there,</ErrorHeader>
            <Body>It looks like an error occurred.</Body>
            <Body>{error.message}</Body>
            <Button style={{ marginTop: 32 }} text="Try Again" onPress={onRetry} />
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
