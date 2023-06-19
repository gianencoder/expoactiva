import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";

export const eventStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        padding: 20,
        flexWrap: 'wrap',
        // backgroundColor: 'green'
    },
    container2: {
        flex: 4,
        // backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10
    },

    optionTxt: {
        fontSize: 15,
        textTransform: "uppercase",
        marginBottom: 40,
        fontWeight: '800',
    },
    searcher: {
        fontSize: 15,
        borderColor: MyColors.primary,
        borderWidth: 2,
        borderRadius: 40,
        paddingHorizontal: 10

    }


});