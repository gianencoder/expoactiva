import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { GoToPlaceFunction } from '../functions/GoToPlaceFunction';
import { mapsTheme } from '../theme/MapsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { Platform } from 'react-native';

export const GoToPlaceScreen = () => {
  const { theme } = useContext(ThemeContext)
  const android = Platform.OS === 'android'
  const googleApp = "https://www.google.com/maps/dir/?api=1&destination="
  const googleWeb = "https://www.google.com/maps/place/"
  const appleApp = "http://maps.apple.com/?daddr="
  const appleWeb = "https://www.apple.com/maps/dir/?daddr="
  const wazeApp = "waze://?ll="
  const wazeUrl = "https://www.waze.com/ul?ll="

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <View style={{
        width: '80%', backgroundColor: theme.colors.background, height: 350, borderRadius: 20, shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 16.00,
        elevation: 24,
        justifyContent: 'center'
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={mapsTheme.googleBtn}
            onPress={() => GoToPlaceFunction({ appUrl: googleApp, webUrl: googleWeb, optional: "" })}
          >
            <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/googleMaps.png')} />
            <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
          </TouchableOpacity>
          {!android &&
            <TouchableOpacity style={mapsTheme.appleBtn}
              onPress={() => GoToPlaceFunction({ appUrl: appleApp, webUrl: appleWeb, optional: "" })}
            >
              <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/appleMaps.png')} />
              <Text style={mapsTheme.txtBtn}>Ir con Apple maps</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={mapsTheme.wazeBtn}
            onPress={() => GoToPlaceFunction({ appUrl: wazeApp, webUrl: wazeUrl, optional: "&navigate=yes" })}
          >
            <Image style={{ width: 40, height: 40 }} source={require('../assets/icons/wazeMaps.png')} />
            <Text style={mapsTheme.txtBtn}>Ir con Waze</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};
