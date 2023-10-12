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
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')


    const [fetching, setFetching] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState<EventoMoshi[]>([]);




    //Cyb3rsoft backend
    // const [events, setEvents] = useState<Event[]>([]);
    // const [favoritos, setFavoritos] = useState<Event[]>([]);
    // const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);s

    //MoshiMoshiBackend
    const [events, setEvents] = useState<EventoMoshi[]>([]);



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

    const handleFavourite = async (evento: EventoMoshi) => {
        cargarFavoritos()

        const currentList = await AsyncStorage.getItem('eventosFavoritos')
        let updatedList = []

        if (currentList) {
            updatedList = JSON.parse(currentList)
        }
        updatedList.push(evento)

        await AsyncStorage.setItem('eventosFavoritos', JSON.stringify(updatedList))
            .then(data => console.log("Data saved"))
            .catch(err => console.error(err))
    }

    const cargarFavoritos = async () => {
        console.log('carga de favoritos')
        try {
            const favoritosGuardados = await AsyncStorage.getItem('eventosFavoritos');
            if (favoritosGuardados) {
                setFavorites(JSON.parse(favoritosGuardados));
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        cargarFavoritos()
    }, [])

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
        favorites,
    })
}


