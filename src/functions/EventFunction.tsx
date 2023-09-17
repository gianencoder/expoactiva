import React, { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EventFunction = () => {


    const [favourite, setfavourite] = useState(true);
    let iconName = ''
    let color = MyColors.primary
    const [fetching, setFetching] = useState(false)
    const navigation = useNavigation();
    const [events, setEvents] = useState<Event[]>([]);
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
                if (res.status === 200) {
                    console.log('200')
                }
            })
            .catch(err => {
                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "OK", onPress: () => navigation.goBack() }])
            })
            .finally(() => setFetching(false))
    }

    useEffect(() => {
        getEvents();
    }, []);


    const handleSetFetching = () => { setFetching(true) }

    // const handleFavourite = () => {
    //     setfavourite(!favourite)
    // }

    // if (favourite) {
    //     iconName = 'ios-heart-outline'
    //     color
    // } else {
    //     iconName = 'ios-heart-sharp'
    //     color = MyColors.hearth
    // }
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    return ({
        loading,
        events,
        iconName,
        currentDay,
        favourite,
        color,
        // handleFavourite,
        filterEvent,
        setSearchText,
        fetching,
        handleSetFetching,
        getEvents
    })
}
