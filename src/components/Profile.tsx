import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

// TODO: Move font family into theme config
const Profile = styled(TouchableOpacity)<ProfileStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.tertiary};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

// TODO: Move font family into theme config
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

// TODO: Move font family into theme config
const RootText = styled(Text)<ProfileStyleProps>`
  color: ${({ theme }) =>
    theme.type === 'dark' ? theme.text.primary : theme.text.secondary};
  font-family: '${({ theme }) => theme.font.header}';
  font-size: ${({ size }) => Math.max(size - 34, 14)}px;
  font-weight: bold;
`;

export default ({ size, name, icon, ...props }: ProfileProps) => {
  const theme = useTheme();
  return (
    <Profile size={size} {...props} activeOpacity={0.6}>
      <RootText size={size}>{getInitials(name)}</RootText>
      {icon && (
        <ProfileIconWrapper size={size}>
          <ProfileIconRoot size={size}>
            <FontAwesome
              name={icon as any}
              size={16}
              color={theme.text.primary}
            />
          </ProfileIconRoot>
        </ProfileIconWrapper>
      )}
    </Profile>
  );
};
