import { ReactNode } from 'react';
import { ViewProps, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';

interface ProfileSideImageProps extends ViewProps {
  image: ImageSourcePropType;
  children?: ReactNode;
}

const ProfileIconRoot = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 4px;
`;

const ProfileIcon = styled(FontAwesome)`
  margin: 8px;
`;

const ProfileImage = styled(Image)`
  margin: 8px;
  width: 24px;
  height: 24px;
`;

export default ({ image, children, ...props }: ProfileSideImageProps) => {
  const theme = useTheme();
  return (
    <ProfileIconRoot {...props}>
      <ProfileImage source={image} />
      {children && children}
    </ProfileIconRoot>
  );
};