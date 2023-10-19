import { StyleSheet } from "react-native";

export const themeConfig = StyleSheet.create
    ({
        container: {
            flex: 1,
            gap: 10,
        },
        configScreen: {
            height: 50,
            marginHorizontal: 20,
        },
        itemContainer: {
            justifyContent: 'space-between',
            height: 30,
            flexDirection: 'row'

        },
        item: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        }

    })

