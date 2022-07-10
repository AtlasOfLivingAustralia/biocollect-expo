import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { palette } from 'theme/index';

interface ButtonProps {
  text: string;
  icon?: ImageSourcePropType;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button(props: ButtonProps) {
  const { style, disabled, text, icon, onPress } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={StyleSheet.compose<ViewStyle>(
        { ...styles.container, opacity: disabled ? 0.4 : 1 },
        style || {}
      )}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: palette.primary.flamingo,
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: 'white',
  },
});
