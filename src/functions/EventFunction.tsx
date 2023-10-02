import React, { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EventFunction = () => {

    const navigation = useNavigation();
    let iconName = ''
    let colour = ''
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWRQZXJzb24iOjYsIm5hbWUiOiJGZWRlcmljbyBHdWlsbGVuIiwiZG9jdW1lbnQiOm51bGwsIm1haWwiOiJmZWRlcmljby5ndWlsbGVuQGVzdHVkaWFudGVzLnV0ZWMuZWR1LnV5IiwiYWdlIjpudWxsLCJyb2xlIjpudWxsLCJwbGF0Zm9ybSI6Im1haWwiLCJnb29nbGVJZCI6bnVsbCwicGljdHVyZSI6bnVsbCwicGFzc3dvcmQiOiIkMmIkMTAkQmpMZy4yYm9jYmZReTI3LjdtSzQzdVl5UFhDSmpwcjVmNi5JeTROR1Uyd1Y4LnRaWnd5OU8iLCJlbmFibGUiOnRydWUsImV4aGliaXRvcl9kZXNjcmlwdGlvbiI6bnVsbCwiZXhoaWJpdG9yX2ltYWdlIjpudWxsLCJlbWFpbFZlcmlmaWNhdGlvblRva2VuIjoiZjhlMGIxZTMwZTVhODgwODkxNDQ1NTg5MzEwN2JlM2U0OWQwMDA5MCIsInBhc3N3b3JkUmVzZXRUb2tlbiI6bnVsbCwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJwYXNzd29yZFJlc2V0VG9rZW5WYWxpZERhdGVUaW1lIjpudWxsLCJwYXNzd29yZFJlc2V0VG9rZW5EYWlseVJlcXVlc3RDb3VudCI6MH0sImlhdCI6MTY5NjIxODU3NiwiZXhwIjoxNjk2MjYxNzc2fQ.nFJ-y1NkYa7Hjy1ZT6hVrjYodTDYxKHYKk_wM5x5Q84"

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
