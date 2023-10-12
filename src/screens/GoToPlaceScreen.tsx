import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, BackHandler, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { GoToPlaceFunction } from '../functions/GoToPlaceFunction';
import { mapsTheme } from '../theme/MapsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { HeaderComponent } from '../components/HeaderComponent';

export const GoToPlaceScreen = () => {
  const { androidNavigate, iosNavigate, wazeNavigate } = GoToPlaceFunction();
  const [modal, setModal] = useState(true);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext)

  const showModal = () => {
    setModal(prevState => !prevState);
    if (modal) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      console.log('Back button pressed');
      if (modal) {
        console.log('Modal is visible, closing modal.');
        setModal(false);
        navigation.goBack();
        return true;
      }
      console.log('Modal is not visible, default behavior.');
      return false;
    };


    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Cleanup event listener on component unmount
  }, [modal]);

  return (
    <Modal visible={modal} animationType='fade' transparent={true} onRequestClose={showModal}>
      <HeaderComponent></HeaderComponent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        {/* <Image source={require('../assets/icons/mainIcon.png')} style={{ width: 140, height: 60, marginTop: -40, marginBottom: 40 }} /> */}
        <View style={{
          width: '80%', backgroundColor: theme.colors.background, height: 400, borderRadius: 20, shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.2,
          shadowRadius: 16.00,
          elevation: 24,
        }}>
          <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'flex-end', padding: 25 }} onPress={showModal}>
            <Ionicons name="ios-close-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={mapsTheme.googleBtn}
              onPress={androidNavigate}
            >
              <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/googleMaps.png')} />
              <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mapsTheme.appleBtn}
              onPress={iosNavigate}
            >
              <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/appleMaps.png')} />
              <Text style={mapsTheme.txtBtn}>Ir con Apple maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mapsTheme.wazeBtn}
              onPress={wazeNavigate}
            >
              <Image style={{ width: 40, height: 40 }} source={require('../assets/icons/wazeMaps.png')} />
              <Text style={mapsTheme.txtBtn}>Ir con Waze</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
