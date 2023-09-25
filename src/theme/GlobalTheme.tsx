import { StyleSheet } from 'react-native'
import { MyColors } from './ColorsTheme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.primary,
    },

    homeContainer: {
        flex: 1,
    },

    bigComponentContainer: {
        backgroundColor: 'white',
        height: 100,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,

        elevation: 24,
    },
    bigComponent: {
        borderRadius: 10,
        width: '100%',

    },

    littleComponentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: MyColors.white,
        marginBottom: 40,
        marginTop: 20,
        gap: 10,
        paddingHorizontal: 10
    },

    scrollView: {
        // marginTop: -10
    },
    littleComponentTxt: {
        color: MyColors.apple,
        fontSize: 16,
        fontWeight: '600',
        //textTransform: 'uppercase',
    },


    homeComponents: {
        height: 110,
        width: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 8,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.3,
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

    }
})