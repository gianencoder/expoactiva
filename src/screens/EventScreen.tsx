import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, Image, TouchableOpacity, Keyboard } from 'react-native';
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
import { NotEventScreen } from './NotEventScreen';

export const EventScreen = () => {
    const { loading, filterEvent, setSearchText, fetching, handleSetFetching, handleAddFav, handleSelectItem } = EventFunction()
    const { theme } = useContext(ThemeContext);
    const { favorites } = useFavorites();
    const [selectedFilters, setSelectedFilters] = useState([]);


    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const handleScroll = React.useCallback(() => {
        Keyboard.dismiss();
    }, []);

    const filteredEvents = filterEvent.filter(event => {
        if (selectedFilters.length === 0 || selectedFilters.includes(event.type.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <View style={eventStyle.container} >
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                </View>

                <View style={{ height: 25, paddingHorizontal: 10, flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ backgroundColor: 'black', justifyContent: 'center', width: 70, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Lunes 17</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ height: 40, paddingHorizontal: 10, justifyContent: 'center' }}>
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => toggleFilter('activa')} >
                                <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('activa') && '#BCDFB5', backgroundColor: selectedFilters.includes('activa') ? '#659B5A' : 'transparent' }}>
                                    <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('activa') ? 'white' : theme.colors.text, }}>ACTIVA</Text>
                                    {selectedFilters.includes('activa') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 15 }}></View>
                            <TouchableOpacity onPress={() => toggleFilter('conferencia')} >
                                <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('conferencia') && '#D8AEAA', backgroundColor: selectedFilters.includes('conferencia') ? '#D8AEAA' : 'transparent' }}>
                                    <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('conferencia') ? 'white' : theme.colors.text }}>CONFERENCIA</Text>
                                    {selectedFilters.includes('conferencia') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 15 }}></View>
                            <TouchableOpacity onPress={() => toggleFilter('exhibitor')} >
                                <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('exhibitor') && '#9FC1F3', backgroundColor: selectedFilters.includes('exhibitor') ? '#9FC1F3' : 'transparent' }}>
                                    <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('exhibitor') ? 'white' : theme.colors.text }}>EXPOSITOR</Text>
                                    {selectedFilters.includes('exhibitor') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 15 }}></View>
                            <TouchableOpacity onPress={() => toggleFilter('ganadera')} >
                                <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('ganadera') && '#F7CF51', backgroundColor: selectedFilters.includes('ganadera') ? '#F7CF51' : 'transparent' }}>
                                    <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('ganadera') ? 'white' : theme.colors.text }}>GANADERA</Text>
                                    {selectedFilters.includes('ganadera') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
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
                            onScrollBeginDrag={handleScroll}
                            keyboardShouldPersistTaps="always"
                            data={filteredEvents}
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
    );
};
