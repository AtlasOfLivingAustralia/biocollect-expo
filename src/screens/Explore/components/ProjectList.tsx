import { ScrollView, Dimensions } from 'react-native';
import { BioCollectProject } from 'types';
import styled, { useTheme } from 'styled-components/native';

// Project components
import Body from 'components/Body';
import CompactCard from './ProjectCard';

const EmptyView = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

interface ProjectListProps {
  projects: BioCollectProject[] | null;
  savedProjects: BioCollectProject[] | null;
  onProjectScroll: (project: BioCollectProject) => void;
  onProjectPress: (project: BioCollectProject) => void;
  onProjectSave: (project: BioCollectProject) => void;
}

export default function ProjectList({
  projects,
  savedProjects,
  onProjectScroll,
  onProjectPress,
  onProjectSave,
}: ProjectListProps) {
  const theme = useTheme();

  // Calculate the scroll view snap interval
  const snapInterval =
    Dimensions.get('screen').width -
    theme.defaults.viewPadding * 2 +
    theme.defaults.viewPadding / 2;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      decelerationRate={0.8}
      contentContainerStyle={{ padding: theme.defaults.viewPadding, height: 125 }}
      onMomentumScrollEnd={(e) => {
        if (projects)
          onProjectScroll(projects[Math.round(e.nativeEvent.contentOffset.x / snapInterval)]);
      }}
      snapToInterval={snapInterval}>
      {(() => {
        // If we've recieved an API response
        if (projects) {
          return projects.length > 0 ? (
            projects.map((project, index) => {
              const saved =
                (savedProjects || []).findIndex((proj) => proj.projectId === project.projectId) !==
                -1;
              return (
                <CompactCard
                  key={`${project.projectId}-${index}`}
                  project={project}
                  onPress={() => onProjectPress(project)}
                  onProjectAction={() => {
                    if (!saved) onProjectSave(project);
                  }}
                  saved={saved}
                />
              );
            })
          ) : (
            <EmptyView
              style={{
                maxWidth: Dimensions.get('screen').width - theme.defaults.viewPadding * 2,
              }}>
              <Body>
                We couldn&apos;t find any projects near you, or that match your selected criteria.
              </Body>
            </EmptyView>
          );
        } else {
          // If projects is null (we're waiting on an API request)
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <CompactCard key={id} project={null} />
          ));
        }
      })()}
    </ScrollView>
  );
}
