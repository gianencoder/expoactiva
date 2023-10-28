import { Dimensions, StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const authStyle = StyleSheet.create({
    mainView: {
        width: '90%'
        , height: 'auto'
        , borderRadius: 15
        , justifyContent: "center"
        , alignItems: "center"
        , shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },

    authCard: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
        gap: 20,

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
        zIndex: 1,
        height: SCREEN_HEIGHT,
        width: '100%',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 13.97,

        elevation: 21,

    },
    line: {
        width: 60,
        height: 5,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 50
    },

    buttonContainer: {
        flex: 1,
        gap: 15,
        padding: 15,
        alignItems: 'center'

    },
    loginButton: {
        width: '90%',
        height: SCREEN_HEIGHT / 12,
        borderRadius: 10
    },
    authComponentForm: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        padding: 15,
        gap: 50

    },
    img: {
        width: 25,
        height: 25
    },
    btnTxt: {

    },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        flexDirection: 'row',
        gap: 15
    },

    formView: {
        width: '90%'
    },

    formLabel: {
        paddingHorizontal: 3
        , paddingVertical: 3
        , fontSize: 16,
    },

    ef: {
        width: '100%'
        , height: 40
        , borderRadius: 5
        , padding: 10
        , textAlignVertical: 'bottom'
        , fontSize: 20

    },

    createAccountForm: {
        borderRadius: 10
        , alignItems: 'center'
        , height: 'auto'
        , width: '100%'
        , gap: 15
        , padding: 10,
    }
})