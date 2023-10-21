import { StyleSheet } from "react-native";

export const exhibitorTheme = StyleSheet.create({
    linksView: {
        flexDirection: 'row'
        , gap: 5
        , marginTop: 5

    },

    linksImg: {
        height: 15
        , width: 15
    },
    wbeSiteTxt: {
        textDecorationLine: 'underline'
        , textDecorationStyle: 'solid'
        , fontWeight: '400'
        , fontSize: 16,
    },
    phoneTxt: {
        fontWeight: '400'
        , fontSize: 16
        , fontStyle: 'italic'
    },
    stand: {
        textAlign: 'right'
        , color: 'orange'
        , fontStyle: 'italic'
        , fontWeight: 'bold'
    },
    icons: {
        width: 17
        , height: 17
    },
    iconView: {
        paddingVertical: 5,
        paddingHorizontal: 15
        , flexDirection: 'row'
        , gap: 10
        , alignItems: 'center'
        , width: '100%'

    },

    links: {
        justifyContent: 'center'
        , alignItems: 'center'
        , alignContent: 'center'
        , marginTop: 15
        , marginHorizontal: 10
    },

    buttonView: {
        height: 150
        , width: '100%'
        , marginVertical: 15
        , justifyContent: 'center'
        , alignItems: 'center'
    },
    buttonMap: {
        width: '90%'
        , height: '20%'
        , backgroundColor: '#025D5A'
        , justifyContent: 'center'
        , alignItems: 'center'
        , borderRadius: 5
    },
    textMap: {
        fontSize: 17
        , color: 'white'
        , fontWeight: '600'
    }
})