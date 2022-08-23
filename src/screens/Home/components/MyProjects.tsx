import { useState, useContext, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
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

interface MyProjectsProps {
  search: string | null;
  focusTrigger: boolean;
  onProjectSelect: (project: BioCollectProject) => void;
}

const MyProjects = ({ search, focusTrigger, onProjectSelect }: MyProjectsProps) => {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [refreshing, setRefreshing] = useState(true);
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
    if (!projects) onRefresh();
  }, [focusTrigger]);

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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      horizontal>
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
  );
};

export default MyProjects;
