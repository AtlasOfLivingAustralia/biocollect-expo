import { useEffect, useRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const Root = styled(TouchableOpacity)`
  display: flex;
  height: 150px;
  width: 100%;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-color: black;
  shadow-offset: 0px 6px;
  elevation: 6;
`;

const MapRoot = styled(View)`
  display: flex;
  border-radius: ${({ theme }) => theme.radius * 2}px;
  flex-grow: 1;
  overflow: hidden;
`;

const Map = styled(MapView)`
  flex-grow: 1;
`;

export default function ExploreCard(props: TouchableOpacityProps) {
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
    <Root {...props} activeOpacity={0.6}>
      <MapRoot pointerEvents="none">
        <Map ref={mapRef} showsUserLocation />
      </MapRoot>
    </Root>
  );
}
