import { View } from 'react-native'
import React, { useContext } from 'react'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const CustomBackgroundComponent = ({ animatedIndex, style }: any) => {

    const { theme } = useContext(ThemeContext)
    const containerStyle = useAnimatedStyle(() => ({
        ...style,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: theme.colors.text,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        opacity: interpolate(
            animatedIndex.value,
            [1, 0], [1, 0.7],
            Extrapolation.CLAMP)
    }))




    return (
        <Animated.View style={{
            ...containerStyle,


        }} />
    )
}
