import { StyleSheet, useWindowDimensions } from "react-native";
import { MyColors } from "./ColorsTheme";

export const ticketStyles = StyleSheet.create({

    container: {
        flex: 1
    },

    topSide: {
        flex: 5
        , gap: 10

    },

    topSideComplements: {
        flex: 1
        , alignItems: 'center'
        , flexDirection: 'row'
        , justifyContent: 'space-evenly'
    },

    listTicketContainer: {
        width: '100%'
        , padding: 15
        , height: 120
        , flexDirection: 'row'

    },

    imgContainer: {
        flex: 1
        , padding: 5
        , justifyContent: 'center'

    },

    infoContainer: {
        flex: 2.5
        , justifyContent: 'center'
        , gap: 5
    },

    bottomSide: {
        flex: 1.2,
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
    },

    btv: {
        flex: 1
        , alignItems: 'center'
        , gap: 5

    },
    btt: {
        fontSize: 18
    },
    btnActions: {
        fontSize: 25
        , color: 'white'
    },
    tbtn: {
        width: 60
        , height: 25
        , borderRadius: 5
        , justifyContent: 'center'
        , alignItems: 'center'
    },
    container2: {
        flex: 1
        , paddingVertical: 50
        , paddingHorizontal: 20
        , gap: 30
    }
});