import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Keyboard, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { FlashList } from '@shopify/flash-list'
import { ExhibitorComponent } from '../components/ExhibitorComponent'
import { SeparatorComponent } from '../components/SeparatorComponent'
import { ExhibitorFunction } from '../functions/ExhibitorFunction'
import SearchBar from '../components/SearchBarComponent';
import { eventStyle } from '../theme/EventTheme'
import { loadTranslations, translate, translations } from '../util/utils'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { lang } from 'moment'


export const ExhibitorScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { fetching, loading, setSearchText, filter, selectExhibitor, handleSetFetching } = ExhibitorFunction()
    const [types, setTypes] = useState([])
    const [translation, setTranslation] = useState(translations.es);
    const { languageState } = useLanguage();
    const { language } = languageState
    const [translateType, setTranslateType] = useState('')
    const [listTypeTranslated, setListTypeTranslated] = useState([]);

    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    const tiposUnicos = new Set();

    filter.forEach(ex => {
        tiposUnicos.add(ex.type)
    })




    const listType = Array.from(tiposUnicos)

    const handleScroll = React.useCallback(() => {
        Keyboard.dismiss();
    }, []);

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
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={eventStyle.container} >
                <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center' }}>
                    <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                        <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder={translation.exhibitorScreen.searchPlaceholder} />
                    </View>
                    <View style={{ height: 40, alignItems: 'center' }}>
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
                                            <Text style={{ textTransform: 'uppercase', color: types.includes(t) ? theme.currentTheme === 'dark' ? 'black' : 'white' : theme.currentTheme === 'dark' ? 'white' : 'black' }}>
                                                {language === 'es' && `${t}`}

                                                {language === 'en'
                                                    ? t.toLowerCase() === 'energía' ? 'energy'
                                                        : t.toLowerCase() === 'automotor' ? 'automotive'
                                                            : t.toLowerCase() === 'agro' ? 'farm'
                                                                : t.toLowerCase() === 'servicio' ? 'service'
                                                                    : t.toLowerCase() === 'educativo' && 'educative'
                                                    : ""
                                                }

                                                {language === 'pt'
                                                    ? t.toLowerCase() === 'energía' ? 'energia'
                                                        : t.toLowerCase() === 'automotor' ? 'automotivo'
                                                            : t.toLowerCase() === 'agro' ? 'agro'
                                                                : t.toLowerCase() === 'servicio' ? 'serviço'
                                                                    : t.toLowerCase() === 'educativo' && 'educacional'
                                                    : ""}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                    {loading
                        ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }} />
                        </View>
                        : filterExhibitor.length > 0 ?
                            <FlashList
                                onScrollBeginDrag={handleScroll}
                                keyboardShouldPersistTaps="always"
                                data={filterExhibitor}
                                keyExtractor={(ex: Exhibitors) => ex.id.toString()}
                                estimatedItemSize={250}
                                renderItem={({ item }) => <ExhibitorComponent ex={item} selectEx={() => selectExhibitor(item.id)} />}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={fetching}
                                        progressBackgroundColor={theme.colors.background}
                                        onRefresh={handleSetFetching}
                                        colors={[theme.customColors.activeColor]}
                                        tintColor={theme.customColors.activeColor}
                                    />
                                }
                                ItemSeparatorComponent={() => <SeparatorComponent />}
                            />
                            : <View style={{ flex: 1, alignItems: 'center', }}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>{translation.exhibitorScreen.noExhibitors}</Text>
                            </View>
                    }
                </View >
            </View>
        </TouchableWithoutFeedback>

    )
}


