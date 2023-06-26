import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const eventStyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green'
    },
    filters: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        padding: 10

    },
    days: {
        flex: 1,
        // backgroundColor: 'grey',

    },
    eventListContainer: {
        flex: 8,
        // backgroundColor: 'orange',


    },
    eventList: {
        height: 120,
        // backgroundColor: 'green',
        flexDirection: 'row',
        padding: 10

    },

    eventListImg: {
        flex: 2.5,
        padding: 2

    },

    img: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'stretch',
        borderRadius: 15,
    },
    eventListTitle: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
        left: 5
    },
    titleTxt: {
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 15,

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

    optionTxt: {
        fontSize: 15,
        textTransform: "uppercase",
        marginBottom: 40,
        fontWeight: '800',
    },
    searcher: {
        flex: 2.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: MyColors.primary,
        borderWidth: 1,
        borderRadius: 30,
        height: 40

    },
    inputText: {
        flex: 1,
        padding: 2,

    },
    iconSearch: {
        padding: 10
    },

    comboBox: {
        flex: 1,
    }

});