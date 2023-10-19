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
        alignItems: 'flex-end',
        width: 50,
        height: 30,
        alignSelf: 'center',
    },
    date: {
        textAlign: 'left',
        textTransform: 'capitalize',
        fontSize: 18,
    }
})