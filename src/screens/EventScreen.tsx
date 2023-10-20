import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
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
import moment from 'moment';

export const EventScreen = () => {
    const { loading, filterEvent, setSearchText, fetching, handleSetFetching, handleAddFav, handleSelectItem } = EventFunction()
    const { theme } = useContext(ThemeContext);
    const { favorites } = useFavorites();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const eventDates = ['2024-03-12', '2024-03-13', '2024-03-14', '2024-03-15', '2024-03-16'];
    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };


    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const toggleDateFilter = (date) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(item => item !== date));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    const handleScroll = React.useCallback(() => {
        Keyboard.dismiss();
    }, []);

    const filteredEvents = filterEvent.filter((event) => {
        if (
            (!selectedFilters.length || selectedFilters.includes(event.type.toLowerCase())) &&
            (!selectedDates.length || selectedDates.includes(formatDate(event.dateHourStart)))
        ) {
            return true;
        }
        return false;
    });

    return (
        <View style={eventStyle.container} >
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos por nombre..." />
                </View>
                <View style={{ height: 40, alignItems: 'center' }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ height: 25, paddingHorizontal: 10, flexDirection: 'row', gap: 10 }}>
                            {eventDates.map(date => (

                                <TouchableOpacity
                                    key={date}
                                    onPress={() => toggleDateFilter(date)}
                                    style={{ justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                                    <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: selectedDates.includes(date) ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                        <Text style={{ textTransform: 'uppercase', color: selectedDates.includes(date) ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{moment(date).format('DD / MM')}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: 10 }}></View>
                <View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => toggleFilter('activa')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('activa') && '#BCDFB5', backgroundColor: selectedFilters.includes('activa') ? '#659B5A' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('activa') ? 'white' : theme.colors.text, }}>ACTIVA</Text>

                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('conferencia')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('conferencia') && '#D8AEAA', backgroundColor: selectedFilters.includes('conferencia') ? '#D8AEAA' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('conferencia') ? 'white' : theme.colors.text }}>CONFERENCIA</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('exhibitor')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('exhibitor') && '#9FC1F3', backgroundColor: selectedFilters.includes('exhibitor') ? '#9FC1F3' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('exhibitor') ? 'white' : theme.colors.text }}>EXPOSITOR</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('ganadera')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: !selectedFilters.includes('ganadera') && '#F7CF51', backgroundColor: selectedFilters.includes('ganadera') ? '#F7CF51' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('ganadera') ? 'white' : theme.colors.text }}>GANADERA</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {loading
                    ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
                    </View>
                    :
                    filterEvent.length > 0
                        ?

                        filteredEvents.length > 0 ?
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
                        :
                        <NotEventScreen text={'No hay eventos para mostrar'} extraoption={''} />
                }
            </View>
        </View >
    );
};
