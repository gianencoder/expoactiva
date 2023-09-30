import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { eventStyle } from '../theme/EventTheme';
import { Ionicons } from '@expo/vector-icons';
import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';
import { EventFunction } from '../functions/EventFunction';


interface Props {
    event: Event;
}

export const EventComponent = ({ event }: Props) => {

    const correctDate = format(new Date(event.date), 'p dd/MM/yyyy');
    const [timeLeft, settimeLeft] = useState(0);
    const [timeLeftTxt, settimeLeftTxt] = useState('');
    const { handleFavourite, iconName, favourite } = EventFunction()

    const calculateTimeLeft = () => {
        const minutes = differenceInMinutes(new Date(event.date), new Date(Date.now()));
        const days = differenceInDays(new Date(event.date), new Date(Date.now()));
        const hours = differenceInHours(new Date(event.date), new Date(Date.now()));

        if (minutes > 60 && minutes < 1440) {
            settimeLeft(hours);
            settimeLeftTxt('horas');
        } else if (minutes > 1440) {
            settimeLeft(days);
            settimeLeftTxt('días');
        } else if (minutes < 2 && minutes > 0) {
            settimeLeft(minutes);
            settimeLeftTxt('minuto aproximadamente');
        }
        else {
            settimeLeft(minutes);
            settimeLeftTxt('minutos aproximadamente');
        }
    };

    useEffect(() => {
        calculateTimeLeft(); // Establece el valor inicial al montar el componente
        const interval = setInterval(calculateTimeLeft, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log('Estoy presionando')}
                onLongPress={() => console.log('Presione largo')}
            >
                <View style={eventStyle.event}>
                    <View style={eventStyle.eventListImg}>
                        <Image style={eventStyle.img} source={{ uri: `https://picsum.photos/id/${250}/500/500` }} />
                    </View>
                    <View style={eventStyle.eventListTitle}>
                        <Text style={eventStyle.titleTxt}>{event.title}</Text>
                        {timeLeft <= 0 ? (
                            <Text style={eventStyle.titleMinutes}>Finalizado</Text>
                        ) : (
                            <Text style={eventStyle.titleMinutes}>{`${timeLeft} ${timeLeftTxt}`}</Text>
                        )}
                    </View>
                    <View style={eventStyle.eventListFavourite}>
                        <TouchableOpacity onPress={() => handleFavourite}>
                            <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons style={{ position: 'absolute' }} name={iconName} size={23} color={favourite ? 'red' : 'black'} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={eventStyle.titleMinutes}>{correctDate.toString()}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
