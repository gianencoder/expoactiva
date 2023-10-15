import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { EventFunction } from '../functions/EventFunction';
import SearchBar from '../components/SearchBarComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { FlashList } from "@shopify/flash-list";
import { MoshiEventComponent } from '../components/MoshiEventComponent';
import { RefreshControl } from 'react-native-gesture-handler';
import { FavoritesProvider, useFavorites } from '../context/FavouriteContext/FavouritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const EventScreen = () => {

    const { loading, filterEvent, setSearchText, fetching, handleSetFetching } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites, addFavorite, removeFavorite } = useFavorites()

    const handleAddFav = (id: number) => {
        const selectedEvent = filterEvent.find((event) => event.idEvent === id)
        const isFavorite = favorites.find(event => event.idEvent === id)

        if (!selectedEvent && isFavorite) {

        }
        if (selectedEvent && !isFavorite) {
            addFavorite(selectedEvent)
            console.log("Evento con el id ", id, "agregado")
        } else {
            removeFavorite(id)
        }
    }
    return (
        <View style={eventStyle.container} >
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }}
                />

            </View> :
                <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                        <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                    </View>
                    <FlashList
                        data={filterEvent}
                        keyExtractor={(event) => event.idEvent.toString()}
                        renderItem={({ item }) => <MoshiEventComponent moshiEvent={item} method={() => handleAddFav(item.idEvent)} isFavorite={favorites.some(favorite => favorite.idEvent === item.idEvent)} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={fetching}
                                progressBackgroundColor={theme.colors.background}
                                onRefresh={handleSetFetching}
                                colors={[theme.customColors.activeColor]} // for android
                                tintColor={theme.customColors.activeColor} // for ios
                            />
                        }
                        ItemSeparatorComponent={() => <SeparatorComponent />}
                        estimatedItemSize={100}
                    />
                </View>
            }

        </View >
    )
}


