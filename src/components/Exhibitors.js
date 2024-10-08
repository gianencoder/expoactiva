import React, { useState, useEffect, useContext } from 'react';
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
import SearchBar from '../components/SearchBarComponent';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';

export default function Exhibitors({ onMapPress, selectExhibitor, toggleNavigationMode, toggleFollowUserMode, navigationMode }) {
  const [searchText, setSearchText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext)
  const { languageState } = useLanguage();
  const [translation, setTranslation] = React.useState(translations.es);
  React.useEffect(() => {
    loadTranslations(setTranslation);
  }, [languageState]);

  const getExhibitors = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


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

  const separatorStyle = {
    height: 1,
    backgroundColor: theme.currentTheme === 'light' ? 'lightgray' : '#383838',
    marginTop: 5
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <View style={styles.header}>
        <View style={{ width: '85%', height: 50 }}>
          <SearchBar placeholder={translation.exhibitors.placeholder} onSearchTextChange={setSearchText} setKeyboardVisible={setKeyboardVisible} />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onMapPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <AntDesign name="close" size={22} color={theme.customColors.activeColor} />
        </TouchableOpacity>
      </View>
      <View style={separatorStyle} />
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="darkgreen" />
          </View>
        ) : filteredExpositores.length > 0 ? (
          <FlashList
            data={filteredExpositores}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onScrollBeginDrag={handleScroll}
            estimatedItemSize={200}
            keyboardShouldPersistTaps="always"
          />
        ) : (
          <ScrollView scrollEventThrottle={16} onScrollBeginDrag={handleScroll}>
            <View style={emptyContainerStyle}>
              <Text style={styles.emptyText}>{translation.exhibitors.noResultsText}</Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  closeButton: {
    marginRight: 10,
    marginBottom: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
