import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { EventFunction } from '../functions/EventFunction';
import { LoadingScreen } from './LoadingScreen';
import SearchBar from '../components/SearchBarComponent';
import { EventComponent } from '../components/EventComponent';

export const EventScreen = () => {

    const { loading, iconName, color, handleFavourite, filterEvent, setSearchText } = EventFunction()
    return (
        <View style={eventStyle.container} >
            {loading ? <LoadingScreen /> :
                <View style={{ backgroundColor: 'white' }}>
                    <FlatList
                        data={filterEvent}
                        keyExtractor={(event: Event) => event._id.toString()}
                        renderItem={({ item }) =>
                            <EventComponent event={item} iconName={iconName} color={color} method={handleFavourite} />
                        }
                        ListHeaderComponent={
                            <View style={{ width: '70%', marginVertical: 10 }}>
                                <SearchBar onSearchTextChange={(text: any) => setSearchText(text)} placeholder="Buscar eventos" />
                            </View>
                        }
                    />
                </View>
            }

        </View >
    )
}


