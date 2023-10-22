import React from 'react'
import { View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme'



export const GuestScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: MyColors.white,
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 80,

        }}>
            <View style={{
                justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', width: '80%', height: '70%', borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 4,
                    height: 4,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,

                elevation: 24,


            }}>



            </View>
        </View>
    )
}
