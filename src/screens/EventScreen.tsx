import React, { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { eventStyle } from '../theme/EventTheme'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';


export const EventScreen = () => {

    const [favourite, setfavourite] = useState(true);
    let iconName = ''
    let color = MyColors.primary

    const handleFavourite = () => {
        setfavourite(!favourite)
    }

    if (favourite) {
        iconName = 'ios-heart-outline'
        color
    } else {
        iconName = 'ios-heart-sharp'
        color = MyColors.hearth
    }

    return (
        <View style={eventStyle.container} >
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

            </View>

            <View style={eventStyle.days}>

            </View>

            <View style={eventStyle.eventListContainer}>
                <ScrollView>
                    <View style={eventStyle.eventList}>
                        <View style={eventStyle.eventListImg}>
                            <Image style={eventStyle.img} source={require('../assets/carousel/johnDeere.jpg')} />
                        </View>

                        <View style={eventStyle.eventListTitle}>
                            <Text style={eventStyle.titleTxt}>Charla con Cyb3rSoft</Text>
                            <Text style={eventStyle.titleMinutes}>En 50 minutos</Text>
                        </View>

                        <View style={eventStyle.eventListFavourite}>
                            <View>
                                <TouchableOpacity onPress={handleFavourite}>
                                    <Ionicons name={iconName} size={23} color={color} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={eventStyle.titleMinutes}>22/11/2023</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ backgroundColor: MyColors.sparator, height: 1, marginHorizontal: 5, borderRadius: 150 }} />
                </ScrollView>
            </View>
        </View >

    )
}
