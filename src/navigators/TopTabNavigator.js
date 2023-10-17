import React, { useContext, useRef, useState } from "react";


import { EventScreen } from "../screens/EventScreen";
import { FavouriteEventScreen } from "../screens/FavouriteEventScreen";


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from "../context/themeContext/ThemeContext";
const Tab = createMaterialTopTabNavigator();
export const TopTabNavigator = () => {

  const {theme} = useContext(ThemeContext)
  return (
    <Tab.Navigator
    initialRouteName={"Eventos"}
    screenOptions={{
       tabBarActiveTintColor:theme.customColors.activeColor,
      tabBarStyle:{backgroundColor:theme.colors.background},
      tabBarInactiveTintColor:'lightgray',
      tabBarIndicatorStyle:{backgroundColor:theme.customColors.activeColor},
      tabBarLabelStyle:{fontSize: 16, fontWeight:'400'}
    }}

    >
      <Tab.Screen name="Eventos" component={EventScreen} />
      <Tab.Screen name="Favoritos" component={FavouriteEventScreen} />
    </Tab.Navigator>
  );
};


