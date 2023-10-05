import React, { useContext, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { EventScreen } from '../screens/EventScreen';
import { FavouriteEventScreen } from '../screens/FavouriteEventScreen';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const TopTabNavigator = () => {
  const pagerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useContext(ThemeContext);

  const handlePageChange = (pageIndex) => {
    pagerRef.current.setPage(pageIndex);
    setActiveTab(pageIndex); // actualizamos el estado de la tab activa
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', backgroundColor: theme.colors.background}}>
        <TouchableOpacity onPress={() => handlePageChange(0)} style={styles.tabButton}>
          <Text style={[{...styles.activeTabText,color:theme.colors.text}, activeTab === 0 && {...styles.activeTabText,color:theme.customColors.activeColor}]}>
            EVENTOS
          </Text>
    
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePageChange(1)} style={styles.tabButton}>
          <Text style={[{...styles.activeTabText,color:theme.colors.text}, activeTab === 1 && {...styles.activeTabText,color:theme.customColors.activeColor}]}>
            FAVORITOS
          </Text>
        
        </TouchableOpacity>
        
      </View>
      <View style={{height:1.2, backgroundColor: theme.customColors.activeColor, width: '100%'}} />
      <PagerView 
        ref={pagerRef} 
        style={{flex: 1}} 
        initialPage={0}
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)} // actualizamos el estado de la tab activa cuando se cambia de página deslizando
      >
        <View key="1">
          <EventScreen />
        </View>
        <View key="2">
          <FavouriteEventScreen />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: '500',
  }
});
