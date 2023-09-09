import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { EventFunction } from '../functions/EventFunction';
import { LoadingScreen } from './LoadingScreen';

export const EventScreen = () => {
    const { loading, datos, iconName, color, handleFavourite } = EventFunction()
    return (
        <View style={eventStyle.container} >
            <View style={eventStyle.eventListContainer}>
                {loading ? <LoadingScreen /> :
                    <View style={eventStyle.filters}>
                        <View style={eventStyle.searcher}>
                            <FontAwesome5 style={eventStyle.iconSearch} name='search' size={20} color={MyColors.primary} />
                            <TextInput
                                style={eventStyle.inputText}
                                placeholder='Buscar por nombre...'
                            />
                        </View>
                        <View style={eventStyle.comboBox}>
                            <TextInput
                                placeholder='aca va el combobox'
                            />
                        </View>
                        <View style={eventStyle.days}>
                        </View>
                        <FlatList
                            data={datos}
                            renderItem={({ item }) =>
                                <View style={eventStyle.eventList}>
                                    <View style={eventStyle.eventListImg}>
                                        <Image style={eventStyle.img} source={item.Image} />
                                    </View>

                                    <View style={eventStyle.eventListTitle}>
                                        <Text style={eventStyle.titleTxt}>{item.title}</Text>
                                        {/* <Text style={eventStyle.titleMinutes}>{differenceInMinutes(item.date, Date.now())} min</Text> */}
                                    </View>

                                    <View style={eventStyle.eventListFavourite}>
                                        <View>
                                            <TouchableOpacity onPress={handleFavourite}>
                                                <Ionicons name={iconName} size={23} color={color} />
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            {/* <Text style={eventStyle.titleMinutes}>{format(item.date, "dd-MM-yy HH:mm")}</Text> */}
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: MyColors.sparator, height: 1, marginHorizontal: 5, borderRadius: 150 }} />
                                </View>
                            }
                        />
                    </View>
                }
            </View>
        </View >
    )
}


