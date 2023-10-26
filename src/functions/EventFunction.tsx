import React, { useEffect, useState, useCallback } from 'react'
import { format } from 'date-fns';
import { Alert, AppState, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import properties from '../../properties.json'
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePushNotifications } from '../hooks/usePushNotifications';

export const EventFunction = () => {

    const navigation = useNavigation();
    let iconName = ''
    let colour = ''
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    const [fetching, setFetching] = useState(false)
    const [events, setEvents] = useState<EventoMoshi[]>([]);
    const { favorites, addFavorite, removeFavorite } = useFavorites()
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [showNotificationAlert, setShowNotificationAlert] = useState(false);

    const filterEvent = events.filter((exp: EventoMoshi) =>
        exp.eventName.toLowerCase().includes(searchText.toLowerCase())
    );

    const getEvents = async () => {
        await fetch(properties.moshiURL + 'open/events', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${properties.token}`,
            }
        })
            .then(async res => await res.json())
            .then(res => {
                setEvents(res)
                setLoading(false)
            })
            .catch(err => {

                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "Volver", onPress: () => navigation.goBack() }])
            }).finally(() => setFetching(false))
    }

    useEffect(() => {
        getEvents()
    }, [fetching])

    const handleSetFetching = () => {
        setFetching(true)
    }

    const { expoPushToken, verifyAndRequestPermissions } = usePushNotifications();
    const notificationToken = expoPushToken?.data;

    const checkNotificationPermissions = useCallback(async () => {
        const hasPermissions = await verifyAndRequestPermissions();
        if (!hasPermissions) {
          navigation.goBack();
        }
      }, [navigation, verifyAndRequestPermissions]);
    
    useEffect(() => {
        if (Platform.OS !== 'android') {
            const handleAppStateChange = async () => {
                checkNotificationPermissions();
            };
        
            const subscription = AppState.addEventListener("change", handleAppStateChange);
            
            return () => {
                subscription.remove();
            };
        }
    }, [checkNotificationPermissions]);

    const handleAddFav = async (id: number) => {
        const selectedEvent = filterEvent.find((event) => event.idEvent === id)
        const isFavorite = favorites.find(event => event.idEvent === id)

        if (selectedEvent && !isFavorite) {

            const hasPermissions = await verifyAndRequestPermissions();

            addFavorite(selectedEvent);
            console.log('selectedEvent.dateHourStart', selectedEvent.dateHourStart)
            if (hasPermissions && notificationToken && (new Date(selectedEvent.dateHourStart) > new Date() && (new Date(selectedEvent.dateHourStart).getTime() - new Date().getTime()) > 900000)) {
                const eventTokenMapping = JSON.parse(await AsyncStorage.getItem('eventTokenMapping')) || {};
                eventTokenMapping[id] = notificationToken;
                await AsyncStorage.setItem('eventTokenMapping', JSON.stringify(eventTokenMapping));
                !showNotificationAlert && Alert.alert('¡Has marcado un favorito!', 'Te avisaremos 15 minutos antes de que comience el evento.', [{ text: 'Ok', onPress: () => setShowNotificationAlert(true) }], { cancelable: false });
                await sendFavouriteAPI(selectedEvent.idEvent, selectedEvent.dateHourStart);
            }
        } else {
            await removeFavouriteAPI(id)
            removeFavorite(id);
        }
    }

    const handleSelectItem = (id: number) => {
        const selectedEvent = filterEvent.find((event) => event.idEvent === id)
        navigation.navigate('EventDetail', {
            eventName: selectedEvent?.eventName,
            type: selectedEvent?.type,
            dateHourStart: selectedEvent?.dateHourStart,
            dateHourEnd: selectedEvent?.dateHourEnd,
            image: selectedEvent?.picture,
            description: selectedEvent?.description,
            id: selectedEvent?.idEvent
        })
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        // Formatear la fecha en 'YYYY-MM-DD'
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Resto del formateo como antes
        const optionsDay = {
            weekday: 'long', // Obtener el nombre del día de la semana
        };
        const optionsTime = {
            hour: 'numeric',  // Obtener la hora en formato de 24 horas
            minute: 'numeric', // Obtener los minutos
        };
        const dayNumber = date.getDate(); // Obtener el número del día del mes
        const formattedDay = new Intl.DateTimeFormat('es-ES', optionsDay).format(date);
        const formattedTime = new Intl.DateTimeFormat('es-ES', optionsTime).format(date);

        return {
            day: formattedDay,
            time: formattedTime,
            dayNumber: dayNumber,
            formattedDate: formattedDate,
        };
    }

    // Función para enviar favorito a la API
    async function sendFavouriteAPI(eventId: Number, eventStartTime: Date) {

        const url = `${properties.cyberSoftURL}/favourites/create`;
        
        let expoPushToken = notificationToken;
        const body = {
            expoPushToken,
            eventId,
            eventStartTime
        };

        console.log('Enviando favorito a la API:', body)

        try {
            const response = await axios.post(url, body);


            console.log(response)
            if (response.status === 201) {
                console.log('Favorito agregado en el backend con éxito');
            }
        } catch (error) {
            console.error('Error al enviar favorito a la API:', error);
        }
    }

    async function removeFavouriteAPI(eventId: number) {
        const eventTokenMapping = JSON.parse(await AsyncStorage.getItem('eventTokenMapping')) || {};
        const expoPushTokenForId = eventTokenMapping[eventId];
        
        console.log('Eliminando favorito de la API:', eventId, expoPushTokenForId)
        if (!expoPushTokenForId) {
            return;
        }
        
        delete eventTokenMapping[eventId];
        await AsyncStorage.setItem('eventTokenMapping', JSON.stringify(eventTokenMapping));

        // Si faltan menos de 15 minutos para que comience el evento, no se elimina el favorito
        const event = events.find(event => event.idEvent === eventId);
        if (event && (new Date(event.dateHourStart).getTime() - new Date().getTime()) < 900000) {
            return;
        }

        const url = `${properties.cyberSoftURL}/favourites/`;
    
        let expoPushToken = expoPushTokenForId;
        const body = {
            expoPushToken,
            eventId,
        };
    
        try {
            const response = await axios.delete(url, { data: body });
    
            console.log(response);
            if (response.status === 200) {
                console.log('Favorito eliminado en el backend con éxito');
    
                
            }
        } catch (error) {
            console.error('Error al eliminar favorito en la API:', error);
        }
    }
    

    const removeEvent = async (id: number) => {
        const canRemove = favorites.find(e => e.idEvent === id);
        if (!canRemove) {

        } else {
            await removeFavouriteAPI(id)
            removeFavorite(id)
        }
    }

    return ({
        loading
        , events
        , iconName
        , currentDay
        , colour
        , filterEvent
        , setSearchText
        , fetching
        , handleSetFetching
        , getEvents
        , handleAddFav
        , handleSelectItem
        , formatDateTime
        , removeEvent
        , searchText
    })
}


