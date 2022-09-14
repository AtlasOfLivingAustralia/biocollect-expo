import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';

interface ProfileStyleProps {
  size: number;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

interface ProfileProps extends ProfileStyleProps, TouchableOpacityProps {
  name: string;
  icon?: string;
}

const ProfileRoot = styled(TouchableOpacity)<ProfileStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.tertiary};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`;

const ProfileIconWrapper = styled(View)<ProfileStyleProps>`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: ${({ size }) => size + 16}px;
  height: ${({ size }) => size + 16}px;
`;

const ProfileIconRoot = styled(View)<ProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.tertiary};
  border: 3.5px solid ${({ theme }) => theme.background.primary};
  border-radius: 14px;
  width: 28px;
  height: 28px;
`;

const RootText = styled(Text)<ProfileStyleProps>`
  color: ${({ theme }) => (theme.type === 'dark' ? theme.text.primary : theme.text.secondary)};
  font-family: '${({ theme }) => theme.font.header}';
  font-size: ${({ size }) => Math.max(size - 34, 14)}px;
  font-weight: bold;
`;

const Profile = ({ size, name, icon, ...props }: ProfileProps) => {
  const theme = useTheme();
  return (
    <ProfileRoot size={size} {...props} activeOpacity={0.6}>
      {name ? (
        <RootText size={size}>{getInitials(name)}</RootText>
      ) : (
        <FontAwesome5 name="cog" size={24} color={theme.text.primary} />
      )}
      {icon && name && (
        <ProfileIconWrapper size={size}>
          <ProfileIconRoot size={size}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <FontAwesome5 name={icon as any} size={16} color={theme.text.primary} />
          </ProfileIconRoot>
        </ProfileIconWrapper>
      )}
    </ProfileRoot>
  );
};

export default Profile;
