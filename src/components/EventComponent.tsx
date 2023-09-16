import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { eventStyle } from '../theme/EventTheme';
import { Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';

interface Props {
    event: Event;
    iconName: string;
    color: string;
    method: () => void;
}

export const EventComponent = ({ event, iconName, color, method }: Props) => {
    const correctDate = format(new Date(event.date), 'p dd/MM/yyyy');
    const [timeLeft, settimeLeft] = useState(0);
    const [timeLeftTxt, settimeLeftTxt] = useState('');

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
        <View>
            <View style={{ backgroundColor: MyColors.sparator, height: 1, borderRadius: 150 }} />
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
                    <View>
                        <TouchableOpacity onPress={method}>
                            <Ionicons name={iconName} size={23} color={color} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={eventStyle.titleMinutes}>{correctDate.toString()}</Text>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: MyColors.sparator, height: 1, borderRadius: 150 }} />
        </View>
    );
};
