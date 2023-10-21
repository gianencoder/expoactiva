import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from '../theme/GlobalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { AnimatedFlashList, FlashList } from '@shopify/flash-list'
import { ExhibitorComponent } from '../components/ExhibitorComponent'
import { SeparatorComponent } from '../components/SeparatorComponent'
import { ExhibitorFunction } from '../functions/ExhibitorFunction'
import SearchBar from '../components/SearchBarComponent';
import { eventStyle } from '../theme/EventTheme'

export const ExhibitorScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { exhibitor, setSearchText, filter, selectExhibitor } = ExhibitorFunction()
    const [types, setTypes] = useState([])

    const tiposUnicos = new Set();

    filter.forEach(ex => {
        tiposUnicos.add(ex.type)
    })

    const listType = Array.from(tiposUnicos)


    const toggleFilter = (t) => {

        if (types.includes(t)) {

            setTypes(types.filter(item => item.toLowerCase() !== t.toLowerCase()));
        } else {
            setTypes([...types, t]);
        }

    };

    const filterExhibitor = filter.filter((ex) => {
        return !types.length || types.map(e => e.toLowerCase()).includes(ex.type.toLowerCase())
    });

    filterExhibitor.sort((a, b) => {
        const ex1 = a.name.toUpperCase()
        const ex2 = b.name.toUpperCase()

        if (ex1 < ex2) {
            return -1;
        }
        if (ex1 > ex2) {
            return 1;
        }
        return 0;
    })


    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 5 }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar nombre o número de stand..." />
                    <View style={{ flexDirection: 'row', gap: 10 }}>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View style={{ height: 25, paddingHorizontal: 10, flexDirection: 'row', gap: 10 }}>
                                {listType.map(t => (
                                    <TouchableOpacity
                                        key={t}
                                        onPress={() => toggleFilter(t)}
                                        style={{ justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                                        <View style={{ ...eventStyle.typeFilterView, borderColor: theme.currentTheme === 'dark' ? 'lightgray' : 'black', backgroundColor: types.includes(t) ? theme.currentTheme === 'dark' ? 'white' : 'black' : 'transparent' }}>
                                            <Text style={{ textTransform: 'uppercase', color: types.includes(t) ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>{t}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ flex: 4, backgroundColor: theme.colors.background, padding: 5 }}>
                    {filterExhibitor.length > 0 ?
                        <FlashList
                            data={filterExhibitor}
                            keyExtractor={(ex: Exhibitors) => ex._id.toString()}
                            estimatedItemSize={250}
                            renderItem={({ item }) => <ExhibitorComponent ex={item} selectEx={() => selectExhibitor(item._id)} />}
                            ItemSeparatorComponent={SeparatorComponent}
                        />

                        : <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center' }}>No hay expositores para mostrar</Text>}
                </View >
            </View >
        </View>
    )
}


