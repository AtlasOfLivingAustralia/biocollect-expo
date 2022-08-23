import {
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';

type ButtonVariant = 'solid' | 'outline';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  padding?: number;
}

interface ButtonProps extends ButtonStyleProps, TouchableOpacityProps {
  text: string;
  icon?: ImageSourcePropType | string;
  iconSize?: number;
  loading?: boolean;
}

const ButtonRoot = styled(TouchableOpacity)<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || 12}px;
  background-color: ${({ theme, variant }) =>
    variant === 'outline' ? 'transparent' : theme.button.primary};
  border-radius: ${({ theme }) => theme.radius}px;
  border-width: 2px;
  border-color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.button.primary : 'transparent'};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const ButtonText = styled(Text)<ButtonStyleProps>`
  font-family: '${({ theme }) => theme.font.button}';
  font-size: 16px;
  color: ${({ theme, variant }) => (variant === 'outline' ? theme.button.primary : 'white')};
`;

export default function Button(props: ButtonProps) {
  const { variant, disabled, loading, text, icon, iconSize, padding, ...rest } = props;
  const theme = useTheme();

  return (
    <ButtonRoot
      {...rest}
      variant={variant}
      disabled={disabled}
      padding={padding}
      activeOpacity={0.6}>
      {(() => {
        if (typeof icon === 'string') {
          return (
            <FontAwesome
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={icon as any}
              style={styles.icon}
              size={iconSize || 20}
              color={variant === 'outline' ? theme.button.primary : 'white'}
            />
          );
        } else if (icon) {
          return <Image source={icon} style={styles.icon} />;
        }
      })()}
      <ButtonText variant={variant}>{text}</ButtonText>
      {loading && <ActivityIndicator size="small" style={styles.loading} color="#ffffff" />}
    </ButtonRoot>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loading: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
