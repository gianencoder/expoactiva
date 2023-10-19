import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export const SectionHeader = ({
    title,
    containerStyle,
    titleStyle,

}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})
