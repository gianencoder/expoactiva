import React, { useContext, useEffect, useState } from 'react'
import { View, RefreshControl, ActivityIndicator, Button, Text, Keyboard } from 'react-native'
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
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';



export const FavouriteEventScreen = () => {

    const { loading, fetching, handleSetFetching, removeEvent, events, handleSelectItem, reorderEventsWithFinishedLast } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites } = useFavorites()
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState<EventoMoshi[]>([])
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    useEffect(() => {
        // Al cargar el componente o al volver a él, actualizamos la lista de favoritos
        const favourites = events.filter(evento => favorites.includes(evento.idEvent));
        const ordererFavourites = reorderEventsWithFinishedLast(favourites);
        setList(ordererFavourites);
    }, [events, favorites]);

    const searchByName = events.filter((ev: EventoMoshi) =>
        ev.eventName.toLowerCase().includes(searchText.toLowerCase())
    );

    const onScrollBeginDrag = () => {
        Keyboard.dismiss()
    }

    searchByName.sort((a, b) => {
        const dateA = new Date(a.dateHourStart).getDate();
        const dateB = new Date(b.dateHourStart).getDate();
        return dateA - dateB;
    });

    const filteredList = list.filter((event) =>
        event.eventName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        list.length > 0
            ?
            <View style={eventStyle.container} >
                <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    <View style={{ width: '100%', marginVertical: 10, paddingVertical: 5, paddingHorizontal: 10, height: 45, backgroundColor: 'transparent' }}>
                        <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder={translation.favouriteScree.searchBarPlaceholder} />
                    </View>
                    {loading
                        ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
                        </View>
                        :
                        searchByName.length > 0 ?
                            <FlashList
                                onScrollBeginDrag={onScrollBeginDrag}
                                keyboardShouldPersistTaps="always"
                                data={filteredList}
                                keyExtractor={(event) => event.idEvent.toString()}
                                renderItem={({ item }) => <MoshiEventComponent
                                    moshiEvent={item} method={() => removeEvent(item.idEvent)}
                                    isFavorite={favorites.some(favorite => favorite === item.idEvent)}
                                    selectEvent={() => handleSelectItem(item.idEvent)} />

                                }
                                refreshControl={
                                    <RefreshControl
                                        refreshing={fetching}
                                        progressBackgroundColor={theme.colors.background}
                                        onRefresh={() => {
                                            handleSetFetching()

                                        }}
                                        colors={[theme.customColors.activeColor]} // for android
                                        tintColor={theme.customColors.activeColor} // for ios
                                    />
                                }
                                ItemSeparatorComponent={() => <SeparatorComponent />}
                                estimatedItemSize={100}
                            />
                            :
                            <View style={{ height: 120, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>{translation.favouriteScree.noEventsText}</Text>
                            </View>

                    }
                </View>
            </View >
            :
            <NotEventScreen text={translation.favouriteScree.noFavoritesText} extraoption={translation.favouriteScree.extraOptionText}></NotEventScreen>


    );

}
