import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import { exhibitors } from '../assets/expositores.js';
import fairStand from '../assets/fair-stand.png';
import ExhibitorItem from './ExhibitorItem.js';
import SearchBar from './SearchBar.js';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

export default function Exhibitors({ onMapPress, selectExhibitor }) {
  const [searchText, setSearchText] = useState('');
  
  const handleScroll = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);


  const filteredExpositores = React.useMemo(() => 
    exhibitors.filter(exp => exp.name.toLowerCase().includes(searchText.toLowerCase())),
    [searchText]
  );


  const renderItem = ({ item }) => <ExhibitorItem item={item} selectExhibitor={selectExhibitor} fairStand={fairStand} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar placeholder="Buscar expositores" onSearchTextChange={(text) => setSearchText(text)} />
        <TouchableOpacity style={styles.closeButton} onPress={onMapPress}>
          <AntDesign name="close" size={22} color="darkgreen" />
        </TouchableOpacity>
      </View>
      <View style={{height: 1, backgroundColor: '#E0E0E0', marginLeft: 20, marginRight: 20, marginBottom: 5}} />
        <View style={{ minHeight: 2,flex:1}}>
        <FlashList
          data={filteredExpositores}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          estimatedItemSize={300}
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
  bottomSheetFlatListContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
