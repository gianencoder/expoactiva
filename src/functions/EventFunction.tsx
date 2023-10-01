import React, { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EventFunction = () => {

    let iconName = ''
    let colour = ''

    const [favourite, setfavourite] = useState(false);
    const [fetching, setFetching] = useState(false)
    const navigation = useNavigation();

    const [favoritos, setFavoritos] = useState<Event[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);

    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const filterEvent = events.filter((exp: any) =>
        exp.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const getEvents = async () => {
        fetch('https://expoactiva-nacional-395522.rj.r.appspot.com/events/')
            .then(async res => await res.json())
            .then(res => {
                setEvents(res)
                setLoading(false)
            })
            .catch(err => {
                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "OK", onPress: () => navigation.goBack() }])
            })
            .finally(() => setFetching(false))
        console.log('fetching over')
    }
    useEffect(() => {
        getEvents()
    }, [fetching])



    const handleSetFetching = () => {
        setFetching(true)
    }

    const handleFavourite = (item: Event) => {

        // Comprueba si el evento ya está en la lista de favoritos
        const isFavorite = favoritos.some((event) => event._id === item._id);

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
