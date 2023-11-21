import { Dimensions, StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const authStyle = StyleSheet.create({
    mainView: {
        flex: 1
        // , borderRadius: 15
        , justifyContent: "center"
        // , alignItems: "center"
        , shadowColor: "#000"
        , padding: 20
    },

    authCard: {
        flex: 1,
        padding: 25,
        justifyContent: 'space-between',
        gap: 20,

    },
    title: {
        fontSize: 32,
        fontWeight: '300',
    },
    subtitle: {
        fontSize: 20,
        color: MyColors.textGrey,
    },
    createAccount: {
        fontSize: 14,
        fontWeight: '600',
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
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 13.97,

        elevation: 21,

    },
    line: {
        width: 50,
        height: 4,
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
        width: 28,
        height: 28
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
        width: '100%'
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
        flex: 1,
        borderRadius: 10
        , alignItems: 'center'
        , height: 'auto'
        , width: '100%'
        , gap: 15
        , padding: 10,
    }
})