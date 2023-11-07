import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { eventStyle } from '../theme/EventTheme';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ThemeContext } from '../context/themeContext/ThemeContext';

import esLocale from 'date-fns/locale/es';
import { dateFormmater } from '../util/utils';

interface Props {
    event?: Event
    moshiEvent: EventoMoshi
    method: (id: number) => void
    selectEvent: (id: number) => void
    isFavorite: boolean
}

export const MoshiEventComponent = ({ event, moshiEvent, method, isFavorite, selectEvent, }: Props) => {
    const { theme } = useContext(ThemeContext);


    const [sTimeLeft, setsTimeLeft] = useState(formatDistanceToNow(new Date(moshiEvent.dateHourStart), { addSuffix: true, locale: esLocale }));
    const [fTimeLeft, setfTimeLeft] = useState(formatDistanceToNow(new Date(moshiEvent.dateHourEnd), { addSuffix: true, locale: esLocale }));

    useEffect(() => {
        const interval = setInterval(() => {
            setsTimeLeft(formatDistanceToNow(new Date(moshiEvent.dateHourStart), { addSuffix: true, locale: esLocale }));
            setfTimeLeft(formatDistanceToNow(new Date(moshiEvent.dateHourEnd), { addSuffix: true, locale: esLocale }));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [moshiEvent.dateHourStart, moshiEvent.dateHourEnd]);



    return (
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => selectEvent(moshiEvent.idEvent)}
            >
                <View style={{ ...eventStyle.event, padding: 10 }}>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                        {moshiEvent.picture === null ? (
                            <Image style={{ ...eventStyle.img, height: '100%', width: '100%' }} source={require('../assets/images/noPhoto.jpg')} />
                        ) : (
                            <Image style={{ borderRadius: 15, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', resizeMode: 'cover' }} source={{ uri: moshiEvent.picture.toString() }} />
                        )}
                    </View>
                    <View style={eventStyle.eventListTitle}>
                        <Text numberOfLines={2} style={{ ...eventStyle.titleTxt, color: theme.colors.text }}>{moshiEvent.eventName}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '100%' }}>{moshiEvent.type !== null && moshiEvent.type === 'EXHIBITOR' ? 'Expositor' : moshiEvent.type}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '70%' }}>{dateFormmater(moshiEvent.dateHourStart).day} {dateFormmater(moshiEvent.dateHourStart).dayNumber}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, textTransform: 'capitalize', width: '70%' }}>{dateFormmater(moshiEvent.dateHourStart).time} - {dateFormmater(moshiEvent.dateHourEnd).time} </Text>
                    </View>
                    <View style={eventStyle.eventListFavourite}>
                        <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} activeOpacity={.5} onPress={() => method(moshiEvent.idEvent)}>
                            <View style={{ height: 60, width: 60, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 40 }}>
                                <Ionicons style={{ position: 'absolute' }} name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'} size={24} color={isFavorite ? '#A50000' : theme.customColors.activeColor} />
                            </View>
                        </TouchableOpacity>


                        {sTimeLeft.includes('hace'.toLowerCase().trim()) && !fTimeLeft.includes('hace'.toLowerCase().trim())
                            ? <Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>EN CURSO</Text>
                            : fTimeLeft.includes('hace'.toLowerCase().trim()) && sTimeLeft.includes('hace'.toLowerCase().trim())
                                ? <Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>FINALIZADO</Text>
                                : <Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>{sTimeLeft}</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity >
        </View >
    );
};
