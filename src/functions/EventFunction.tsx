import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import properties from '../../properties.json'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const EventFunction = () => {

    const navigation = useNavigation();
    let iconName = ''
    let colour = ''


    const [fetching, setFetching] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false);


    //Cyb3rsoft backend
    // const [events, setEvents] = useState<Event[]>([]);
    // const [favoritos, setFavoritos] = useState<Event[]>([]);
    // const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);s

    //MoshiMoshiBackend
    const [events, setEvents] = useState<EventoMoshi[]>([]);
    const [favorites, setFavorites] = useState<EventoMoshi[]>([]);


    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const filterEvent = events.filter((exp: EventoMoshi) =>
        exp.eventName.toLowerCase().includes(searchText.toLowerCase())
    );


    const getEvents = async () => {
        await fetch(properties.moshiURL + 'event/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${properties.token}`, // notice the Bearer before your token
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
                    [{ text: "OK", onPress: () => navigation.goBack() }])
                console.error(err)
            }).finally(() => setFetching(false))
    }


    useEffect(() => {
        getEvents()
    }, [fetching])



    const handleSetFetching = () => {
        setFetching(true)
    }
    const handleFavourite = async (eventId: number) => {
        try {
            const eventosGuardados = await AsyncStorage.getItem('eventos');
            let eventos = eventosGuardados ? JSON.parse(eventosGuardados) : [];

            const eventoFavorito = events.find((e) => e.idEvent === eventId);
            if (eventoFavorito) {
                if (!Array.isArray(eventos)) {
                    eventos = []; // Si no es un arreglo válido, inicialízalo como un arreglo vacío.
                }
                eventos.push(eventoFavorito);
                await AsyncStorage.setItem('eventos', JSON.stringify(eventos));
            }
        } catch (error) {
            console.error('Error al agregar el evento', error);
        }
        setIsFavorite(previousState => !previousState)
    }


    // Para recuperar los eventos guardados:
    const obtenerEventosGuardados = async () => {
        try {
            const eventosGuardados = await AsyncStorage.getItem('eventos');
            if (eventosGuardados) {
                const eventos = JSON.parse(eventosGuardados);
                console.log(JSON.stringify(eventos)); // Esto mostrará los eventos guardados en la consola
            }
        } catch (error) {
            console.error('Error al obtener los eventos guardados', error);
        }
    }

    const eventosGuardados = AsyncStorage.getItem('eventos')
    console.log(JSON.stringify(eventosGuardados))
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    return ({
        loading,
        events,
        iconName,
        currentDay,
        isFavorite,
        colour,
        handleFavourite,
        filterEvent,
        setSearchText,
        fetching,
        handleSetFetching,
        getEvents,
        favoritos: favorites,
        obtenerEventosGuardados,

    })
}
