import { StyleSheet } from 'react-native'

export const userProfileTheme = StyleSheet.create({

    container: {
        flex: 1
    },
    header: {
        flex: 1
        , padding: 15
        , alignItems: 'center'
        , gap: 10
    },

    body: {
        flex: 3
        , gap: 5
        , padding: 20
        , alignContent: 'center'
    },
    option: {
        height: 50
        , flexDirection: 'row'
        , alignItems: 'center'
        , padding: 10
        , gap: 15
    },
    footer: {
        flex: .4
        , padding: 15
        , alignItems: 'center'
        , justifyContent: 'flex-end'
        , gap: 10
    },
    text: {
        fontSize: 20
        , fontWeight: '400'
        , color: 'white'
    },

    img: {
        width: 120
        , height: 120
        , borderRadius: 80
    }
})