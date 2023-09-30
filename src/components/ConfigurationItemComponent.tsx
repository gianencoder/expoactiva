
import React, { useContext } from 'react'
import { View, Text, Image, useWindowDimensions, ImageSourcePropType } from 'react-native'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { SeparatorComponent } from './SeparatorComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    title: string,
    image: any
    method: () => void
}

export const ConfigurationItemComponent = ({ title, image, method }: Props) => {
    const { width, height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...themeConfig.configScreen, backgroundColor: theme.colors.background }}>
            <TouchableOpacity onPress={method}>
                <View >
                    <View style={{ ...themeConfig.itemContainer }}>
                        <View style={themeConfig.item}>
                            {image}
                            <Text >
                                {title}
                            </Text>
                        </View>
                        <View>
                            <Image style={{ width: width / 30, height: height / 45, tintColor: 'black' }}
                                source={require('../assets/icons/right.arrow.png')} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <SeparatorComponent />
        </View>


    )
}
