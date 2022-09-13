import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
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

interface ExploreCardProps extends TouchableOpacityProps {
  navigate: (to: string, params: { region: Region }) => void;
}

export default function ExploreCard({ navigate, ...props }: ExploreCardProps) {
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>();
  useEffect(() => {
    async function getLocation() {
      if ((await requestForegroundPermissionsAsync()).status === 'granted') {
        const { coords } = await getCurrentPositionAsync({
          accuracy: 4,
        });

        // Create a new region
        const newRegion: Region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        };

        // Navigate the map
        setRegion(newRegion);
        mapRef.current.animateToRegion(newRegion);
      }
    }

    getLocation();
  }, []);
  return (
    <Root {...props} activeOpacity={0.6} onPress={() => navigate('Explore', { region })}>
      <MapRoot pointerEvents="none">
        <Map ref={mapRef} showsUserLocation />
      </MapRoot>
    </Root>
  );
}
