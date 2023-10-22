import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import * as turf from '@turf/turf';
import { getUniqueId } from 'react-native-device-info';

const LocationDaemon = () => {
  
  const expoactivaCoordinates = [
    [-33.44981, -57.89672],
    [-33.44973, -57.89065],
    [-33.45261, -57.89052],
    [-33.45306, -57.89715],
    [-33.44981, -57.89672],
  ];

  const isUserInExpoactiva = (deviceCoordinates, expoactivaCoordinates) => {
    const point = turf.point(deviceCoordinates);
    const polygon = turf.polygon([expoactivaCoordinates]);
    
    const isInPolygon = turf.booleanPointInPolygon(point, polygon);
    console.log("Is user in Expoactiva: ", isInPolygon);
    
    return isInPolygon;
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      
      console.log(status)

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const deviceCoordinates = [
            location.coords.latitude,
            location.coords.longitude,
        ];

        console.log("Location: ", location);
        if(isUserInExpoactiva(deviceCoordinates, expoactivaCoordinates)) {
            console.log("User is in Expoactiva");
          postLocation(location);
        }
      }
    }, 300000); // 5 min

    return () => clearInterval(intervalId);
  }, []);

  const postLocation = async (location) => {
    try {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];
        const deviceId = await getUniqueId();
        const interests = ["Ganaderia", "Maquinas"];

        await axios.post('https://expoactiva-nacional-395522.rj.r.appspot.com/locations', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            date: date,
            time: time,
            deviceId: deviceId,
            interests: interests
        });

        console.log("Location posted successfully");
        console.log("Location: ", location);
    } catch (error) {
      console.error("Error posting location: ", error);
    }
  }

  return null;
}

export default LocationDaemon;
