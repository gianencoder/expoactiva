import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
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

                <View style={{ height: 20, paddingHorizontal: 10, flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                    <Text>Lunes 17</Text>
                    <Text>Martes 18</Text>
                    <Text>Miercoles 19</Text>
                    <Text>Jueves 20</Text>
                </View>

                <View style={{ height: 40, paddingHorizontal: 10, justifyContent: 'center' }}>
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}

                        >
                            <TouchableOpacity onPress={() => toggleFilter('ganadera')} >
                                <View style={{ gap: 10, paddingHorizontal: 10, height: 30, alignItems: 'center', backgroundColor: selectedFilters.includes('ganadera') ? '#87C776' : 'lightgray', borderRadius: 10, flexDirection: 'row' }}>
                                    <Text style={{ textAlign: 'center', color: selectedFilters.includes('ganadera') ? 'white' : '#4C4C4C', fontWeight: 'bold' }}>GANADERA</Text>
                                    {selectedFilters.includes('ganadera') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 15 }}></View>
                            <TouchableOpacity onPress={() => toggleFilter('conferencia')} >
                                <View style={{ gap: 10, paddingHorizontal: 10, height: 30, alignItems: 'center', backgroundColor: selectedFilters.includes('conferencia') ? '#D8AEAA' : 'lightgray', borderRadius: 10, flexDirection: 'row' }}>
                                    <Text style={{ textAlign: 'center', color: selectedFilters.includes('conferencia') ? 'white' : '#4C4C4C', fontWeight: 'bold' }}>CONFERENCIA</Text>
                                    {selectedFilters.includes('conferencia') && <Image style={{ height: 15, width: 15, tintColor: 'white' }} source={require('../assets/icons/x.png')} />}
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
