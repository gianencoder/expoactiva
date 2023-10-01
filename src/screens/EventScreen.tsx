import React, { useContext } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { EventFunction } from '../functions/EventFunction';
import SearchBar from '../components/SearchBarComponent';
import { EventComponent } from '../components/EventComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { FlashList, useOnNativeBlankAreaEvents } from "@shopify/flash-list";



export const EventScreen = () => {

    const { loading, filterEvent, setSearchText, fetching, handleSetFetching } = EventFunction()
    const { theme } = useContext(ThemeContext)

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
                        data={filterEvent}
                        keyExtractor={(event: Event) => event._id.toString()}
                        renderItem={({ item }) => <EventComponent event={item} />}

                        ItemSeparatorComponent={() => <SeparatorComponent />}
                        estimatedItemSize={100}
                        onEndReached={handleSetFetching}
                        onEndReachedThreshold={0.3}
                        // ListHeaderComponent={fetching ? <ActivityIndicator color={theme.customColors.activeColor} style={{ height: 250, backgroundColor: theme.colors.background }} /> : null}
                        ListFooterComponent={fetching ? <ActivityIndicator color={theme.customColors.activeColor} style={{ height: 50, backgroundColor: theme.colors.background }} /> : null}
                    />
                </View>
            }

        </View >

    )
}


