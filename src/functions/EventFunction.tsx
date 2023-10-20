import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import properties from '../../properties.json'
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';

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
                console.log(err)
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

    const handleAddFav = (id: number) => {
        const selectedEvent = filterEvent.find((event) => event.idEvent === id)
        const isFavorite = favorites.find(event => event.idEvent === id)

        if (!selectedEvent && isFavorite) {

        }
        if (selectedEvent && !isFavorite) {
            addFavorite(selectedEvent)
            console.log("Evento con el id ", id, "agregado")
        } else {
            removeFavorite(id)
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



    const removeEvent = (id: number) => {
        const canRemove = favorites.find(e => e.idEvent === id);
        if (!canRemove) {

        } else {
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

