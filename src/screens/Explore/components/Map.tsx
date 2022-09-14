import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import { BlurView } from 'expo-blur';
import { View, ViewProps, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import styled from 'styled-components/native';

// Project components
import Body from 'components/Body';

const Root = styled(View)`
  display: flex;
  height: ${({ theme }) =>
    (Dimensions.get('screen').width - theme.defaults.viewPadding * 2) * 0.5}px;
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

const MapOverlay = styled(BlurView)`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
`;

const Map = styled(MapView)`
  flex-grow: 1;
`;

interface ExploreCardProps extends ViewProps {
  region: Region;
  markers: LatLng[] | null;
  error: AxiosError | null;
}

export default function ExploreCard({ region, markers, error, ...props }: ExploreCardProps) {
  const mapRef = useRef<MapView>();

  useEffect(() => {
    mapRef.current.animateToRegion(region, 700);
  }, [region]);

  return (
    <Root {...props}>
      <MapRoot>
        <Map ref={mapRef} showsUserLocation>
          {(markers || []).map((marker, i) => (
            <Marker key={i} coordinate={marker} />
          ))}
        </Map>
        {(() => {
          if (error) {
            return (
              <MapOverlay tint="dark">
                <ActivityIndicator style={{ marginRight: 12 }} color="white" />
                <Body bold primary size={18} style={{ color: 'white' }}>
                  {error.message}
                </Body>
              </MapOverlay>
            );
          } else if (!markers) {
            return (
              <MapOverlay tint="dark">
                <ActivityIndicator style={{ marginRight: 12 }} color="white" />
                <Body bold primary size={18} style={{ color: 'white' }}>
                  Finding projects
                </Body>
              </MapOverlay>
            );
          } else if (markers.length === 0) {
            return (
              <MapOverlay tint="dark">
                <Body bold primary size={18} style={{ color: 'white' }}>
                  No projects found
                </Body>
              </MapOverlay>
            );
          }
        })()}
      </MapRoot>
    </Root>
  );
}
