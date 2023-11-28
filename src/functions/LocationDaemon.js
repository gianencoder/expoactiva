import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import * as turf from '@turf/turf';
import { getUniqueId } from 'react-native-device-info';
import properties from '../../properties.json';
import { useAuthContext } from '../context/AuthContext/AuthContext';
import Constants from 'expo-constants';

const apikey = Constants.expoConfig.extra.apikey;

const LocationDaemon = () => {

  const { user, isLoggedIn } = useAuthContext();
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


    return isInPolygon;
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { status } = await Location.getForegroundPermissionsAsync();



      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const deviceCoordinates = [
          location.coords.latitude,
          location.coords.longitude,
        ];


        if (isUserInExpoactiva(deviceCoordinates, expoactivaCoordinates)) {

          postLocation(location);
        }
      }
    }, 300000); // 5 min

    return () => clearInterval(intervalId);
  }, [user, isLoggedIn]);

  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }


  function getAgeRange(age) {
    if (age >= 0 && age <= 17) {
      return '0-17';
    } else if (age >= 18 && age <= 35) {
      return '18-35';
    } else if (age >= 36 && age <= 60) {
      return '36-60';
    } else if (age >= 61 && age <= 70) {
      return '61-70';
    } else if (age >= 71) {
      return '71+';
    } else {
      return 'Unknown';
    }
  }

  const postLocation = async (location) => {
    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];
      const deviceId = getUniqueId()._j;

      let interests = [];
      let ageRange = 'Unknown';

      if (isLoggedIn) {
        interests = user.interests;
        const age = calculateAge(user.date);
        ageRange = getAgeRange(age);
      }

      const body = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        date: date,
        time: time,
        deviceId: deviceId,
        interests: interests,
        ageRange: ageRange,
      }
      axios.defaults.headers.common['apikey'] = apikey;
      await axios.post(`${properties.prod}open/locations`, body);
    } catch (error) {
      console.log('Error al enviar localizacion', error.message);
    }
  }

  return null;
}

export default LocationDaemon;
