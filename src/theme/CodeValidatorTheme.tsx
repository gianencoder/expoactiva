import { StyleSheet } from 'react-native'
export const vct = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
        , gap: 45

    },

    titleDiv: {
        flex: 1
        , padding: 10
        , gap: 10
    },

    titleTxt: {
        fontSize: 32
        , fontWeight: '300'
    },

    subtxt: {
        color: 'gray'
        , fontSize: 18
        , flexWrap: 'wrap'
    },

    codeDiv: {
        flex: 1
        , flexDirection: 'row'
        , justifyContent: 'center'
        , padding: 5
    },

    buttonDiv: {
        flex: 5
        , gap: 10
        , alignItems: 'center'


    },

    btn: {
        width: '60%'
        , height: 50
        , backgroundColor: 'red'
        , alignSelf: 'center'
        , borderRadius: 10
        , justifyContent: 'center'
        , alignItems: 'center'
    },

    btnTxt: {
        fontSize: 20
        , color: 'white'
    },

    inputBox: {
        fontSize: 30
        , width: '90%'
        , height: 50
        , backgroundColor: 'white'
        , borderRadius: 10
        , textAlign: 'center'
        , letterSpacing: 20
    }
})