import { StyleSheet } from 'react-native'

export const editProfileTheme = StyleSheet.create({

    container: {
        flex: 1
        , gap: 15
        , padding: 20

    },
    div: {

        gap: 3
        , alignItems: 'center'
    },
    title: {
        fontSize: 25
    },
    labelName: {
        fontSize: 17
        , fontWeight: '600'
        , alignSelf: 'flex-start'

    },
    nameTxt: {
        width: '90%'
        , backgroundColor: 'gray'
        , height: 40
        , borderRadius: 5
        , padding: 10
        , fontSize: 18
        , color: 'white'
    }

})