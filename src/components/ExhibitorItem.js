import React, { memo, useCallback } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

function ExhibitorItem({ item, fairStand, selectExhibitor, toggleNavigationMode, toggleFollowUserMode, navigationMode }) {
  const { name, description } = item;

  const onSelect = useCallback(() => {
    selectExhibitor(item);
  }, [item, selectExhibitor]);

  const onIconPressed = useCallback(() => {
    selectExhibitor(item);
    toggleNavigationMode();
    navigationMode &&  toggleFollowUserMode();
  }, [item, selectExhibitor,navigationMode, toggleFollowUserMode, toggleNavigationMode]);

  const pressedStyle = (pressed) => [
    styles.exhibitor,
    pressed && styles.exhibitorPressed
  ];

  const iconPressedStyle = ({ pressed }) => [
    { opacity: pressed ? 0.5 : 1 }
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
        <Text style={{color:'gray'}}>{description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={onIconPressed} style={iconPressedStyle} hitSlop={{top:20,right:20,bottom:20,left:20}}>
          <MaterialIcons name="near-me" size={35} color="seagreen" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exhibitor: {
    flexDirection: 'row',
    paddingVertical: 20,
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
    width: 35,
    height: 35,
    tintColor: '#0a521c'
  },
  itemContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    paddingBottom: 2
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  }
});

export default memo(ExhibitorItem);
