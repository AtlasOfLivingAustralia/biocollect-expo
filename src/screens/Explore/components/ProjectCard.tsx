import {
  TouchableOpacityProps,
  View,
  Image as NativeImage,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { BioCollectProject } from 'types';
import alaLogo from 'assets/images/ui/ala-white.png';

import styled, { useTheme } from 'styled-components/native';
import Skeleton from 'components/Skeleton';
import { useState } from 'react';
import Header from 'components/Header/Header';
import Body from 'components/Body';
import { FontAwesome } from '@expo/vector-icons';
interface RootProps {
  selected?: boolean;
}

interface ProjectCardProps extends TouchableOpacityProps, RootProps {
  project: BioCollectProject | null;
  onProjectAction?: (project: BioCollectProject) => void;
}

const SELECT_WIDTH = 6;

const Root = styled.TouchableOpacity<RootProps>`
  display: flex;
  flex-direction: row;
  width: ${({ theme }) => Dimensions.get('screen').width - theme.defaults.viewPadding * 2}px;
  height: 85px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius * 2}px;
  border-width: ${({ selected }) => (selected ? SELECT_WIDTH : 0)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colour.primary};
  margin-right: ${({ theme }) => theme.defaults.viewPadding / 2}px;
  shadow-opacity: 0.3;
  shadow-radius: 3.5px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 6;
`;
// margin-right: ${({ theme }) => theme.defaults.viewPadding / 2}px;

const Content = styled(View)`
  flex-shrink: 1;
  flex-grow: 1;
  padding: 12px;
  padding-right: 18px;
`;

const JoinButton = styled(TouchableHighlight)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 16px;
  border-top-right-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-right-radius: ${({ theme }) => theme.radius * 2}px;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: ${({ theme }) => theme.background.tertiary};
`;

const ImageRoot = styled(View)<RootProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colour.primary};
  width: ${({ selected }) => (!selected ? 85 : 85 - SELECT_WIDTH * 2)}px;
  height: ${({ selected }) => (!selected ? 85 : 85 - SELECT_WIDTH * 2)}px;
  border-top-left-radius: ${({ theme, selected }) =>
    (theme.radius - (selected ? SELECT_WIDTH : 0)) * 2}px;
  border-bottom-left-radius: ${({ theme, selected }) =>
    (theme.radius - (selected ? SELECT_WIDTH : 0)) * 2}px;
`;

const Image = styled(NativeImage)<RootProps>`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${({ theme, selected }) =>
    theme.radius * 2 - (selected ? SELECT_WIDTH : 0)}px;
  border-bottom-left-radius: ${({ theme, selected }) =>
    theme.radius * 2 - (selected ? SELECT_WIDTH : 0)}px;
  resize-mode: cover;
`;

const ProjectCard = ({ project, onProjectAction, ...props }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const theme = useTheme();

  // Render the project card
  return (
    <Root {...props} activeOpacity={0.6}>
      <Skeleton.Rect
        loading={!project || (project?.urlImage && !imageLoaded && !imageError)}
        borderTopLeftRadius={theme.radius * 2}
        borderBottomLeftRadius={theme.radius * 2}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}>
        <ImageRoot selected={props.selected}>
          {project?.urlImage && !imageError ? (
            <Image
              selected={props.selected}
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
        <>
          <Content>
            <Header numberOfLines={3} size={16} style={{ flex: 1, flexWrap: 'wrap' }}>
              {project?.name || 'Loading Name'}
            </Header>
          </Content>
          <JoinButton
            onPress={() => {
              if (onProjectAction) onProjectAction(project);
            }}
            underlayColor={theme.background.tertiary}>
            <>
              <FontAwesome
                name="plus"
                color={theme.text.secondary}
                size={18}
                style={{ marginRight: 10 }}
              />
              <Body bold>JOIN</Body>
            </>
          </JoinButton>
        </>
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
