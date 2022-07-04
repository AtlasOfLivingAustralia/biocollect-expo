import { View, Text, StyleSheet, TextInput } from 'react-native';
import { getCurrentTheme } from '../theme';

import globalStyles from '../components/styles';

export default function Home() {
  const styles = globalStyles();

  return (
    <View style={styles.homeContainer}>
      <Text>Hello World!</Text>
    </View>
  );
}