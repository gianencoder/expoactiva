import { StyleSheet } from "react-native";

export const eDetailTheme = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    type: {
        fontSize: 20,
        fontWeight: '400',
        textTransform: 'capitalize'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    marker: {
        height: 15,
        width: 15
    },
    favouriteButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,

        alignSelf: 'center'
    },
    date: {
        textTransform: 'capitalize',
        fontSize: 18,
    }
})