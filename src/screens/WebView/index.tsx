import { useContext, useState } from 'react';
import { WebView as NativeWebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Authentication context
import { AuthContext } from 'helpers/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavButton from 'components/NavButton';

const Root = styled(View)`
  background-color: white;
  display: flex;
  flex-grow: 1;
  padding-top: 24px;
`;

const BottomView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
`;

const LoadingView = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function WebView(props: NativeStackScreenProps<RootStackParamList, 'WebView'>) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  return (
    <Root>
      <SafeAreaView style={{ display: 'flex', flexGrow: 1 }}>
        <NativeWebView
          onLoadEnd={() => setLoaded(true)}
          style={{ flexGrow: 1 }}
          source={{
            uri: props.route.params.uri,
            headers: {
              Authorization: `Bearer ${auth.credentials.accessToken}`,
            },
          }}
        />
        {!loaded && (
          <LoadingView>
            <ActivityIndicator size="large" />
          </LoadingView>
        )}
        <BottomView>
          <NavButton icon="times" text="CLOSE" onPress={() => props.navigation.goBack()} />
        </BottomView>
      </SafeAreaView>
    </Root>
  );
}
