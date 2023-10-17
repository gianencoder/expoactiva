import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { eventStyle } from '../theme/EventTheme';
import { Ionicons } from '@expo/vector-icons';
import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { EventFunction } from '../functions/EventFunction';

interface Props {
    event?: Event
    moshiEvent: EventoMoshi,
    method: (id: number) => void,
    selectEvent: (id: number) => void,
    isFavorite: boolean
}

export const MoshiEventComponent = ({ event, moshiEvent, method, isFavorite, selectEvent }: Props) => {

    const { theme } = useContext(ThemeContext)
    // const correctDate = format(new Date(moshiEvent.dateHourStart), 'p dd/MM/yyy');
    const { formatDateTime } = EventFunction()
    const [timeLeftTxt, settimeLeftTxt] = useState('');

    const [initTime, setInitTime] = useState(0)
    const [leftTime, setLeftTime] = useState(0)

    const [finished, setFinished] = useState(false)
    const [inProgress, setInProgress] = useState(false)

    const calculateTimeLeft = () => {

        const minutes = differenceInMinutes(new Date(moshiEvent.dateHourStart), new Date(Date.now()));
        const days = differenceInDays(new Date(moshiEvent.dateHourStart), new Date(Date.now()));
        const hours = differenceInHours(new Date(moshiEvent.dateHourStart), new Date(Date.now()));

        //Hora de comenzado el evento - hora actual
        const startEventTime = differenceInMinutes(new Date(moshiEvent.dateHourStart), new Date(Date.now()))

        //Hora de fin del evento - hora actual
        const endEventTime = differenceInMinutes(new Date(moshiEvent.dateHourEnd), new Date(Date.now()))



        if (endEventTime <= 0) {
            setFinished(true)
            setInProgress(false)
        } else if (endEventTime >= 0 && startEventTime <= 0) {
            setInProgress(true)
            setFinished(false)
            setLeftTime(endEventTime)

        } else {
            setInProgress(false)
        }


        if (minutes > 60 && minutes < 120) {
            setInitTime(hours);
            settimeLeftTxt('hora');



        } else if (minutes >= 120 && minutes < 1440) {
            setInitTime(hours);
            settimeLeftTxt('horas');
        }

        else if (minutes > 1440) {
            setInitTime(days);
            settimeLeftTxt('días');

        }
        else if (minutes < 2 && minutes > 0) {
            setInitTime(minutes);
            settimeLeftTxt('minuto');

        }
        else {
            setInitTime(minutes);
            settimeLeftTxt('minutos');
        }
    }


    //Renderiza el tiempo
    useEffect(() => {
        calculateTimeLeft(); // Establece el valor inicial al montar el componente
        const interval = setInterval(calculateTimeLeft, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => selectEvent(moshiEvent.idEvent)}
            >
                <View style={eventStyle.event}>
                    <View style={eventStyle.eventListImg}>
                        {moshiEvent.picture.toString() === '' ? <Image style={{ ...eventStyle.img, height: 120, width: 105 }} source={require('../assets/images/predio.expoactiva.jpg')} /> : <Image style={eventStyle.img} source={{ uri: moshiEvent.picture.toString() }} />}
                    </View>
                    <View style={eventStyle.eventListTitle}>
                        <Text numberOfLines={2} style={{ ...eventStyle.titleTxt, color: theme.colors.text }}>{moshiEvent.eventName}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '100%' }}>{moshiEvent.type}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '50%' }}>{formatDateTime(moshiEvent.dateHourStart).day} {formatDateTime(moshiEvent.dateHourStart).dayNumber}    {formatDateTime(moshiEvent.dateHourStart).time}</Text>
                    </View>
                    <View style={eventStyle.eventListFavourite}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => method(moshiEvent.idEvent)}>
                            <View style={{ height: 60, width: 60, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 40 }}>
                                <Ionicons style={{ position: 'absolute' }} name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'} size={23} color={isFavorite ? '#A50000' : theme.customColors.activeColor} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            {inProgress && (<Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>En curso</Text>)}
                            {initTime > 0 && (<Text style={{ ...eventStyle.titleMinutes, textAlign: 'left' }}>{`Inicia en ${initTime} ${timeLeftTxt}`}</Text>)}
                            {finished && (<Text style={{ ...eventStyle.titleMinutes }}> Finalizado</Text>)}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
