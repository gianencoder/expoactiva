import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from "react-native";

function ExhibitorItem({item, fairStand, selectExhibitor}) {
    return (
    <Pressable onPress={()=> selectExhibitor(item)} style={({ pressed }) => [
        styles.exhibitor,
        pressed && styles.exhibitorPressed
    ]}>
        <View style={styles.imageContainer}>
            <Image 
            source={fairStand}
            style={{width: 40, height: 40, tintColor: '#0a521c'}}
            />
        </View>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
        </View>
        <View style={styles.iconContainer}>
            <Pressable>
                <MaterialIcons name="near-me" size={35} color="seagreen" />
            </Pressable>
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    exhibitor : {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    exhibitorPressed: {
        opacity: 0.5
    },
    imageContainer : {
        paddingRight: 10,
    },
    itemContainer : {
        flex: 1,
    },
    title : {
        fontWeight: '500',
        fontSize: 18
    },
    iconContainer : {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default React.memo(ExhibitorItem)