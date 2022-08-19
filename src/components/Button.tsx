import {
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

type ButtonVariant = 'solid' | 'outline';

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  icon?: ImageSourcePropType;
  disabled?: boolean;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

interface ButtonStyleProps {
  variant?: ButtonVariant;
  disabled?: boolean;
}

const ButtonRoot = styled(TouchableOpacity)<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: ${({ theme, variant }) =>
    variant === 'outline' ? 'transparent' : theme.button.primary};
  border-radius: ${({ theme }) => theme.radius}px;
  border-width: 3px;
  border-color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.button.primary : 'transparent'};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const ButtonText = styled(Text)<ButtonStyleProps>`
  font-family: '${({ theme }) => theme.font.button}';
  font-size: 16px;
  color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.button.primary : 'white'};
`;

export default function Button(props: ButtonProps) {
  const { style, variant, disabled, loading, text, icon, onPress } = props;

  return (
    <ButtonRoot
      style={style}
      variant={variant}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <ButtonText variant={variant}>{text}</ButtonText>
      {loading && (
        <ActivityIndicator
          size='small'
          style={styles.loading}
          color='#ffffff'
        />
      )}
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
