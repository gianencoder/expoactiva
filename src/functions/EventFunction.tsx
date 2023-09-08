import { useEffect, useState } from 'react'
import { MyColors } from '../theme/ColorsTheme';
import { format } from 'date-fns';

export const EventFunction = () => {
    const [datos, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            console.log('Error fetching data:', error);
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

    })
}
