import React, { useEffect, useRef, useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ImageSourcePropType, ScrollView } from 'react-native';
import Animated,
{
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
} from 'react-native-reanimated';

interface props {
    data: []
}

export const CarouselComponent = ({ data }: props | any) => {

    const { width } = useWindowDimensions()
    const size = width * 0.5
    const spacer = (width - size) / 2
    const [newData] = useState([{ key: 'spacer-left' }, ...data, { key: 'spacer-right' }])
    const x = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    })
    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={size}
            scrollEventThrottle={16}
            decelerationRate={'normal'}
            centerContent
            onScroll={onScroll}
        >
            {newData.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 2) * size, (index - 1) * size, index * size],
                        [0.5, 1, 0.5]
                    )
                    return {
                        transform: [{ scale }],
                    }
                })

                if (!item.image) {
                    return <View style={{ width: spacer }} key={index} />
                }
                return (
                    <View style={{ width: size, padding: 10 }} key={index}>
                        <Animated.View style={[imgStyles.imgContainer, style]}>
                            <Image source={item.image} style={imgStyles.img} />
                        </Animated.View>
                    </View>
                )
            })}
        </Animated.ScrollView>
    )
}

const imgStyles = StyleSheet.create({

    imgContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },

    img: {
        width: '100%',
        height: '100%',

    }
});
function setCurrentIndex(index: number) {
    throw new Error('Function not implemented.');
}

