import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';
import { APIContext } from 'helpers/api';
import { AxiosError } from 'axios';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import SafeAreaThemeView from 'components/SafeAreaThemeView';
import Header from 'components/Header/Header';
import NavButton from 'components/NavButton';
import Subheader from 'components/Header/Subheader';
import Body from 'components/Body';
import Button from 'components/Button';

// Local components
import Map from './components/Map';
import { BioCollectProject } from 'types';
import ProjectList from './components/ProjectList';

const ContentView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-bottom: 0px;
`;

const LoadingView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 24.5px;
  padding-bottom: 18.5px;
`;

const ActionsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 4px;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

interface ActionButtonProps {
  end?: boolean;
}

const ActionButton = styled(Button)<ActionButtonProps>`
  flex: 1;
  flex-grow: 1;
  margin-${({ end }) => (end ? 'left' : 'right')}: 4px;
`;

const FooterView = styled.View`
  display: flex;
  align-items: center;
`;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Explore'>
) {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<BioCollectProject | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const api = useContext(APIContext);
  const theme = useTheme();
  const { region } = props.route.params;

  useEffect(() => {
    async function findProjects() {
      // Calculate coordinates
      const geojson = {
        type: 'Polygon',
        coordinates: [
          [
            [region.longitude - region.longitudeDelta, region.latitude - region.latitudeDelta],
            [region.longitude + region.longitudeDelta, region.latitude - region.latitudeDelta],
            [region.longitude + region.longitudeDelta, region.latitude + region.latitudeDelta],
            [region.longitude - region.longitudeDelta, region.latitude + region.latitudeDelta],
            [region.longitude - region.longitudeDelta, region.latitude - region.latitudeDelta],
          ],
        ],
      };

      try {
        const { projects } = await api.biocollect.projectSearch(0, 100, false, undefined, geojson);

        // Retrieve the projects related to the surveys
        const surveys = [
          ...new Set(
            (
              await Promise.all(
                projects.map((project) => api.biocollect.listSurveys(project.projectId))
              )
            )
              .reduce((prev, cur) => [...prev, ...cur], [])
              .filter((survey) => survey.published)
              .map((survey) => survey.projectId)
          ),
        ];
        setProjects(
          surveys
            .map((projectId) => projects.find((project) => project.projectId === projectId))
            .filter(
              (project) =>
                !project.coverage.centre.includes('-0.0') &&
                (project.coverage.decimalLatitude?.toString() || '') !== ''
            )
        );
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    if (!projects) findProjects();
  }, []);

  return (
    <SafeAreaThemeView style={{ display: 'flex' }}>
      <ContentView>
        <FontAwesome
          name="search"
          size={72}
          color={theme.colour.primary}
          style={{ marginBottom: 24 }}
        />
        <Header>Explore my Area</Header>
        <Subheader>Getting started</Subheader>
        <Map
          region={
            selectedProject
              ? {
                  longitude: selectedProject.coverage.decimalLongitude,
                  longitudeDelta: region.longitudeDelta * 5,
                  latitude: selectedProject.coverage.decimalLatitude,
                  latitudeDelta: region.latitudeDelta * 5,
                }
              : region
          }
          style={{ marginTop: 32, marginBottom: 12 }}
          markers={
            projects
              ? projects.map((project) => ({
                  latitude: project.coverage.decimalLatitude,
                  longitude: project.coverage.decimalLongitude,
                }))
              : null
          }
        />
      </ContentView>
      <FooterView>
        {(() => {
          if (error) {
            return (
              <LoadingView style={{ flexDirection: 'column' }}>
                <Body primary bold size={18}>
                  An error occurred
                </Body>
                <Body style={{ marginTop: 8 }}>{error.message}</Body>
              </LoadingView>
            );
          }

          return projects ? (
            <ActionsView>
              <ActionButton
                text="DETAILS"
                variant="dimmed"
                disabled={!selectedProject}
                onPress={() => props.navigation.navigate('Project', selectedProject)}
              />
              <ActionButton
                text="JOIN"
                variant="dimmed"
                disabled={!selectedProject}
                onPress={() => props.navigation.navigate('Project', selectedProject)}
                end
              />
            </ActionsView>
          ) : (
            <LoadingView>
              <ActivityIndicator style={{ marginRight: 8 }} />
              <Body bold>Finding projects</Body>
            </LoadingView>
          );
        })()}
        {!error && (
          <ProjectList
            projects={projects}
            onProjectSelect={(project) => setSelectedProject(project)}
          />
        )}
      </FooterView>
      <NavButton
        icon="check"
        text="DONE"
        onPress={() => props.navigation.goBack()}
        style={{ alignSelf: 'center', marginTop: 'auto' }}
      />
    </SafeAreaThemeView>
  );
}
