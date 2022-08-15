import { View } from 'react-native';
import { BioCollectProject } from 'types';

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import styled from 'styled-components/native';

interface ProjectCardProps {
  project: BioCollectProject | null;
  onPress?: (project: BioCollectProject) => void;
}

const Root = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius * 2}px;
  margin-bottom: 12px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  shadow-color: black;
  shadow-offset: 0px 0px;
`;

const Content = styled.View`
  flex-shrink: 1;
  padding: 12px;
`;

const ImageRoot = styled.View`
  background-color: ${(props) => props.theme.background.tertiary};
  width: 110px;
  height: 110px;
  border-top-left-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.radius * 2}px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: ${({ theme }) => theme.radius * 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.radius * 2}px;
  resize-mode: cover;
`;

const Header = styled.Text`
  font-family: 'Lato';
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text.primary};
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.text.secondary};
`;

export default ({ project, onPress }: ProjectCardProps) => {
  // Handle button press events
  const handleOnPress = () => {
    console.log(project.name);
    if (onPress) onPress(project);
  };

  // Render the project card
  if (project) {
    return (
      <Root activeOpacity={0.6} onPress={handleOnPress}>
        <ImageRoot>
          <Image source={{ uri: project.urlImage }} />
        </ImageRoot>
        <Content>
          <Header numberOfLines={2}>{project.name.trim()}</Header>
          <StyledText numberOfLines={2}>{project.description}</StyledText>
        </Content>
      </Root>
    );
  } else {
    // return (
    //   <View>
    //     <ContentLoader
    //       interval={0}
    //       speed={2}
    //       width={476}
    //       height={124}
    //       viewBox='0 0 200 124'
    //       backgroundColor='#373737'
    //       foregroundColor='#646464'
    //     >
    //       <Rect x='48' y='8' rx='3' ry='3' width='88' height='12' />
    //       <Rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
    //       <Rect x='0' y='56' rx='3' ry='3' width='150' height='6' />
    //       <Rect x='0' y='72' rx='3' ry='3' width='150' height='6' />
    //       <Rect x='0' y='88' rx='3' ry='3' width='150' height='6' />
    //       <Circle cx='20' cy='20' r='20' />
    //     </ContentLoader>
    //   </View>
    // );
    return (
      <Root disabled>
        <ImageRoot />
        <Content>
          <Header numberOfLines={2}>LOADING{`\n`}LOADING</Header>
          <StyledText numberOfLines={2}>LOADING{`\n`}LOADING</StyledText>
        </Content>
      </Root>
    );
  }
};
