import React, { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EventFunction = () => {

    const navigation = useNavigation();
    let iconName = ''
    let colour = ''
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWRQZXJzb24iOjYsIm5hbWUiOiJGZWRlcmljbyBHdWlsbGVuIiwiZG9jdW1lbnQiOm51bGwsIm1haWwiOiJmZWRlcmljby5ndWlsbGVuQGVzdHVkaWFudGVzLnV0ZWMuZWR1LnV5IiwiYWdlIjpudWxsLCJyb2xlIjoiRVhISUJJVE9SIiwicGxhdGZvcm0iOiJtYWlsIiwiZ29vZ2xlSWQiOm51bGwsInBpY3R1cmUiOm51bGwsInBhc3N3b3JkIjoiJDJiJDEwJEJqTGcuMmJvY2JmUXkyNy43bUs0M3VZeVBYQ0pqcHI1ZjYuSXk0TkdVMndWOC50Wlp3eTlPIiwiZW5hYmxlIjp0cnVlLCJleGhpYml0b3JfZGVzY3JpcHRpb24iOiJUT1lPVEEiLCJleGhpYml0b3JfaW1hZ2UiOm51bGwsImVtYWlsVmVyaWZpY2F0aW9uVG9rZW4iOiJmOGUwYjFlMzBlNWE4ODA4OTE0NDU1ODkzMTA3YmUzZTQ5ZDAwMDkwIiwicGFzc3dvcmRSZXNldFRva2VuIjpudWxsLCJpc0VtYWlsVmVyaWZpZWQiOnRydWUsInBhc3N3b3JkUmVzZXRUb2tlblZhbGlkRGF0ZVRpbWUiOm51bGwsInBhc3N3b3JkUmVzZXRUb2tlbkRhaWx5UmVxdWVzdENvdW50IjowfSwiaWF0IjoxNjk2NDczNjEyLCJleHAiOjE2OTY1MTY4MTJ9._4F38rhMeiJcHf-uSw6JCG408ADwQXi_0uKb4-VLuaI"

    const [favourite, setfavourite] = useState(false);
    const [fetching, setFetching] = useState(false)

    //Cyb3rsoft backend
    // const [events, setEvents] = useState<Event[]>([]);
    // const [favoritos, setFavoritos] = useState<Event[]>([]);
    // const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);s

    //MoshiMoshiBackend
    const [events, setEvents] = useState<EventoMoshi[]>([]);
    const [favoritos, setFavoritos] = useState<EventoMoshi[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<EventoMoshi[]>([]);


    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const filterEvent = events.filter((exp: EventoMoshi) =>
        exp.eventName.toLowerCase().includes(searchText.toLowerCase())
    );

    //LLAMADA A BACKEND CYB3RSOFT
    // const getEvents = async () => {
    //     fetch('https://expoactiva-nacional-395522.rj.r.appspot.com/events/')
    //         .then(async res => await res.json())
    //         .then(res => {
    //             setEvents(res)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             Alert.alert("Hubo un problema obteniendo la información",
    //                 "Intenta nuevamente en unos minutos",
    //                 [{ text: "OK", onPress: () => navigation.goBack() }])
    //         })
    //         .finally(() => setFetching(false))
    //     console.log('fetching over')
    // }

    //BACKEND MOSHI MOSHI
    // const getEvents = async () => {
    //     fetch('https://expoactivawebbackend.uc.r.appspot.com/event')
    //         .then(async res => await res.json())
    //         .then(res => {
    //             setEvents(res)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             Alert.alert("Hubo un problema obteniendo la información",
    //                 "Intenta nuevamente en unos minutos",
    //                 [{ text: "OK", onPress: () => navigation.goBack() }])
    //         })
    //         .finally(() => setFetching(false))
    //     console.log('fetching over')
    // }

    const getEvents = async () => {
        await fetch('https://expoactivawebbackend.uc.r.appspot.com/event', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
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

    const handleFavourite = (item: EventoMoshi) => {

        // Comprueba si el evento ya está en la lista de favoritos
        const isFavorite = favoritos.some((event) => event.idEvent === item.idEvent);

        if (!isFavorite) {
            // Si no está en la lista de favoritos, agrégalo
            setFavoritos([...favoritos, item]);
        }
        setfavourite(!favourite)

    }

    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    return ({
        loading,
        events,
        iconName,
        currentDay,
        favourite,
        colour,
        handleFavourite,
        filterEvent,
        setSearchText,
        fetching,
        handleSetFetching,
        getEvents,
        favoritos
    })
}
