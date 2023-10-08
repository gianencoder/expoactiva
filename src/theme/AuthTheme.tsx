import { Dimensions, StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const authStyle = StyleSheet.create({

    authCard: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
        gap: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '400',
    },
    subtitle: {
        fontSize: 18,
        color: MyColors.textGrey,
        fontFamily: 'lucida grande'
    },
    createAccount: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },

    bottomScreen: {
        flex: 2,
        justifyContent: 'center',
        gap: 25,

    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    modalCard: {
        height: SCREEN_HEIGHT,
        width: '100%',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 30,
        zIndex: 1,
        // borderWidth: .5,

    },
    line: {
        width: 90,
        height: 4,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 50
    },

    buttonContainer: {
        flex: 1,
        gap: 15,
        padding: 15,

    },
    loginButton: {
        width: '100%',
        height: SCREEN_HEIGHT / 13,
        borderRadius: 10
    }
})