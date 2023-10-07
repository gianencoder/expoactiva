import { StyleSheet, useWindowDimensions } from "react-native";
import { MyColors } from "./ColorsTheme";


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

    }
})