import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const eventStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },


    eventListContainer: {
        flex: 1,
    },

    event: {
        height: 120,
        flexDirection: 'row',
        paddingVertical: 5
    },

    eventListImg: {
        flex: 2.5,
        padding: 10,
        borderRadius: 10,
    },

    img: {
        flex: 1,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    eventListTitle: {
        flex: 3.5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleTxt: {
        fontWeight: '400',
        fontSize: 18,
    },
    titleMinutes: {
        textTransform: 'uppercase',
        fontWeight: '400',
        fontSize: 13,
        color: MyColors.textGrey,
    },

    eventListFavourite: {
        flex: 2,
        alignItems: 'flex-end',
        padding: 10,
        justifyContent: 'space-between',
    },

    typeFilterView: {
        gap: 10
        , paddingHorizontal: 10
        , height: 25
        , alignItems: 'center'
        , borderRadius: 5
        , flexDirection: 'row'
        , borderWidth: 1
        , justifyContent: 'center'

    },

    typeFilterText: {
        textAlign: 'center'
        , color: 'gray'
    },
    cleanFilters: {
        height: 25
        , borderRadius: 5
        , justifyContent: 'center'
        , paddingHorizontal: 5
    }
});