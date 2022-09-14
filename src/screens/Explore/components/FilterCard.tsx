import { TouchableOpacityProps, View } from 'react-native';

import styled, { useTheme } from 'styled-components/native';
import Body from 'components/Body';
import { FontAwesome5 } from '@expo/vector-icons';

interface ProjectCardProps extends TouchableOpacityProps {
  label: string;
  checked: boolean;
  icon: string;
}

const Root = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.radius}px;
  margin-bottom: 12px;
  shadow-opacity: 0.3;
  shadow-radius: 3.5px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 6;
`;

const Content = styled.View`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top-right-radius: ${({ theme }) => theme.radius}px;
  border-bottom-right-radius: ${({ theme }) => theme.radius}px;
  padding: 12px;
`;

const ImageRoot = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colour.primary};
  width: 45px;
  height: 45px;
  border-top-left-radius: ${({ theme }) => theme.radius}px;
  border-bottom-left-radius: ${({ theme }) => theme.radius}px;
`;

// const Image = styled(NativeImage)`
//   width: 25px;
//   height: 25px;
// `;

const FilterCard = ({ checked, label, icon, ...props }: ProjectCardProps) => {
  const theme = useTheme();
  // Render the project card
  return (
    <Root {...props} activeOpacity={0.6}>
      <ImageRoot>
        {/* <Image source={alaLogo} /> */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <FontAwesome5 name={icon as any} color="white" size={25} />
      </ImageRoot>
      <Content>
        <Body>{label}</Body>
      </Content>
      <Footer>
        <Body size={14} bold style={{ marginRight: 12, alignSelf: 'center' }}>
          {checked ? 'Included' : 'Omitted'}
        </Body>
        <FontAwesome5
          name={checked ? 'check-square' : 'square'}
          size={20}
          color={theme.text.secondary}
        />
      </Footer>
    </Root>
  );
};

export default FilterCard;
