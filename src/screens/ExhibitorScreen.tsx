import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../theme/GlobalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { FlashList } from '@shopify/flash-list'

export const ExhibitorScreen = () => {
    const { theme } = useContext(ThemeContext)

    const expositor = [{
        id: 1,
        nombre: 'Gian',
        apellido: 'Mendoza'
    },
    {
        id: 2,
        nombre: 'Stefan',
        apellido: 'Techera'
    }
    ]
    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row' }}></View >
            <View style={{ flex: 3, gap: 2 }}>

                <FlashList
                    data={expositor}
                    key={exp => exp.id}
                    estimatedItemSize={150}
                    renderItem={({ item }) =>
                        <View style={{ width: '100%', height: 80, backgroundColor: 'blue', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: 'green', flex: 1 }}>
                                <View style={{ flex: 1, backgroundColor: 'black', padding: 10, borderRadius: 40 }}></View>
                            </View>
                            <View style={{ backgroundColor: 'yellow', flex: 1 }}></View>
                        </View>
                    }


                />

            </View >
        </View >

    )
}
