import { useEffect, useRef } from 'react';
import { View, ViewProps, Dimensions } from 'react-native';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import styled from 'styled-components/native';

const Root = styled(View)`
  display: flex;
  height: ${({ theme }) =>
    (Dimensions.get('screen').width - theme.defaults.viewPadding * 2) * 0.6}px;
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

interface ExploreCardProps extends ViewProps {
  region: Region;
  markers: LatLng[] | null;
}

export default function ExploreCard({ region, markers, ...props }: ExploreCardProps) {
  const mapRef = useRef<MapView>();

  useEffect(() => {
    mapRef.current.animateToRegion(region, 1000);
  }, [region]);

  return (
    <Root {...props}>
      <MapRoot>
        <Map ref={mapRef} showsUserLocation>
          {(markers || []).map((marker, i) => (
            <Marker key={i} coordinate={marker} />
          ))}
        </Map>
      </MapRoot>
    </Root>
  );
}
