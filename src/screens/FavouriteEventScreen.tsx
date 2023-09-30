import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { eventStyle } from '../theme/EventTheme'
import { MyColors } from '../theme/ColorsTheme'
import { FlatList } from 'react-native-gesture-handler'
import SearchBar from '../components/SearchBarComponent'
import { EventComponent } from '../components/EventComponent'
import { SeparatorComponent } from '../components/SeparatorComponent'
import { EventFunction } from '../functions/EventFunction'

export const FavouriteEventScreen = () => {
    const { favoritos } = EventFunction()
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={favoritos}
                keyExtractor={(item) => item._id.toString()} // Asumiendo que tienes una propiedad "id" única
                renderItem={({ item }) => (
                    <EventComponent event={item} />
                )}
            />
        </View>

    );

}
