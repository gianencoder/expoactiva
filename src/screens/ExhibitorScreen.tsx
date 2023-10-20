import React, { useContext, useState } from 'react'
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


    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                    <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar expositores por nombre..." />
                </View>
                <View style={{ height: 10 }}></View>
                <View style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity >
                            <View style={{ ...eventStyle.typeFilterView, }}>
                                <Text style={{ ...eventStyle.typeFilterText, }}>ACTIVA</Text>

                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity >
                            <View style={{ ...eventStyle.typeFilterView, }}>
                                <Text style={{ ...eventStyle.typeFilterText, }}>CONFERENCIA</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity >
                            <View style={{ ...eventStyle.typeFilterView, }}>
                                <Text style={{ ...eventStyle.typeFilterText, }}>EXPOSITOR</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 15 }}></View>
                        <TouchableOpacity >
                            <View style={{ ...eventStyle.typeFilterView, }}>
                                <Text style={{ ...eventStyle.typeFilterText, }}>GANADERA</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={{ flex: 3, backgroundColor: theme.colors.background, padding: 5 }}>
                    <FlashList
                        data={filter}
                        keyExtractor={(ex: Exhibitors) => ex._id.toString()}
                        estimatedItemSize={250}
                        renderItem={({ item }) => <ExhibitorComponent ex={item} selectEx={() => selectExhibitor(item._id)} />}
                        ItemSeparatorComponent={SeparatorComponent}
                    />
                </View >
            </View >
        </View>
    )
}
