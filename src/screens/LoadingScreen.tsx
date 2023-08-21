import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme';
import { MotiView } from '@motify/components'

export const LoadingScreen = () => {
    const LoadingIndicator = ({ size }: { size: number }) => {
        return <MotiView
            from={{
                width: size / 2,
                height: size / 2,
                borderRadius: size / 2,
                borderWidth: 0
            }}
            animate={{
                width: (size / 2) + 20,
                height: (size / 2) + 20,
                borderRadius: (size / 2 + 20) / 2,
                borderWidth: (size / 2) / 10
            }}

            transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
            }}
            style={{
                width: size,
                height: size,
                borderRadius: size / 4,
                borderWidth: (size / 2) / 10,
                borderColor: '#fff',
                ...Platform.select({
                    ios: {
                        shadowColor: '#fff',
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
            <Text style={{ top: 10, color: '#fff' }}>Cargando...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MyColors.primary,
    },
});