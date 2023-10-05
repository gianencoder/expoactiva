import React, { memo, useCallback } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

function ExhibitorItem({ item, fairStand, selectExhibitor }) {
  const { name, description } = item;

  const onSelect = useCallback(() => {
    selectExhibitor(item);
  }, [item, selectExhibitor]);

  const pressedStyle = (pressed) => [
    styles.exhibitor,
    pressed && styles.exhibitorPressed
  ];

  return (
    <Pressable onPress={onSelect} style={({ pressed }) => pressedStyle(pressed)}>
      <View style={styles.imageContainer}>
        <Image 
          source={fairStand}
          style={styles.image}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable>
          <MaterialIcons name="near-me" size={35} color="seagreen" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exhibitor: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  exhibitorPressed: {
    opacity: 0.5
  },
  imageContainer: {
    paddingRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    tintColor: '#0a521c'
  },
  itemContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    fontSize: 18
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default memo(ExhibitorItem);
