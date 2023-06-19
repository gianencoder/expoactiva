import { Platform, StyleSheet } from 'react-native'
import { MyColors } from './ColorsTheme'

// const android = Platform.OS === 'android'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.primary,
        paddingTop: '5%',
    },

    homeContainer: {
        flex: 1,
        backgroundColor: MyColors.white
    },

    bigComponentContainer: {
        height: 150,
        marginHorizontal: 10,
        marginVertical: '2%',
    },

    littleComponentContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    littleComponentTxt: {
        color: MyColors.primary,
        fontSize: 20,
        fontWeight: '600'
    },

    bigComponent: {
        flex: 1,
        backgroundColor: MyColors.white,
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    homeComponents: {
        height: 150,
        width: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginVertical: 5,
        backgroundColor: MyColors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    buttonComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 30,
        backgroundColor: MyColors.white,

    }
})