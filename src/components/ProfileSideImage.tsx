import { ReactNode } from 'react';
import { ViewProps, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface ProfileSideImageProps extends ViewProps {
  image: ImageSourcePropType;
  profileSize: number;
  children?: ReactNode;
}

const ProfileIconRoot = styled.View<ProfileSideImageProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ profileSize }) => profileSize + 2}px;
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
  return (
    <ProfileIconRoot {...props}>
      <ProfileImage source={image} />
      {children && children}
    </ProfileIconRoot>
  );
};
