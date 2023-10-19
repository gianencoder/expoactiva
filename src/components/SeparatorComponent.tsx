import React from 'react'
import { View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme'

export const SeparatorComponent = () => {
    return (
        <View style={{ backgroundColor: MyColors.sparator, height: 0.45, borderRadius: 150 }} />
    )
}
