import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const mapsTheme = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: MyColors.white
    },

    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 70,
        backgroundColor: MyColors.primary,
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 20

    },

    googleBtn: {
        backgroundColor: MyColors.primary,
        borderRadius: 15,
        padding: 10,
        width: '90%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },

    appleBtn: {
        backgroundColor: MyColors.apple,
        borderRadius: 15,
        padding: 10,
        width: '90%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    wazeBtn: {
        backgroundColor: '#05c8f7',
        borderRadius: 15,
        padding: 15,
        width: '90%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',


    },
    txtBtn: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
        padding: 10
    },
    titleTxt: {
        color: MyColors.white,
        fontSize: 20,
        fontWeight: '600',
        width: '90%',
    },
    googleTxt: {
        color: MyColors.white,
        fontWeight: '600',
        fontSize: 15,
        padding: 10
    }

});