import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, Button } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { EventFunction } from '../functions/EventFunction';
import { LoadingScreen } from './LoadingScreen';
import SearchBar from '../components/SearchBarComponent';
import { EventComponent } from '../components/EventComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { MyColors } from '../theme/ColorsTheme';
import { usePreventScreenCapture } from 'expo-screen-capture';
export const EventScreen = () => {
    usePreventScreenCapture();
    const { loading, iconName, color, filterEvent, setSearchText, getEvents, fetching, handleSetFetching } = EventFunction()

    return (
        <View style={eventStyle.container} >
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={MyColors.primary} />
                <Text style={{ color: MyColors.primary, fontSize: 16 }}>Cargando eventos...</Text>
            </View> :
                <View style={{ backgroundColor: 'white' }}>
                    <FlatList
                        data={filterEvent}
                        keyExtractor={(event: Event) => event._id.toString()}
                        renderItem={({ item }) =>
                            <EventComponent event={item} iconName={iconName} color={color} method={() => console.log('hola')} />
                        }
                        ListHeaderComponent={
                            <View style={{ width: '70%', marginVertical: 10 }}>
                                <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                            </View>
                        }
                        ItemSeparatorComponent={() => <SeparatorComponent />}
                        onEndReached={getEvents}
                        onEndReachedThreshold={0.5}
                        onScrollEndDrag={handleSetFetching}
                        ListFooterComponent={fetching ? <ActivityIndicator color={MyColors.primary} style={{ height: 50 }} /> : null}

                    />
                </View>
            }

        </View >
    )
}


