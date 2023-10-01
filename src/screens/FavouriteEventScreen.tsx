import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { EventComponent } from '../components/EventComponent'

import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import SearchBar from '../components/SearchBarComponent'
import { MyColors } from '../theme/ColorsTheme'
import { SeparatorComponent } from '../components/SeparatorComponent'

export const FavouriteEventScreen = () => {
    const { favoritos } = EventFunction()
    const { theme } = useContext(ThemeContext)

    return (
        <View style={eventStyle.container} >

            <Text> {JSON.stringify(favoritos)}</Text>

        </View >

    );

}
