import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { Alert, AppState, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import properties from '../../properties.json'
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePushNotifications } from '../hooks/usePushNotifications';
import Constants from 'expo-constants';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';

const apikey = Constants.expoConfig?.extra?.apikey;

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
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);

    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

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
            .catch(async err => {
                await fetch(properties.prod + 'events', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${properties.token}`,
                        'apikey': apikey
                    }
                }).then(async res => await res.json())
                    .then(res => {
                        setEvents(res)
                        setLoading(false)
                    }).catch(err => {
                        console.log(err)
                        Alert.alert("Hubo un problema obteniendo la información",
                            'Intenta nuevamente en unos minutos',
                            [{ text: "Aceptar", onPress: () => navigation.goBack() }])
                    })
            }).finally(() => setFetching(false))
    }

    useEffect(() => {
        getEvents()
    }, [fetching])

    const handleSetFetching = () => {
        setFetching(true)
    }

    const isEventFinished = (event: EventoMoshi) => {
        return new Date(event.dateHourEnd) < new Date();
    };

    const reorderEventsWithFinishedLast = (events: EventoMoshi[]) => {
        const finishedEvents = events.filter(isEventFinished);
        const ongoingOrUpcomingEvents = events.filter((event: EventoMoshi) => !isEventFinished(event));
        return [...ongoingOrUpcomingEvents, ...finishedEvents];
    };

    const orderedEvents = reorderEventsWithFinishedLast(filterEvent);

    const { expoPushToken, verifyAndRequestPermissions } = usePushNotifications();
    const notificationToken = expoPushToken?.data;

    const checkNotificationPermissions = async () => {
        const hasPermissions = await verifyAndRequestPermissions();
        if (!hasPermissions) {
            navigation.goBack();
        }
    };

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
        const isFavorite = favorites.find(event => event === id)

        if (selectedEvent && !isFavorite) {

            const hasPermissions = await verifyAndRequestPermissions();

            addFavorite(id);
            console.log('selectedEvent.dateHourStart', selectedEvent.dateHourStart)
            if (hasPermissions && notificationToken && (new Date(selectedEvent.dateHourStart) > new Date() && (new Date(selectedEvent.dateHourStart).getTime() - new Date().getTime()) > 600000)) {
                const eventTokenMapping = JSON.parse(await AsyncStorage.getItem('eventTokenMapping')) || {};
                eventTokenMapping[id] = notificationToken;
                await AsyncStorage.setItem('eventTokenMapping', JSON.stringify(eventTokenMapping));
                !showNotificationAlert && Alert.alert(translation.favoriteEvent.checkAsFavorite, translation.favoriteEvent.favoriteMessage, [{ text: 'Ok', onPress: () => setShowNotificationAlert(true) }], { cancelable: false });
                await sendFavouriteAPI(selectedEvent.idEvent, selectedEvent.dateHourStart);
            }
        } else {
            const userDecision = await presentRemoveFavoriteAlert();
            console.log('removeFavoriteAlert', userDecision);
            if (userDecision) {
                await removeFavouriteAPI(id);
                removeFavorite(id, true);
            }
        }
    }

    const presentRemoveFavoriteAlert = () => {
        return new Promise(resolve => {
            Alert.alert(
                translation.favoriteEvent.confirmation,
                '',
                [
                    { text: translation.favoriteEvent.cancel, onPress: () => resolve(false), style: 'cancel' },
                    { text: translation.favoriteEvent.delete, onPress: () => resolve(true), style: 'destructive' }
                ]
            );
        });
    };

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

    // Función para enviar favorito a la API
    async function sendFavouriteAPI(eventId: Number, eventStartTime: Date) {

        const url = `${properties.prod}favourites/create`;

        let expoPushToken = notificationToken;

        const body = {
            expoPushToken,
            eventId,
            eventStartTime,
            language: languageState.language,
        };

        console.log('Enviando favorito a la API:', body)

        try {
            axios.defaults.headers.common['apikey'] = apikey;
            const response = await axios.post(url, body);


            console.log(response)
            if (response.status === 201) {
                console.log('Favorito agregado en el backend con éxito');
            }
        } catch (error) {
            console.log('Error al enviar favorito a la API:', error);
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

        // Si faltan menos de 10 minutos para que comience el evento, no se elimina el favorito
        const event = events.find(event => event.idEvent === eventId);
        if (event && (new Date(event.dateHourStart).getTime() - new Date().getTime()) < 600000) {
            return;
        }

        const url = `${properties.prod}favourites/`;

        let expoPushToken = expoPushTokenForId;
        const body = {
            expoPushToken,
            eventId,
        };

        try {
            axios.defaults.headers.common['apikey'] = apikey;
            const response = await axios.delete(url, { data: body });

            console.log(response);
            if (response.status === 200) {
                console.log('Favorito eliminado en el backend con éxito');


            }
        } catch (error) {
            console.log('Error al eliminar favorito en la API:', error);
        }
    }

    const removeEvent = async (id: number) => {
        const canRemove = favorites.find(e => e === id);
        if (!canRemove) {

        } else {
            const userDecision = await presentRemoveFavoriteAlert();
            console.log('removeFavoriteAlert', userDecision);
            if (userDecision) {
                await removeFavouriteAPI(id);
                removeFavorite(id, true);
            }
        }
    }


    return ({
        loading
        , events
        , iconName
        , currentDay
        , colour
        , filterEvent: orderedEvents
        , setSearchText
        , fetching
        , handleSetFetching
        , getEvents
        , handleAddFav
        , handleSelectItem
        , removeEvent
        , searchText
        , isEventFinished
        , reorderEventsWithFinishedLast

    })
}


