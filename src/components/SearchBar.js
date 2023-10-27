import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({ placeholder, onSearchTextChange, setKeyboardVisible }) {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeText = (text) => {
    setSearchText(text);
    onSearchTextChange(text);
  };

  return (
    <View style={styles.search}>
      <View style={styles.searchWrapper}>
        <AntDesign name="search1" size={20} color="darkgreen" style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          value={searchText}
          onChangeText={handleChangeText}
          autoCorrect={false}
          autoComplete='off'
          onFocus={() => setKeyboardVisible(true)}
          onBlur={() => setKeyboardVisible(false)}
        />
        {searchText ? (
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => handleChangeText('')}>
            <AntDesign name="close" size={20} color="darkgreen" style={styles.closeIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    width: '95%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    width: '100%',
    height: 40,
  },
  searchIcon: {
    paddingHorizontal: 15,
  },
  closeIcon: {
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    height: 40,
    borderRadius: 20,
    fontSize: 18,
  },
});