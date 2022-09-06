import { Text } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import ThemeView from 'components/ThemeView';
import HeaderView from 'components/HeaderView';
import Header from 'components/Header/Header';
import NavButton from 'components/NavButton';

export default function Authentication(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <ThemeView>
      <HeaderView>
        <Header>Blank</Header>
        <NavButton icon="arrow-left" text="GO BACK" onPress={() => props.navigation.goBack()} />
      </HeaderView>
      <Text>Testing</Text>
    </ThemeView>
  );
}
