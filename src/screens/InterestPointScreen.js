import React, { useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, Image, StyleSheet, useWindowDimensions, BackHandler } from 'react-native';
import Map from '../components/Map.js';
import { HeaderComponent } from '../components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';

export const InterestPointScreen = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

    const showModal = () => {
        setVisible(prevState => !prevState);
        navigation.goBack();
    };

    const handleBackButton = () => {
        if (visible) { 
            showModal();
            return true;  
        }
        return false;  
    };

    useEffect(() => {
        setVisible(true);


        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []); 

    return (
        <Modal 
            visible={visible} 
            transparent={true} 
            animationType='none'
            onRequestClose={showModal} 
        >
            <HeaderComponent />
            <View style={styles.page}>
                <Map />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        width: '100%',
    }
});
