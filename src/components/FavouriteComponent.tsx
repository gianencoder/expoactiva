import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';

export const FavouriteComponent = () => {

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
        return (
            <TouchableOpacity onPress={handleFavourite}>
                <Ionicons name={iconName} size={23} color={color} />
            </TouchableOpacity>
        )
    }
}
