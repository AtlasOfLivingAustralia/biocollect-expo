import { ScrollView, Dimensions } from 'react-native';
import { BioCollectProject } from 'types';
import styled, { useTheme } from 'styled-components/native';

// Project components
import CompactCard from 'components/CompactProjectCard';
import Body from 'components/Body';

const EmptyView = styled.View`
  display: flex;
  flex-direction: column;
  padding-bottom: 41px;
`;

interface ProjectListProps {
  projects: BioCollectProject[] | null;
  onProjectSelect: (project: BioCollectProject) => void;
}

export default function ProjectList({ projects, onProjectSelect }: ProjectListProps) {
  const theme = useTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ padding: theme.defaults.viewPadding }}>
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
              style={{
                maxWidth: Dimensions.get('screen').width - theme.defaults.viewPadding * 2,
              }}>
              <Body>We couldn&apos;t find any projects near you.</Body>
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
}
