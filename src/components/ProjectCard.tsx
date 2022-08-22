import { TouchableOpacityProps, View, Image as NativeImage } from 'react-native';
import { BioCollectProject } from 'types';

import styled, { useTheme } from 'styled-components/native';
import Skeleton from './Skeleton';
import { useState } from 'react';

interface ProjectCardProps extends TouchableOpacityProps {
  project: BioCollectProject | null;
}

const Root = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius * 2}px;
  margin-bottom: 12px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: black;
  shadow-offset: 0px 0px;
  elevation: 8;
`;

const Content = styled.View`
  flex-shrink: 1;
  padding: 12px;
  padding-right: 18px;
`;

const ImageRoot = styled.View`
  background-color: ${(props) => props.theme.background.tertiary};
  width: 110px;
  height: 110px;
  border-top-left-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.radius * 2}px;
`;

const Image = styled(NativeImage)`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.radius * 2}px;
  resize-mode: cover;
`;

const Header = styled.Text`
  flex: 1;
  font-family: '${({ theme }) => theme.font.header}';
  font-size: 18px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text.primary};
`;

const StyledText = styled.Text`
  flex: 1;
  font-family: '${({ theme }) => theme.font.body}';
  color: ${({ theme }) => theme.text.secondary};
`;

const ProjectCard = ({ project, ...props }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const theme = useTheme();

  // Render the project card
  return (
    <Root {...props} activeOpacity={0.6}>
      <Skeleton.Rect
        loading={!project || (project.urlImage && !imageLoaded)}
        borderRadius={theme.radius * 2}>
        <ImageRoot>
          {project?.urlImage && (
            <Image source={{ uri: project.urlImage }} onLoad={() => setImageLoaded(true)} />
          )}
        </ImageRoot>
      </Skeleton.Rect>
      {project ? (
        <Content>
          <Header numberOfLines={2}>{project?.name || 'Loading Name'}</Header>
          <StyledText numberOfLines={2}>{project?.description || 'Loading Description'}</StyledText>
        </Content>
      ) : (
        <View style={{ flexGrow: 1, padding: 12, paddingRight: 18 }}>
          <Skeleton.Rect loading width="100%" height={24} marginBottom={8} />
          <Skeleton.Rect loading width="80%" height={12} marginBottom={8} />
          <Skeleton.Rect loading width="85%" height={12} marginBottom={8} />
        </View>
      )}
    </Root>
  );
};

export default ProjectCard;
