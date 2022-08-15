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

interface ButtonProps {
  text: string;
  icon?: ImageSourcePropType;
  disabled?: boolean;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

interface ButtonStyleProps {
  disabled?: boolean;
}

const ButtonRoot = styled(TouchableOpacity)<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.button.primary};
  border-radius: ${({ theme }) => theme.radius}px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export default function Button(props: ButtonProps) {
  const { style, disabled, loading, text, icon, onPress } = props;

  return (
    <ButtonRoot
      style={style}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>{text}</Text>
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
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: 'white',
  },
});
