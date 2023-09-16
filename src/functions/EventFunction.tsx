import React, { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EventFunction = () => {

    const navigation = useNavigation();
    const [datos, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const filterEvent = datos.filter((exp: any) =>
        exp.title.toLowerCase().includes(searchText.toLowerCase())
    );
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://expoactiva-nacional-395522.rj.r.appspot.com/events/');
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            setTimeout(() => {
                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "OK", onPress: () => navigation.goBack() }])
                setLoading(false)
            }, 15000);
        }
    };

    const [favourite, setfavourite] = useState(true);
    let iconName = ''
    let color = MyColors.primary

    const handleFavourite = () => {
        setfavourite(!favourite)
    }

    if (favourite) {
        iconName = 'ios-heart-outline'
        color
    } else {
        iconName = 'ios-heart-sharp'
        color = MyColors.hearth
    }
    const currentDay = format(Date.now(), 'dd-MM-yyyy HH:mm')
    return ({
        loading,
        datos,
        iconName,
        currentDay,
        favourite,
        color,
        handleFavourite,
        filterEvent,
        setSearchText


    })
}
function componentWillMount() {
    throw new Error('Function not implemented.');
}

