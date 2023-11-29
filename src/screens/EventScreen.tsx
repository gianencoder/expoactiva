import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { EventFunction } from '../functions/EventFunction';
import SearchBar from '../components/SearchBarComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { FlashList } from "@shopify/flash-list";
import { MoshiEventComponent } from '../components/MoshiEventComponent';
import { RefreshControl } from 'react-native-gesture-handler';
import { useFavorites } from '../context/FavouriteContext/FavouritesContext';
import moment from 'moment';
import { filterFormmat, formatDate, loadTranslations, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';



export const EventScreen = () => {

    const { loading, filterEvent, setSearchText, fetching, handleSetFetching, handleAddFav, handleSelectItem } = EventFunction()
    const { theme } = useContext(ThemeContext);
    const { favorites } = useFavorites();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const filterDays = new Set();
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);

    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);



    filterEvent.forEach((e) => {
        const { dateHourStart } = e;
        const dayAndMonth = new Date(dateHourStart).toISOString().slice(0, 10);
        if (!filterDays.has(dayAndMonth)) {
            filterDays.add(dayAndMonth);
        }
    });

    const listDays = Array.from(filterDays);


    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const toggleDateFilter = (date) => {
        // console.log(date)
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
            (!selectedDates.length || selectedDates.includes(filterFormmat(event.dateHourStart)))
        ) {

            return true;
        }
        return false;
    });



    return (
        <View style={eventStyle.container} >
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ width: '100%', marginVertical: 10, paddingVertical: 5, paddingHorizontal: 10, height: 45, backgroundColor: 'transparent' }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder={translation.eventScreen.searchPlaceholder} />
                </View>
                <View style={{ height: 40, alignItems: 'center' }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 5, paddingHorizontal: 10 }}>
                            {listDays.map(date => (

                                <TouchableOpacity
                                    key={date}
                                    onPress={() => toggleDateFilter(date)}
                                    style={{ justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                                    <View style={{ ...eventStyle.typeFilterView, borderWidth: 0, backgroundColor: selectedDates.includes(date) ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                        <Text style={{ textTransform: 'uppercase', color: selectedDates.includes(date) ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{moment(date).format('DD / MM')}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => toggleFilter('activa')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: selectedFilters.includes('activa') ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('activa') ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{translation.eventScreen.active}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('conferencia')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: selectedFilters.includes('conferencia') ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('conferencia') ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{translation.eventScreen.conference}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('exhibitor')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: selectedFilters.includes('exhibitor') ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('exhibitor') ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{translation.eventScreen.exhibitor}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity onPress={() => toggleFilter('ganadera')} >
                            <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: selectedFilters.includes('ganadera') ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                <Text style={{ ...eventStyle.typeFilterText, color: selectedFilters.includes('ganadera') ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{translation.eventScreen.livestock}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {loading
                    ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
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
                                    isFavorite={favorites.some(favorite => favorite === item.idEvent)}
                                    selectEvent={() => handleSelectItem(item.idEvent)}
                                />}

                                refreshControl={
                                    <RefreshControl
                                        refreshing={loading}
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
                                <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>{translation.eventScreen.noEvents}</Text>
                            </View>

                        :
                        <View style={{ height: 120, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>{translation.eventScreen.noEvents}</Text>
                        </View>
                }
            </View>
        </View >
    );
};


