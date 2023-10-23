import React, { memo, useCallback } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SeparatorComponent } from "./SeparatorComponent";

function ExhibitorItem({ item, selectExhibitor, toggleNavigationMode, toggleFollowUserMode, navigationMode }) {
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
    <View>
      <Pressable onPress={onSelect} style={({ pressed }) => pressedStyle(pressed)}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={{color:'gray', fontSize: 15}}>{description}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable onPress={onIconPressed} style={iconPressedStyle} hitSlop={{top:20,right:20,bottom:20,left:20}}>
            <MaterialIcons name="near-me" size={35} color="seagreen" />
          </Pressable>
        </View>
      </Pressable>
      <SeparatorComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitor: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 15,
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
    fontWeight: '600',
    fontSize: 20,
    paddingBottom: 3
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  }
});

export default memo(ExhibitorItem);
