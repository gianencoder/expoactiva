import React, { useContext, useEffect } from 'react'
import { View, RefreshControl, ActivityIndicator, Button } from 'react-native'
import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import SearchBar from '../components/SearchBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoshiEventComponent } from '../components/MoshiEventComponent';
import { FlashList } from '@shopify/flash-list';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { FavoritesProvider, useFavorites } from '../context/FavouriteContext/FavouritesContext';



export const FavouriteEventScreen = () => {

    const { loading, setSearchText, fetching, handleSetFetching } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites, removeFavorite } = useFavorites()


    const removeEvent = (id: number) => {
        const canRemove = favorites.find(e => e.idEvent === id);

        if (!canRemove) {
            console.error
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
                        data={favorites}
                        keyExtractor={(event: EventoMoshi) => event.idEvent.toString()}
                        renderItem={({ item }) => <MoshiEventComponent moshiEvent={item} method={() => removeEvent(item.idEvent)} isFavorite={favorites.some(favorite => favorite.idEvent === item.idEvent)} />}
                        // onRefresh={() => handleSetFetching}
                        // refreshing={fetching}
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
    );

}
