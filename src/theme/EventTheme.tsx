import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const eventStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    filters: {
        flex: 1,
        backgroundColor: 'white',

        // flexDirection: 'row',

    },
    // days: {
    //     flex: 1,
    //     backgroundColor: 'grey',

    // },


    eventListContainer: {
        flex: 2,
        // backgroundColor: 'white'

    },
    eventList: {
        flex: 1,
        backgroundColor: MyColors.white,
        flexDirection: 'row',
        padding: 10

    },

    eventListImg: {
        flex: 2.5,
        padding: 2

    },

    img: {
        flex: 1,
        height: 80,
        resizeMode: 'stretch',
        borderRadius: 10,
        backgroundColor: '#010100'
    },
    eventListTitle: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,

    },
    titleTxt: {
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 15,
        // color: 'white',

    },
    titleMinutes: {
        textTransform: 'uppercase',
        fontWeight: '400',
        fontSize: 12,
        color: MyColors.textGrey

    },

    eventListFavourite: {
        flex: 2,
        alignItems: 'flex-end',
        padding: 10,
        justifyContent: 'space-between',
    },

    // optionTxt: {
    //     fontSize: 15,
    //     textTransform: "uppercase",
    //     marginBottom: 40,
    //     fontWeight: '800',
    // },

    inputText: {
        flex: 1,
        padding: 2,

    },


    comboBox: {
        flex: 1,
    }

});