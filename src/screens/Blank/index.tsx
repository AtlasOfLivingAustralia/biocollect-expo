import { Text } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import ThemeView from 'components/ThemeView';

export default function Authentication(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <>
      <ThemeView>
        <Text>Testing</Text>
      </ThemeView>
    </>
  );
}
