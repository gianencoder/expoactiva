import React, { useContext, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import Animated, { SlideInLeft, SlideOutRight, withSpring } from 'react-native-reanimated';
import { MyColors } from '../theme/ColorsTheme';



export const ToastMessageComponent = ({ height, width, iconColor = 'white', textColor = 'white', title, message, backgroundColor = 'green', iconSize = 30, iconName = "checkcircleo", visible, fontSize = 18 }: any) => {

    return (
        visible &&
        <Animated.View style={{
            position: 'absolute'
            , top: 10
            , width: width
            , height: height
            , backgroundColor: backgroundColor
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
                <AntDesign name={iconName} size={iconSize} color={iconColor} />
            </View>

            <View style={{ flex: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: fontSize, color: textColor }}>{title}</Text>
                <Text style={{ fontSize: 17, color: textColor }}>{message}</Text>
            </View>


        </Animated.View>

    )
}
