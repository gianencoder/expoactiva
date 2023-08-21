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
        backgroundColor: MyColors.white,
    },

    bigComponentContainer: {
        height: 90,
        marginHorizontal: 10,
        marginVertical: 15,
    },

    littleComponentContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    littleComponentTxt: {
        color: MyColors.primary,
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        top: 8
    },

    bigComponent: {
        flex: 1,
        backgroundColor: MyColors.white,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 15,
    },

    homeComponents: {
        height: 120,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 8,
        backgroundColor: MyColors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 15,
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