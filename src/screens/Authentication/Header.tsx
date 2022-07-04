import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TextInput, Image, ImageBackground } from 'react-native';
import { useColorScheme } from 'react-native';
import Svg from 'react-native-svg';

// Images
import imageSplash from 'assets/images/ui/splash.png';
import imageWaveLight from 'assets/images/ui/wave-light.svg';
import imageWaveDark from 'assets/images/ui/wave-dark.svg';

export default function Home() {
  const scheme = useColorScheme();

  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <ImageBackground style={localStyles.image} resizeMode="cover" source={imageSplash}>
          <Text>Testing</Text>
          <Image style={localStyles.wave} resizeMode='stretch' source={scheme === 'dark' ? imageWaveDark : imageWaveLight} />
          <Text>Testing</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
  },
  image: {
    width: '100%',
    height: 240,
  },
  wave: {
    width: '100%',
    height: 50,
  },
  header: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
});