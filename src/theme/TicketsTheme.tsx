import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const ticketStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    topSide: {
        flex: 1,
        backgroundColor: 'white'
    },

    listTicketContainer: {
        width: '100%'
        , height: 120
        , flexDirection: 'row'
        , gap: 5
    },

    imgContainer: {
        flex: 1
        , padding: 5
        , justifyContent: 'center'
        // , alignItems: 'center'
    },

    infoContainer: {
        flex: 2
        , padding: 5
        , justifyContent: 'center'
        , gap: 5
    },

    bottomSide: {
        flex: 2,
        // backgroundColor: 'blue'
    },

    qrCode: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',

    },

    qrCodeImg: {
        flex: 1,
    },
    qrCard: {
        gap: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '90%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },

    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

    },

    button: {
        backgroundColor: MyColors.primary,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    buttonTxt: {
        color: MyColors.white,
        fontWeight: '500',
        fontSize: 14,


    },

    inputText: {
        borderStyle: 'solid',
        // borderColor: ,
        height: 50,
        width: 300,
        // borderRadius: 10,
        borderWidth: 1.5,
        padding: 10,
        fontSize: 14,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent'
    }
});