import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import { MyColors } from '../theme/ColorsTheme'


export const MainScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: MyColors.primary, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'white'} size={'large'} />
        </View>
    )
}
