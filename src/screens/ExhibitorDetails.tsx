import React, { useContext, useMemo } from 'react'
import { View } from '@motify/components'
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import * as Animatable from 'react-native-animatable'
import Animated, { Extrapolation, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { CustomHandleComponent } from '../components/CustomHandleComponent'
import { CustomBackgroundComponent } from '../components/CustomBackgroundComponent'
import { eDetailTheme } from '../theme/EventDetailTheme'
import { DividerComponent } from '../components/DividerComponent'
import { SectionHeader } from '../components/SectionHeader'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';
import { exhibitorTheme } from '../theme/ExhibitorTheme'
import { ExhibitorFunction } from '../functions/ExhibitorFunction'

interface Props {
    Event: EventoMoshi
}

const AnimatedDivider = Animated.createAnimatedComponent(DividerComponent)
export const ExhibitorDetails = () => {

    const { theme } = useContext(ThemeContext)
    const animatedIndex = useSharedValue(0)
    const snapPoints = useMemo(() => ['32%', '80%'], [])
    const { goSite, showInMap, callPhone } = ExhibitorFunction()
    const route = useRoute()
    const {
        id
        , name
        , tel
        , image
        , logo
        , description
        , type
        , standId
        , webPage
        , longitude
        , latitude

    }: any = route.params

    // let isFavorite = favorites.find(event => event.idEvent === id)

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
    }))

    const typeStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            ['gray', 'gray']
        ),
        fontSize: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [25, 25]
        )
    }))

    const standStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            ['gray', 'gray']
        ),
        fontSize: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [25, 25]
        ),
    }))

    const telStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedIndex.value,
            [0, 0.8],
            [theme.colors.text, theme.colors.text]
        ),
        fontSize: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [8, 9]
        ),
    }))


    const imageStyle = useAnimatedStyle(() => ({

        width: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [8, 9]
        ),

        height: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [8, 9]
        )

    }))

    const contentStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 0.08],
            [0, 1],
            Extrapolation.CLAMP
        )
    }))


    return (

        <View style={{ flex: 1 }}>
            {logo && logo !== null && logo !== '' ? <Image style={{ flex: 1, resizeMode: 'stretch' }} source={{ uri: logo }} /> : <View />}
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
                        <View style={{ ...eDetailTheme.header, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 220 }}>
                                <Animated.Text style={[eDetailTheme.title, nameStyle]}>{name}</Animated.Text>
                            </View>
                            {/* <TouchableOpacity onPress={() => console.log('')} style={{ ...eDetailTheme.favouriteButton, alignSelf: 'flex-start' }} ><Ionicons name={'ios-heart'} size={24} color={'#A50000'} /></TouchableOpacity> */}
                        </View>
                        <View style={eDetailTheme.header}>
                            <Animated.Text style={[eDetailTheme.type, typeStyle]}>{type}</Animated.Text>
                            <Animated.Text style={[eDetailTheme.type, standStyle]}>stand: {standId}</Animated.Text>
                        </View>

                    </Animatable.View>
                    <AnimatedDivider style={contentStyle} />
                    <View style={exhibitorTheme.links}>


                        {webPage &&
                            <View style={exhibitorTheme.iconView}>
                                <Animated.Image style={[imageStyle, { ...exhibitorTheme.icons, tintColor: theme.customColors.activeColor }]} source={require('../assets/icons/web-page.png')} />
                                <Animated.Text onPress={() => goSite(webPage)} style={[{ ...eDetailTheme.date, textTransform: 'none', textDecorationLine: 'underline' }, telStyle]}> Sitio web </Animated.Text>
                            </View>
                        }
                        {tel &&
                            <View style={exhibitorTheme.iconView}>
                                <Animated.Image style={[imageStyle, { ...exhibitorTheme.icons, tintColor: theme.customColors.activeColor }]} source={require('../assets/icons/tel.png')} />
                                <Animated.Text onPress={() => callPhone(tel)} style={[eDetailTheme.date, telStyle]}> {tel} </Animated.Text>
                            </View>
                        }

                    </View>

                    <View style={exhibitorTheme.buttonView}>

                        {image && image !== null && image !== '' ? <Image source={{ uri: image }} style={{ height: '90%', width: '90%', borderRadius: 10, resizeMode: 'stretch' }} /> : <View />}
                        {/* <TouchableOpacity onPress={() => showInMap(id)} activeOpacity={0.1} style={exhibitorTheme.buttonMap}>
                            <Text style={exhibitorTheme.textMap}>Ver en mapa</Text>
                        </TouchableOpacity> */}
                    </View>
                    <SectionHeader title={'Descripción'} containerStyle={styles.sectionHeader} titleStyle={{ ...styles.sectionTitle, color: theme.colors.text }} onPress={undefined} />
                    <Text style={{ paddingHorizontal: 30, fontSize: 20, color: 'gray', textAlign: 'justify' }}>{description !== '' ? description : 'No tiene descripción'}</Text>
                </BottomSheetScrollView>
            </BottomSheet>

        </View>

    )
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    sectionTitle: {

    }
})
