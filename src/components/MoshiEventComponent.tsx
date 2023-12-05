import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { eventStyle } from '../theme/EventTheme';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ThemeContext } from '../context/themeContext/ThemeContext';

import esLocale from 'date-fns/locale/es';
import { dateFormmater, loadTranslations, translate, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';

interface Props {
    event?: Event
    moshiEvent: EventoMoshi
    method: (id: number) => void
    selectEvent: (id: number) => void
    isFavorite: boolean
}

export const MoshiEventComponent = ({ event, moshiEvent, method, isFavorite, selectEvent, }: Props) => {
    const { theme } = useContext(ThemeContext);
    const [imageLoader, setImageLoader] = useState(true)
    const { languageState } = useLanguage();
    const { language } = languageState
    const [translatedEventName, setTranslatedEventName] = useState('');
    const [translatedType, setTranslatedType] = useState('');
    const [translateDay, setTranslateDay] = useState('')
    const [translation, setTranslation] = useState(translations.es);
    const [loading, setLoading] = useState(false)
    const [translateDate, setTranslateDate] = useState('')
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);
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

    useEffect(() => {
        const fetchTranslations = async () => {
            setLoading(true)
            try {
                const translatedEventName = await translate(moshiEvent.eventName, language);
                const translatedType = await translate(moshiEvent.type, language);
                const date = await translate(sTimeLeft, language)
                const day = await translate(dateFormmater(moshiEvent.dateHourStart).day === 'martes' ? 'Tuesday' : dateFormmater(moshiEvent.dateHourStart).day, language)

                setTranslatedEventName(translatedEventName);
                setTranslatedType(translatedType);
                setTranslateDay(day)
                setTranslateDate(date)
            } catch (error) {
                console.log('Error translating:', error);
                // En caso de error, asignar el valor original
                setTranslatedEventName(moshiEvent.eventName);
                setTranslateDate(sTimeLeft)
                setTranslatedType(moshiEvent.type);
                setTranslateDay(dateFormmater(moshiEvent.dateHourStart).day)
            } finally {
                setLoading(false);
            }
        };

        if (language) {
            fetchTranslations();
        }
    }, [language, moshiEvent.eventName, moshiEvent.type]);


    return (
        <View style={{ width: '100%', height: 'auto' }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => selectEvent(moshiEvent.idEvent)}
            >
                <View style={{ ...eventStyle.event, padding: 10 }}>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                        {imageLoader &&
                            <ActivityIndicator style={{ flex: 1, position: 'absolute' }} color={theme.customColors.activeColor} />
                        }
                        {moshiEvent.picture === null
                            ? <Image

                                style={{ ...eventStyle.img, height: '100%', width: '100%' }}
                                source={require('../assets/images/noPhoto.jpg')} />
                            :

                            moshiEvent.picture == ''
                                ?
                                <Image

                                    style={{ borderRadius: 15, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', resizeMode: 'cover' }}
                                    source={{ uri: `https://picsum.photos/id/5${moshiEvent.idEvent}/500/500` }} />
                                : <Image
                                    style={{ borderRadius: 15, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', resizeMode: 'cover' }}
                                    source={{ uri: moshiEvent.picture.toString() }}
                                    onLoadStart={() => setImageLoader(true)}
                                    onLoadEnd={() => setImageLoader(false)}
                                />
                        }
                    </View>


                    <View style={eventStyle.eventListTitle}>
                        <Text numberOfLines={2} style={{ ...eventStyle.titleTxt, color: theme.colors.text }}>{loading ? moshiEvent.eventName : translatedEventName}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '100%' }}>{moshiEvent.type !== null && loading ? moshiEvent.type : translatedType}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, width: '78%' }}>{loading ? dateFormmater(moshiEvent.dateHourStart).day : translateDay} {dateFormmater(moshiEvent.dateHourStart).dayNumber}</Text>
                        <Text style={{ ...eventStyle.titleMinutes, textTransform: 'capitalize', width: '70%' }}>{dateFormmater(moshiEvent.dateHourStart).time} - {dateFormmater(moshiEvent.dateHourEnd).time} </Text>
                    </View>
                    <View style={eventStyle.eventListFavourite}>
                        <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} activeOpacity={.5} onPress={() => method(moshiEvent.idEvent)}>
                            <View style={{ height: 60, width: 60, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 40 }}>
                                <Ionicons style={{ position: 'absolute' }} name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'} size={24} color={isFavorite ? '#A50000' : theme.customColors.activeColor} />
                            </View>
                        </TouchableOpacity>


                        {sTimeLeft.includes('hace'.toLowerCase().trim()) && !fTimeLeft.includes('hace'.toLowerCase().trim())
                            ? <Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>{translation.eventDetails.enCurso}</Text>
                            : fTimeLeft.includes('hace'.toLowerCase().trim()) && sTimeLeft.includes('hace'.toLowerCase().trim())
                                ? <Text style={{ ...eventStyle.titleMinutes, textAlign: 'right' }}>{translation.eventDetails.finalizado}</Text>
                                : <Text numberOfLines={2} style={{ ...eventStyle.titleMinutes, textAlign: 'right', width: 100 }}>{loading ? sTimeLeft : translateDate}</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity >
        </View >
    );
};
