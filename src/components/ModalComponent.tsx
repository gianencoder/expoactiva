import React, { useCallback, useContext, useImperativeHandle } from 'react'
import { Dimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { authStyle } from '../theme/AuthTheme'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { ThemeContext } from '../context/themeContext/ThemeContext'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type ModalProps = { children: React.ReactNode }
export type ModalRefProps = {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}

export const ModalComponent = React.forwardRef<ModalRefProps, ModalProps>(({ children }, ref) => {

    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 300
    const middle = -SCREEN_HEIGHT / 1.8
    const { theme } = useContext(ThemeContext)
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const active = useSharedValue(false)


    const scrollTo = useCallback((destination: number) => {

        'worklet'
        active.value = destination !== 0
        translateY.value = withSpring(destination, { damping: 50 })
    }, [])
    const isActive = useCallback(() => {
        return active.value
    }, [])


    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
        scrollTo,
        isActive
    ])


    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value > -SCREEN_HEIGHT / 3) {
                scrollTo(0)
            } else if (translateY.value > -SCREEN_HEIGHT / 1.5) {
                scrollTo(middle)
            } else if (translateY.value < -SCREEN_HEIGHT / 2) {
                scrollTo(MAX_TRANSLATE_Y)
            }

        })

    const modalSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })
    return (

        <GestureDetector gesture={gesture}>
            <Animated.View style={[{ ...authStyle.modalCard, backgroundColor: theme.colors.background, shadowColor: theme.colors.text, borderColor: theme.customColors.subtitles }, modalSheetStyle]}>
                <View style={{ ...authStyle.line, backgroundColor: theme.customColors.activeColor }} />
                {children}
            </Animated.View>
        </GestureDetector>

    )
})