import React, { useEffect, useState } from 'react';
import Mapbox from '@rnmapbox/maps';

const lineStyle = {
  lineWidth: 7,
  lineColor: '#09f',
  lineOpacity: 0.85,
  lineCap: 'round',
  lineJoin: 'round',
};

const MapNavigation = ({ route, cameraRef, origin, destination }) => {
  const [hasSetCamera, setHasSetCamera] = useState(false);

  useEffect(() => {
    if (route && route.geometry.coordinates.length > 0 && !hasSetCamera) {
      try {
        const southWest = [
          Math.min(origin.longitude, destination.longitude),
          Math.min(origin.latitude, destination.latitude)
        ];
        const northEast = [
          Math.max(origin.longitude, destination.longitude),
          Math.max(origin.latitude, destination.latitude)
        ];

        cameraRef.current?.fitBounds(northEast, southWest, 125);
        setHasSetCamera(true);
      } catch (error) {
        console.error("Error in useEffect: ", error);
      }
    }
  }, [route, origin, destination, hasSetCamera]);

  return (
    route && (
      <Mapbox.ShapeSource id="routeSource" shape={route}>
        <Mapbox.LineLayer id="routeLine" style={lineStyle}/>
      </Mapbox.ShapeSource>
    )
  );
};

export default React.memo(MapNavigation);
