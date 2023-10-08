import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableOpacity } from 'react-native';
import { exhibitors } from '../assets/expositores.js';
import fairStand from '../assets/fair-stand.png';
import ExhibitorItem from './ExhibitorItem.js';
import SearchBar from './SearchBar.js';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

  
  export default function Exhibitors({ onMapPress, selectExhibitor }) {
    const [searchText, setSearchText] = useState('');
    
    const renderItem = React.useCallback(
      ({ item }) => <ExhibitorItem item={item} selectExhibitor={selectExhibitor} fairStand={fairStand} />,
      [selectExhibitor, fairStand]
    );
    
    const handleScroll = React.useCallback(() => {
      Keyboard.dismiss();
    }, []);
    
    const filteredExpositores = React.useMemo(() => 
      exhibitors.filter(exp => exp.name.toLowerCase().includes(searchText.toLowerCase())),
      [searchText]
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar placeholder="Buscar expositores" onSearchTextChange={setSearchText} />
          <TouchableOpacity style={styles.closeButton} onPress={onMapPress} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <AntDesign name="close" size={22} color="darkgreen" />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.listContainer}>
          <FlashList
            data={filteredExpositores}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onScroll={handleScroll}
            estimatedItemSize={200}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      paddingHorizontal: 5,
      paddingTop: 15
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    closeButton: {
      marginRight: 10,
      marginBottom: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 5
    },
    listContainer: {
      minHeight: 2,
      flex: 1,
    },
  });
  