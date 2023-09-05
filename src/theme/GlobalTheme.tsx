import { Platform, StyleSheet } from 'react-native'
import { MyColors } from './ColorsTheme'

// const android = Platform.OS === 'android'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: '5%',
    },

    homeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    bigComponentContainer: {
        height: 90,
        marginHorizontal: 10,
        marginVertical: 15,
    },

    littleComponentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: MyColors.white,
        marginBottom: 40,
        marginTop: 20,
        gap: 10,
        paddingHorizontal: 10,
    },

    scrollView: {
    },
    littleComponentTxt: {
        color: MyColors.primary,
        fontSize: 16,
        fontWeight: '600',
        //textTransform: 'uppercase',
        top: 8
    },

    bigComponent: {
        flex: 1,
        backgroundColor: MyColors.white,
        borderRadius: 25,
        shadowColor: MyColors.primary,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 15,
    },

    homeComponents: {
        height: 110,
        width: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 8,
        backgroundColor: MyColors.white,
        shadowColor: MyColors.primary,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 8,

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