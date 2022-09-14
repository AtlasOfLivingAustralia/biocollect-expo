import { useContext, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { APIContext } from 'helpers/api';
import { AxiosError } from 'axios';
import styled, { useTheme } from 'styled-components/native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import SafeAreaThemeView from 'components/SafeAreaThemeView';
import Header from 'components/Header/Header';
import NavButton from 'components/NavButton';
import Subheader from 'components/Header/Subheader';
import Body from 'components/Body';
import HeaderView from 'components/HeaderView';

// Local components
import Map from './components/Map';
import { BioCollectProject } from 'types';
import ProjectList from './components/ProjectList';

// const HeaderView = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
//   padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
//   padding-top: ${({ theme }) => theme.defaults.viewPadding * 2}px;
//   padding-bottom: 0px;
// `;

const HeaderTitleView = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
`;

const ContentView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-bottom: 0px;
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
        console.log(`Retrieved ${projects.length} projects from initial explore search`);

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

        // Filter & re-map the projects
        const newProjects = surveys
          .map((projectId) => projects.find((project) => project.projectId === projectId))
          .filter(
            (project) =>
              // !project.coverage.centre.includes('-0.0') &&
              (project.coverage.decimalLatitude?.toString() || '') !== ''
          );

        // Update the state
        setProjects(newProjects);
        if (newProjects.length > 0) setSelectedProject(newProjects[0]);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    if (!projects) findProjects();
  }, []);

  return (
    <SafeAreaThemeView style={{ display: 'flex' }}>
      <HeaderView style={{ justifyContent: 'center' }}>
        <FontAwesome name="search" size={58} color={theme.colour.primary} />
        <HeaderTitleView>
          <Header style={{ marginBottom: 4 }}>Explore</Header>
          <Subheader>Find projects near you</Subheader>
        </HeaderTitleView>
      </HeaderView>
      <ContentView>
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
          error={error}
        />
      </ContentView>
      <FooterView>
        <Body
          size={18}
          bold
          style={{
            alignSelf: 'flex-start',
            paddingLeft: theme.defaults.viewPadding,
            paddingTop: theme.defaults.viewPadding,
          }}>
          Nearby Projects
        </Body>
        {!error && (
          <ProjectList
            projects={projects}
            onProjectScroll={(project) => setSelectedProject(project)}
            onProjectPress={(project) => props.navigation.navigate('Project', project)}
          />
        )}
      </FooterView>
      <NavButton
        icon="check"
        text="DONE"
        onPress={() => props.navigation.goBack()}
        style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: theme.defaults.viewPadding }}
      />
    </SafeAreaThemeView>
  );
}
