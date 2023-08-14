import { StyleSheet } from "react-native";
import { MyColors } from "./ColorsTheme";


export const ProfileStyle = StyleSheet.create({

    container: {
        flex: 1,

    },
    iconContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',


    },
    infoContainer: {
        flex: 2,

    },

    settingContainer: {
        flex: 2,

    },
    txt: {
        color: MyColors.primary,
        fontSize: 16,
        fontWeight: "700",
        top: '10%'
    },
    iconCircle: {
        backgroundColor: '#D0D0D0',
        borderRadius: 50

    }


});