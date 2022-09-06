import { useState, useContext, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { AxiosError } from 'axios';
import styled, { useTheme } from 'styled-components/native';

import Button from 'components/Button';
import CompactCard from 'components/CompactProjectCard';
import Body from 'components/Body';

// API / Auth
import { AuthContext } from 'helpers/auth';
import { APIContext } from 'helpers/api';
import { BioCollectProject } from 'types';

const ErrorView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 85px;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
`;

const EmptyView = styled.View`
  display: flex;
  flex-direction: column;
  padding-bottom: 41px;
`;

interface AllProjectsProps {
  focusTrigger: boolean;
  onProjectSelect: (project: BioCollectProject) => void;
}

const MyProjects = ({ onProjectSelect, focusTrigger }: AllProjectsProps) => {
  const [projects, setProjects] = useState<BioCollectProject[] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const auth = useContext(AuthContext);
  const api = useContext(APIContext);
  const theme = useTheme();

  useEffect(() => {
    async function getData() {
      try {
        // console.log(auth.credentials.accessToken);
        const data = await api.biocollect.projectSearch(0, true);
        setProjects(data.projects);
      } catch (apiError) {
        setError(apiError);
        console.log(apiError as AxiosError);
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

  // Handler for focus triggers
  useEffect(onRefresh, [focusTrigger]);

  // Handler for refreshing on authentication
  useEffect(() => {
    if (!auth.authenticated) {
      setProjects(null);
      setError(null);
      setRefreshing(false);
    }
  }, [auth.authenticated]);

  return error ? (
    <ErrorView>
      <Button text="Try Again" onPress={onRefresh} />
    </ErrorView>
  ) : (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{
        paddingLeft: theme.defaults.viewPadding,
        paddingRight: theme.defaults.viewPadding,
        paddingTop: 4,
        paddingBottom: 12,
      }}>
      {(() => {
        // If we've recieved an API response
        if (projects) {
          return projects.length > 0 ? (
            projects.map((project, index) => (
              <CompactCard
                key={project.projectId}
                project={project}
                onPress={() => onProjectSelect(project)}
                last={index === projects.length - 1}
              />
            ))
          ) : (
            <EmptyView
              style={{ maxWidth: Dimensions.get('screen').width - theme.defaults.viewPadding * 2 }}>
              <Body>It looks like you haven&apos;t joined any projects yet.</Body>
              <Body style={{ marginTop: 6 }}>Explore your are below to find some!</Body>
            </EmptyView>
          );
        } else {
          // If projects is null (we're waiting on an API request)
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <CompactCard key={id} project={null} last={id === 9} />
          ));
        }
      })()}
    </ScrollView>
  );
};

export default MyProjects;
