import { useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const Root = styled(TouchableOpacity)`
  display: flex;
  height: 150px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius * 2}px;
  overflow: hidden;
`;

const MapRoot = styled(View)`
  display: flex;
  flex-grow: 1;
  shadow-opacity: 0.3;
  shadow-radius: 4.5px;
  shadow-color: black;
  shadow-offset: 0px 2.8px;
  elevation: 6;
`;

const Map = styled(MapView)`
  flex-grow: 1;
`;

export default function ExploreCard(props: object) {
  const mapRef = useRef<MapView>();
  useEffect(() => {
    async function getLocation() {
      if ((await requestForegroundPermissionsAsync()).status === 'granted') {
        const { coords } = await getCurrentPositionAsync({
          accuracy: 4,
        });
        mapRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }

    getLocation();
  }, []);
  return (
    <Root activeOpacity={0.6}>
      <MapRoot pointerEvents="none">
        <Map ref={mapRef} showsUserLocation />
      </MapRoot>
    </Root>
  );
}
