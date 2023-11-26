import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import * as Animatable from 'react-native-animatable';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CustomHandleComponent } from '../components/CustomHandleComponent';
import { CustomBackgroundComponent } from '../components/CustomBackgroundComponent';
import { eDetailTheme } from '../theme/EventDetailTheme';
import { DividerComponent } from '../components/DividerComponent';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import { EventFunction } from '../functions/EventFunction';
import { dateFormmater } from '../util/utils';
import { formatDistanceToNow } from 'date-fns';
import esLocale from 'date-fns/locale/es';

// Importa tu función de traducción
import { translate } from '../util/utils'
import { ThemeContext } from '../context/themeContext/ThemeContext';

const AnimatedDivider = Animated.createAnimatedComponent(DividerComponent);

export const EventDetails = () => {
    const { theme } = useContext(ThemeContext);
    const animatedIndex = useSharedValue(0);
    const snapPoints = useMemo(() => ['32%', '90%'], []);
    const { favorites } = useFavorites();
    const { handleAddFav } = EventFunction();
    const route = useRoute();
    const { eventName, type, dateHourStart, dateHourEnd, image, description, id }: any = route.params;
    const [sTimeLeft, setsTimeLeft] = useState(formatDistanceToNow(new Date(dateHourStart), { addSuffix: true, locale: esLocale }));
    const [fTimeLeft, setfTimeLeft] = useState(formatDistanceToNow(new Date(dateHourEnd), { addSuffix: true, locale: esLocale }));
    const [translatedEventName, setTranslatedEventName] = useState('');
    const [translatedType, setTranslatedType] = useState('');
    const [translatedDescription, setTranslatedDescription] = useState('');

    let isFavorite = favorites.find(event => event === id);

    useEffect(() => {
        translate(eventName, 'en')
            .then(translatedText => setTranslatedEventName(translatedText))
            .catch(error => {
                console.error('Error al traducir nombre del evento:', error);
                // Maneja el error según tus necesidades
            });

        translate(type, 'en')
            .then(translatedText => setTranslatedType(translatedText))
            .catch(error => {
                console.error('Error al traducir tipo del evento:', error);
                // Maneja el error según tus necesidades
            });

        translate(description, 'en')
            .then(translatedText => setTranslatedDescription(translatedText))
            .catch(error => {
                console.error('Error al traducir descripción del evento:', error);
                // Maneja el error según tus necesidades
            });
    }, [eventName, type, description]);

    useEffect(() => {
        const interval = setInterval(() => {
            setsTimeLeft(formatDistanceToNow(new Date(dateHourStart), { addSuffix: true, locale: esLocale }));
            setfTimeLeft(formatDistanceToNow(new Date(dateHourEnd), { addSuffix: true, locale: esLocale }));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [dateHourStart, dateHourEnd]);

    const nameStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            [theme.colors.text, theme.colors.text]
        ),
        marginBottom: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [0, 1]
        )
    }));

    const typeStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            [theme.colors.text, theme.colors.text]
        ),
        fontSize: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [25, 25]
        )
    }));

    const hourStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            [theme.colors.text, theme.colors.text]
        ),
        fontSize: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [22, 21.5]
        )
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [0, 1],
            Extrapolation.CLAMP
        )
    }));

    const startTime = dateHourStart;
    const endTime = dateHourEnd;
    const formattedStartTime = dateFormmater(startTime);
    const formattedEndTime = dateFormmater(endTime);

    return (
        <View style={{ flex: 1 }}>
            {image !== '' ? (
                <Image style={{ flex: 1 }} source={{ uri: image }} />
            ) : (
                <Image style={{ flex: 1 }} source={require('../assets/images/predio.expoactiva.jpg')} />
            )}

            <BottomSheet
                animatedIndex={animatedIndex}
                snapPoints={snapPoints}
                index={0}
                handleComponent={CustomHandleComponent}
                backgroundComponent={CustomBackgroundComponent}
            >
                <BottomSheetScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Animatable.View
                        style={{ paddingVertical: 40, paddingHorizontal: 30 }}
                        animation='fadeInUp'
                        delay={500}
                        easing='ease-in-out'
                        duration={400}
                    >
                        <View style={eDetailTheme.header}>
                            <View style={{ width: 220 }}>
                                <Animated.Text style={[eDetailTheme.title, nameStyle]}>
                                    {translatedEventName}
                                </Animated.Text>
                            </View>
                            <TouchableOpacity hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} onPress={() => handleAddFav(id)} style={{ ...eDetailTheme.favouriteButton, alignSelf: 'flex-start' }} ><Ionicons name={isFavorite ? 'ios-heart' : 'heart-outline'} size={24} color={isFavorite ? '#A50000' : theme.customColors.activeColor} /></TouchableOpacity>
                        </View>
                        <View style={eDetailTheme.header}>
                            <Animated.Text style={[eDetailTheme.type, typeStyle]}>{translatedType}</Animated.Text>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: -15, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Animated.Text style={[eDetailTheme.date, hourStyle]}>{formattedStartTime.day} {formattedStartTime.dayNumber}</Animated.Text>
                            <Animated.Text style={[eDetailTheme.date, hourStyle]}>
                                {sTimeLeft.includes('hace'.toLowerCase().trim()) && !fTimeLeft.includes('hace'.toLowerCase().trim())
                                    ? 'EN CURSO'
                                    : fTimeLeft.includes('hace'.toLowerCase().trim()) && sTimeLeft.includes('hace'.toLowerCase().trim())
                                        ? 'FINALIZADO'
                                        : sTimeLeft
                                }
                            </Animated.Text>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: -20 }}>
                            <Animated.Text style={[eDetailTheme.date, hourStyle]}>{formattedStartTime.time} - {formattedEndTime.time}</Animated.Text>
                        </View>
                    </Animatable.View>
                    <AnimatedDivider style={contentStyle} />
                    <Text style={{ paddingHorizontal: 27.5, fontSize: 20, color: '#6E6E6E', textAlign: 'left', marginTop: 15 }}>{translatedDescription}</Text>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
};

