import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const ticketStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MyColors.white

    },

    qrCode: {
        flex: 2.5,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
    },

    qrCodeImg: {
        flex: 1,
    },

    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },

    button: {
        backgroundColor: MyColors.primary,
        width: 200,
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    buttonTxt: {
        color: MyColors.white,
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'uppercase'

    },

    inputText: {
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: MyColors.primary,
        justifyContent: 'center',
        textAlign: 'center'
    }
});