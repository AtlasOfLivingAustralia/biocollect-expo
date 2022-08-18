import { SafeAreaView, Text } from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import ThemeView from 'components/ThemeView';
import styled from 'styled-components/native';

const Header = styled.Text`
  font-family: 'RobotoBold';
  color: ${({ theme }) => theme.text.primary};
`;

export default function Authentication(
  props: NativeStackScreenProps<RootStackParamList, 'Project'>
) {
  const { params: project } = props.route;
  return (
    <>
      <ThemeView>
        <SafeAreaView>
          <Header>{project.name.trim()}</Header>
        </SafeAreaView>
      </ThemeView>
    </>
  );
}
