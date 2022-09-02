import { TouchableOpacityProps, View, Image as NativeImage } from 'react-native';
import { BioCollectProject } from 'types';
import alaLogo from 'assets/images/ui/ala-white.png';

import styled, { useTheme } from 'styled-components/native';
import Skeleton from './Skeleton';
import { useState } from 'react';
import Header from './Header/Header';

interface RootProps {
  last?: boolean;
}

interface ProjectCardProps extends TouchableOpacityProps, RootProps {
  project: BioCollectProject | null;
}

const Root = styled.TouchableOpacity<RootProps>`
  display: flex;
  flex-direction: row;
  width: 225px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius * 2}px;
  margin-right: ${({ last }) => (last ? 0 : 12)}px;
  shadow-opacity: 0.3;
  shadow-radius: 3.5px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 6;
`;

const Content = styled.View`
  flex-shrink: 1;
  padding: 12px;
  padding-right: 18px;
`;

const ImageRoot = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colour.primary};
  width: 85px;
  height: 85px;
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

const ProjectCard = ({ project, ...props }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const theme = useTheme();

  // Render the project card
  return (
    <Root {...props} activeOpacity={0.6}>
      <Skeleton.Rect
        loading={!project || (project?.urlImage && !imageLoaded && !imageError)}
        borderRadius={theme.radius * 2}>
        <ImageRoot>
          {project?.urlImage && !imageError ? (
            <Image
              source={{ uri: project.urlImage }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <NativeImage source={alaLogo} style={{ width: 35, height: 35 }} />
          )}
        </ImageRoot>
      </Skeleton.Rect>
      {project ? (
        <Content>
          <Header numberOfLines={3} size={16} style={{ flex: 1, flexWrap: 'wrap' }}>
            {project?.name || 'Loading Name'}
          </Header>
        </Content>
      ) : (
        <View style={{ flexGrow: 1, padding: 12, paddingRight: 18 }}>
          <Skeleton.Rect loading width="80%" height={12} marginBottom={8} />
          <Skeleton.Rect loading width="90%" height={12} marginBottom={8} />
          <Skeleton.Rect loading width="75%" height={12} marginBottom={8} />
        </View>
      )}
    </Root>
  );
};

export default ProjectCard;
