
import React, { ReactElement, useContext } from 'react'
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { SeparatorComponent } from './SeparatorComponent'

interface Props {
    title: string,
    image: any
    method?: () => void,
    modal?: ReactElement<any, any>
}

export const ConfigurationItemComponent = ({ title, image, method }: Props) => {
    const { width, height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    return (
        <TouchableOpacity onPress={method}>
            <View >
                <View style={{ ...themeConfig.itemContainer }}>
                    <View style={themeConfig.item}>
                        {image}
                        <Text style={{ color: theme.colors.text }}>
                            {title}
                        </Text>
                    </View>
                    <View>
                        <Image style={{ width: width / 30, height: height / 45, tintColor: theme.customColors.iconColor }}
                            source={require('../assets/icons/right.arrow.png')} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
