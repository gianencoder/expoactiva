import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import properties from '../../properties.json'

export const EventFunction = () => {

    const navigation = useNavigation();
    let iconName = ''
    let colour = ''
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    const [fetching, setFetching] = useState(false)
    const [events, setEvents] = useState<EventoMoshi[]>([]);

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

    return ({
        loading,
        events,
        iconName,
        currentDay,
        colour,
        filterEvent,
        setSearchText,
        fetching,
        handleSetFetching,
        getEvents,
    })
}


