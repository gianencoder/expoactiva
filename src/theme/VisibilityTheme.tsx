import { StyleSheet } from 'react-native'

export const visibilityTheme = StyleSheet.create({

    container: {
        flex: 1,
        // gap: 25
        padding: 25,
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // gap: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 19
    },

})