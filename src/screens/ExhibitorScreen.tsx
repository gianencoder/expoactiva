import React, { useContext, useState } from 'react'
import { Image, Text, View, ScrollView } from 'react-native'
import { styles } from '../theme/GlobalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { AnimatedFlashList, FlashList } from '@shopify/flash-list'
import { ExhibitorComponent } from '../components/ExhibitorComponent'
import { SeparatorComponent } from '../components/SeparatorComponent'
import { ExhibitorFunction } from '../functions/ExhibitorFunction'
import SearchBar from '../components/SearchBarComponent';

export const ExhibitorScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { exhibitor, setSearchText, filter } = ExhibitorFunction()


    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar expositores por nombre..." />
                </View>
                <View style={{ flex: 1, marginHorizontal: 5, flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                    <Text>Filtros</Text>
                </View>
            </View >
            <View style={{ flex: 3, backgroundColor: theme.colors.background, padding: 5 }}>
                <FlashList
                    data={filter}
                    keyExtractor={(ex: Exhibitors) => ex._id.toString()}
                    estimatedItemSize={250}
                    renderItem={({ item }) => <ExhibitorComponent ex={item} />}
                    ItemSeparatorComponent={SeparatorComponent}
                />
            </View >
        </View >

    )
}
