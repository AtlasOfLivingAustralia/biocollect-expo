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
import styled, { DefaultTheme, useTheme } from 'styled-components/native';

type ButtonVariant = 'solid' | 'outline' | 'light' | 'dim';

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

const getVariantProps = (theme: DefaultTheme, variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return {
        root: `
      background-color: ${theme.button.primary};
      border-color: transparent;
      `,
        button: `
      color: white;
      `,
      };
    case 'outline':
      return {
        root: `
      background-color: transparent;
      border-color: ${theme.button.primary};
      `,
        button: `
      color: ${theme.button.primary};
      `,
      };
    case 'light':
      return {
        root: `
        background-color: ${theme.background.secondary};
        border-color: transparent;
        `,
        button: `
        color: ${theme.text.primary};
        `,
      };
    case 'dim':
      return {
        root: `
        background-color: ${theme.background.primary};
        border-color: transparent;
        `,
        button: `
        color: ${theme.text.primary};
        `,
      };
  }
};

const ButtonRoot = styled(TouchableOpacity)<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || 12}px;
  border-radius: ${({ theme }) => theme.radius}px;
  border-width: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  ${({ theme, variant }) => getVariantProps(theme, variant || 'solid').root}
`;

const ButtonText = styled(Text)<ButtonStyleProps>`
  font-family: '${({ theme }) => theme.font.button}';
  font-size: 16px;
  ${({ theme, variant }) => getVariantProps(theme, variant || 'solid').button}
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
