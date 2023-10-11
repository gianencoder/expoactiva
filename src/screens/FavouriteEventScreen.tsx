import React, { useContext, useEffect, useState, } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const FavouriteEventScreen = () => {

    const [eventos, setEventos] = useState({})
    const obtenerEventosGuardados = async () => {
        try {
            const eventosGuardados = await AsyncStorage.getItem('eventos');
            if (eventosGuardados) {
                const eventos = JSON.parse(eventosGuardados);
                console.log(JSON.stringify(eventos)); // Esto mostrará los eventos guardados en la consola
                setEventos([eventos])
            }
        } catch (error) {
            console.error('Error al obtener los eventos guardados', error);
        }
    }

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Se han eliminado todos los datos de AsyncStorage.');
        } catch (error) {
            console.error('Error al eliminar los datos de AsyncStorage:', error);
        }
    };

    useEffect(() => {
        obtenerEventosGuardados()
    }, [])

    return (
        <View style={{ ...eventStyle.container, justifyContent: 'flex-start', alignItems: 'center' }} >
            <Text style={{ marginVertical: 50, fontSize: 20 }}>{JSON.stringify(eventos)}</Text>
            {/* <TextInput onChangeText={text => setName(text)} style={{ width: 250, height: 50, borderRadius: 10, borderColor: 'black', borderWidth: 1, marginVertical: 10 }} /> */}
            <Button title='Eliminar todo' color={'red'} onPress={obtenerEventosGuardados} ></Button>
            {/* <Button title='Eliminar' onPress={remove} color={'red'} ></Button> */}
        </View >

    );

}
