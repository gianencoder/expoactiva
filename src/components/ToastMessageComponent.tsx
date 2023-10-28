import React, { useContext, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import Animated, { SlideInLeft, SlideOutRight, withSpring } from 'react-native-reanimated';
import { MyColors } from '../theme/ColorsTheme';



export const ToastMessageComponent = ({ type, title, message, color, icon, visible }: any) => {

    const { theme } = useContext(ThemeContext)

    return (
        visible &&
        <Animated.View style={{
            position: 'absolute'
            , top: 10
            , width: '90%'
            , height: 80
            , backgroundColor: '#93B1A6'
            , borderRadius: 10
            , padding: 10
            , flexDirection: 'row'
            , alignItems: 'center'
            , gap: 15
            , overflow: 'hidden'
            , zIndex: 1
            , alignSelf: 'center'

        }}
            entering={SlideInLeft}
            exiting={SlideOutRight}
        >
            <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <AntDesign name="checkcircleo" size={32} color={MyColors.primary} />
            </View>

            <View style={{ flex: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.colors.text }}>{title}</Text>
                <Text style={{ fontSize: 17, color: theme.colors.text }}>{message}</Text>
            </View>


        </Animated.View>

    )
}
