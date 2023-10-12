import React, { useContext, useEffect } from 'react'
import { View, RefreshControl, ActivityIndicator, Button } from 'react-native'
import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import SearchBar from '../components/SearchBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoshiEventComponent } from '../components/MoshiEventComponent';
import { FlashList } from '@shopify/flash-list';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';



export const FavouriteEventScreen = () => {

    const { loading, filterEvent, setSearchText, fetching, handleSetFetching } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const { favorites } = EventFunction()

    const clearAllData = async () => {
        AsyncStorage.clear().then(data => {
        }).catch((error) => console.log(error))
    };


    const getFavorites = async () => {
        await AsyncStorage.getItem('eventosFavoritos')
    }

    return (
        <View style={eventStyle.container} >
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={MyColors.primary} style={{ backgroundColor: theme.colors.background, height: '100%', width: '100%' }}
                />

            </View> :
                <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                    <View style={{ width: '100%', marginVertical: 10, padding: 5, height: 45, backgroundColor: 'transparent' }}>
                        <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                    </View>
                    <FlashList
                        data={favorites}
                        keyExtractor={(event) => event.idEvent.toString()}
                        renderItem={({ item }) => <MoshiEventComponent moshiEvent={item} />}
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
                        estimatedItemSize={100}
                    />
                    <Button title='Eliminar todo' onPress={clearAllData} ></Button>
                </View>
            }
        </View >


    );

}
