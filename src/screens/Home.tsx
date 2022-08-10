import { useCallback, useState, useContext } from 'react';
import {
  SafeAreaView,
  Animated,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import globalStyles from 'components/styles';
import Button from 'components/Button';
import { AuthContext } from '../helpers/auth';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(
  props: NativeStackScreenProps<RootStackParamList, 'Home'>
) {
  const [refreshing, setRefreshing] = useState(false);
  const auth = useContext(AuthContext);
  const styles = globalStyles();
  // const fadeInAnim = useRef(new Animated.Value(0)).current;

  // // Animation effect
  // useEffect(() => {
  //   Animated.timing(fadeInAnim, {
  //     toValue: 1,
  //     duration: 250,
  //     easing: Easing.ease,
  //     useNativeDriver: false,
  //   }).start();
  // }, [fadeInAnim]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Animated.View
        style={{
          // opacity: fadeInAnim,
          opacity: 1,
        }}
      >
        <Text style={styles.title}>Home Screen</Text>
        <Button
          text='Sign Out'
          onPress={async () => {
            await auth.signOut();
            props.navigation.navigate('Authentication');
          }}
        />
      </Animated.View>
      <ScrollView
        contentContainerStyle={localStyles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
