import { StyleSheet } from 'react-native'
export const vct = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10

    },

    titleDiv: {
        flex: 1
        , padding: 10
        , gap: 10
    },

    titleTxt: {
        fontSize: 28
        , fontFamily: 'verdana'
        , fontWeight: '400'
    },

    subtxt: {
        fontFamily: 'verdana'
        , color: 'gray'
        , fontSize: 16
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
        , gap: 50
        , alignItems: 'center'


    },

    btn: {
        width: '60%'
        , height: 70
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