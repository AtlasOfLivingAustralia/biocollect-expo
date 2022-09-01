import { useState, useContext, useEffect } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { AxiosError } from 'axios';
import styled from 'styled-components/native';

import Button from 'components/Button';
import ProjectCard from 'components/ProjectCard';
import Body from 'components/Body';

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

interface AllProjectsProps {
  search: string | null;
  focusTrigger: boolean;
  refreshTrigger: boolean;
  isUserPage: boolean;
  onProjectSelect: (project: BioCollectProject) => void;
}

const AllProjects = ({
  search,
  focusTrigger,
  refreshTrigger,
  isUserPage,
  onProjectSelect,
}: AllProjectsProps) => {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const auth = useContext(AuthContext);
  const api = useContext(APIContext);

  useEffect(() => {
    async function getData() {
      try {
        console.log(auth.credentials.accessToken);
        const data = await api.biocollect.projectSearch(0, isUserPage, search);
        setProjects(data.projects);
      } catch (apiError) {
        setError(apiError);
        console.log(apiError);
      }

      setRefreshing(false);
    }

    if (refreshing) {
      getData();
    }
  }, [refreshing]);

  // Handler for refreshing
  const onRefresh = () => {
    setProjects(null);
    setRefreshing(true);
    setError(null);
  };

  // Focus & refresh triggers
  useEffect(() => {
    if (!projects) onRefresh();
  }, [focusTrigger]);

  useEffect(onRefresh, [refreshTrigger]);

  useEffect(() => {
    if (!auth.authenticated) {
      setProjects(null);
      setError(null);
      setRefreshing(false);
    }
  }, [auth.authenticated]);

  return error ? (
    <ErrorView>
      <ErrorHeader>Woah there,</ErrorHeader>
      <Body>It looks like an error occurred.</Body>
      <Body>{error.message}</Body>
      <Button style={{ marginTop: 32 }} text="Try Again" onPress={onRefresh} />
    </ErrorView>
  ) : (
    <ScrollView
      contentContainerStyle={{ padding: 12 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {(() => {
        // If we've recieved an API response
        if (projects) {
          return projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                onPress={() => onProjectSelect(project)}
              />
            ))
          ) : (
            <View style={{ padding: 12 }}>
              <Body style={{ textAlign: 'center' }}>
                We couldn&apos;t find any projects matching that criterea
              </Body>
            </View>
          );
        } else {
          // If projects is null (we're waiting on an API request)
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <ProjectCard key={id} project={null} />
          ));
        }
      })()}
    </ScrollView>
  );
};

export default AllProjects;
