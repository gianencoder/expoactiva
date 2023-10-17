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
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import { useNavigation } from '@react-navigation/native'
import { NotEventScreen } from './NotEventScreen';




export const EventScreen = () => {

    const navigation = useNavigation()
    const { loading,
        filterEvent,
        setSearchText,
        fetching,
        handleSetFetching,
        handleAddFav,
        handleSelectItem } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites } = useFavorites()


    filterEvent.sort((a, b) => {
        const dateA = new Date(a.dateHourStart).getDate();
        const dateB = new Date(b.dateHourStart).getDate();

        return dateA - dateB;
    });


    return (

        <View style={eventStyle.container} >
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                </View>

                {loading
                    ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
                    </View>
                    :


                    filterEvent.length > 0
                        ?
                        <FlashList
                            data={filterEvent}
                            keyExtractor={(event) => event.idEvent.toString()}
                            renderItem={({ item }) => <MoshiEventComponent
                                moshiEvent={item}
                                method={() => handleAddFav(item.idEvent)}
                                isFavorite={favorites.some(favorite => favorite.idEvent === item.idEvent)}
                                selectEvent={() => handleSelectItem(item.idEvent)}

                            />}
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
                        <NotEventScreen text={'No hay eventos para mostrar'} extraoption={''} />
                }
            </View>
        </View >
    )
}


