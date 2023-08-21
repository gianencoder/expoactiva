import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme';
import { MotiView } from '@motify/components'

export const LoadingScreen = () => {
    const LoadingIndicator = ({ size }: { size: number }) => {
        return <MotiView
            from={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2
            }}
            animate={{
                width: 40 + 20,
                height: 40 + 20,
                borderRadius: (40 + 20) / 2
            }}

            transition={{
                type: 'spring',
                duration: 1000,
                loop: true,
            }}
            style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                borderWidth: 40 / 10,
                borderColor: MyColors.primary,
                ...Platform.select({
                    ios: {
                        shadowColor: MyColors.primary,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                    }
                })
            }}
        />
    }
    return (
        <View style={styles.container}>
            <LoadingIndicator size={100} />
            <Text style={{ top: 10 }}>Cargando...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});