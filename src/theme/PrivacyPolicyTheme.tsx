import { StyleSheet } from "react-native";

export const privacyTheme = StyleSheet.create({
    container: {
        flex: 1
        , padding: 15

    },
    title: {
        fontSize: 20
        , fontWeight: 'bold'
        , textAlign: 'left'
    },
    subtitle: {
        fontSize: 19
        , fontWeight: '600'
    },
    text: {
        fontSize: 17
        , textAlign: 'left'
    },
    btn: {
        width: '50%'
        , justifyContent: 'center'
        , alignItems: 'center'
        , height: 40
        , borderRadius: 10
    }

})