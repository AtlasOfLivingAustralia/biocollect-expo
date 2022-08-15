import { View, Text } from 'react-native';
import { BioCollectProject } from 'types';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import styled from 'styled-components/native';

interface ProjectCardProps {
  project: BioCollectProject | null;
}

const ProjectCard = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.background.secondary};
`;

export default ({ project }: ProjectCardProps) => {
  if (project) {
    return (
      <ProjectCard>
        <Text style={{ color: 'white' }}>{project.name}</Text>
      </ProjectCard>
    );
  } else {
    return (
      <View>
        <ContentLoader
          interval={0}
          speed={2}
          width={476}
          height={124}
          viewBox='0 0 200 124'
          backgroundColor='#373737'
          foregroundColor='#646464'
        >
          <Rect x='48' y='8' rx='3' ry='3' width='88' height='12' />
          <Rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
          <Rect x='0' y='56' rx='3' ry='3' width='150' height='6' />
          <Rect x='0' y='72' rx='3' ry='3' width='150' height='6' />
          <Rect x='0' y='88' rx='3' ry='3' width='150' height='6' />
          <Circle cx='20' cy='20' r='20' />
        </ContentLoader>
      </View>
    );
  }
};
