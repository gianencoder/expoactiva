import React, { useContext, useEffect, useState } from "react";
import { EventScreen } from "../screens/EventScreen";
import { FavouriteEventScreen } from "../screens/FavouriteEventScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from "../context/themeContext/ThemeContext";
import { loadTranslations, translations } from '../util/utils'
import { useLanguage } from '../context/LanguageContext/LanguageContext'

const Tab = createMaterialTopTabNavigator();
export const TopTabNavigator = () => {
  const { languageState } = useLanguage();
  const [translation, setTranslation] = useState(translations.es);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    loadTranslations(setTranslation);
  }, [languageState]);

  return (
    <Tab.Navigator
      initialRouteName={"Eventos"}
      screenOptions={{
        tabBarActiveTintColor: theme.customColors.activeColor,
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarInactiveTintColor: 'lightgray',
        tabBarIndicatorStyle: { backgroundColor: theme.customColors.activeColor },
        tabBarLabelStyle: { fontSize: 16, fontWeight: '400' }
      }}>

      <Tab.Screen name='Eventos' options={{ tabBarLabel: translation.topTabNavigator.events }} component={EventScreen} />
      <Tab.Screen name='Favoritos' options={{ tabBarLabel: translation.topTabNavigator.favoriteEvents }} component={FavouriteEventScreen} />
    </Tab.Navigator>
  );
};


