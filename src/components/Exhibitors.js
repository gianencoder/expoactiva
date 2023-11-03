import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Keyboard, 
  TouchableOpacity, 
  Text, 
  ScrollView,
  Dimensions
} from 'react-native';
import ExhibitorItem from './ExhibitorItem.js';
import SearchBar from './SearchBar.js';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Exhibitors({ onMapPress, selectExhibitor, toggleNavigationMode, toggleFollowUserMode, navigationMode }) {
  const [searchText, setSearchText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [exhibitors, setExhibitors] = useState([]);

  const getExhibitors = async () => {
    try {
        const exhibitorsString = await AsyncStorage.getItem('@exhibitors');
        if (exhibitorsString !== null) {
            const parsedExhibitors = JSON.parse(exhibitorsString);
            const usableExhibitors = parsedExhibitors.map((exhibitor) => {
                return {
                    ...exhibitor,
                    latitude: parseFloat(exhibitor.latitude),
                    longitude: parseFloat(exhibitor.longitude),
                };
            });
            setExhibitors(usableExhibitors);
        }
    } catch (error) {
        console.log(error);
    }
}

  useEffect(() => {
      getExhibitors();
  }, []);

  const renderItem = React.useCallback(
    ({ item }) => (
      <ExhibitorItem 
        item={item} 
        selectExhibitor={selectExhibitor} 
        toggleNavigationMode={toggleNavigationMode} 
        toggleFollowUserMode={toggleFollowUserMode} 
        navigationMode={navigationMode} 
      />
    ),
    [selectExhibitor, toggleNavigationMode, toggleFollowUserMode, navigationMode]
  );

  const handleScroll = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);
  
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const exhibitorsSorted = React.useMemo(() => {
    const copyOfExhibitors = [...exhibitors];
    return copyOfExhibitors.sort((a, b) => 
      removeAccents(a.name).localeCompare(removeAccents(b.name))
    );
  }, [exhibitors]);
  
  const filteredExpositores = React.useMemo(() => 
    exhibitorsSorted.filter(exp => 
      removeAccents(exp.name.toLowerCase()).includes(removeAccents(searchText.toLowerCase()))
    ),
    [searchText, exhibitorsSorted]
  );

  const emptyContainerStyle = {
    marginTop: keyboardVisible ? Dimensions.get('window').height / 6.2 : Dimensions.get('window').height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
        <View style={styles.container}>
          <View style={styles.header}>
            <SearchBar placeholder="Expositor, Comidas, Baños..." onSearchTextChange={setSearchText} setKeyboardVisible={setKeyboardVisible} />
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onMapPress} 
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <AntDesign name="close" size={22} color="darkgreen" />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.listContainer}>
            {filteredExpositores.length > 0 ? (
              <FlashList
                data={filteredExpositores}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onScroll={handleScroll}
                estimatedItemSize={200}
                keyboardShouldPersistTaps="always"
              />
            ) : (
              <ScrollView scrollEventThrottle={8} onScrollBeginDrag={handleScroll}>
                <View style={emptyContainerStyle}>
                  <Text style={styles.emptyText}>Sin resultados</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  closeButton: {
    marginRight: 15,
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  listContainer: {
    minHeight: 2,
    flex: 1,
    width: '100%',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'gray',
  },
});
