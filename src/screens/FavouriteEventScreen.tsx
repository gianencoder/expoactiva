import React, { useContext, useEffect, useState } from 'react'
import { View, RefreshControl, ActivityIndicator, Button, Text } from 'react-native'
import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import SearchBar from '../components/SearchBarComponent';
import { MoshiEventComponent } from '../components/MoshiEventComponent';
import { FlashList } from '@shopify/flash-list';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import { NotEventScreen } from './NotEventScreen';



export const FavouriteEventScreen = () => {

    const { loading, fetching, handleSetFetching } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites } = useFavorites()
    const { removeEvent, handleSelectItem } = EventFunction()
    const [searchText, setSearchText] = useState('');

    const filterEvent = favorites.filter((ev: EventoMoshi) =>
        ev.eventName.toLowerCase().includes(searchText.toLowerCase())
    );

    filterEvent.sort((a, b) => {
        const dateA = new Date(a.dateHourStart).getDate();
        const dateB = new Date(b.dateHourStart).getDate();
        return dateA - dateB;
    });

    return (

        favorites.length > 0
            ?
            <View style={eventStyle.container} >
                <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                        <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar nombre del evento..." />
                    </View>
                    {loading
                        ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
                        </View>
                        :
                        filterEvent.length > 0 ?
                            <FlashList
                                data={filterEvent}
                                keyExtractor={(event: EventoMoshi) => event.idEvent.toString()}
                                renderItem={({ item }) => <MoshiEventComponent
                                    moshiEvent={item} method={() => removeEvent(item.idEvent)}
                                    isFavorite={favorites.some(favorite => favorite.idEvent === item.idEvent)}
                                    selectEvent={() => handleSelectItem(item.idEvent)} />

                                }

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
                            :
                            <View style={{ height: 120, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>No hay eventos para mostrar</Text>
                            </View>

                    }
                </View>
            </View >
            :
            <NotEventScreen text={'No has agregado ningún favorito'} extraoption={'Presiona aquí para agregar...'}></NotEventScreen>


    );

}
