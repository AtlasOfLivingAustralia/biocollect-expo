import { useCallback, useState, useContext } from 'react';
import {
  SafeAreaView,
  Animated,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

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
          text="Sign Out"
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
        <ContentLoader
          speed={2}
          width={476}
          height={124}
          viewBox="0 0 200 124"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
          <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <Rect x="0" y="56" rx="3" ry="3" width="150" height="6" />
          <Rect x="0" y="72" rx="3" ry="3" width="150" height="6" />
          <Rect x="0" y="88" rx="3" ry="3" width="150" height="6" />
          <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
