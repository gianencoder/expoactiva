import React, { useEffect, useRef, useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
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

    const [autoScroll, setAutoScroll] = useState(true);
    const scrollViewRef = useRef<Animated.ScrollView>(null);
    const { width } = useWindowDimensions()
    const size = width * 0.35
    const spacer = (width - size) / 2
    const [newData] = useState([{ key: 'spacer-left' }, ...data, { key: 'spacer-right' }])
    const x = useSharedValue(0)
    const currentIndex = useRef(1);

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            if (autoScroll) {
                x.value = event.contentOffset.x;
            } else {
                // Solo actualiza el valor de x sin desplazamiento automático
                x.value = event.contentOffset.x;
            }
        },
    });
    useEffect(() => {
        let timerId: any;

        const startAutoScroll = () => {
            timerId = setInterval(() => {
                if (currentIndex.current === newData.length - 1) {
                    // Si se alcanza la última imagen, cambia la dirección del desplazamiento
                    currentIndex.current = 0;
                    scrollViewRef.current?.scrollTo({
                        x: currentIndex.current * size,
                        animated: false,
                    });
                } else {
                    currentIndex.current++;
                    scrollViewRef.current?.scrollTo({
                        x: currentIndex.current * size,
                        animated: true,
                    });
                }
            }, 1500);
        };

        const stopAutoScroll = () => {
            clearInterval(timerId);
        };

        if (autoScroll) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }

        return () => {
            stopAutoScroll();
        };
    }, [autoScroll]);

    return (
        <Animated.ScrollView
            ref={scrollViewRef}
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
        overflow: 'hidden',
        borderRadius: 10,
    },
    img: {
        height: '100%',
        width: '100%',
        padding: 10
    }
});
