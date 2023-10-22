import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
// import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export default function SearchBar({ placeholder, onSearchTextChange }: any) {
    const [searchText, setSearchText] = useState('');
    const { theme } = useContext(ThemeContext)

    const handleChangeText = (text: any) => {
        setSearchText(text);
        onSearchTextChange(text);
    };

    return (
        <View style={{ ...styles.searchWrapper, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}>
            <AntDesign name="search1" size={20} color={theme.customColors.activeColor} style={styles.searchIcon} />
            <TextInput
                style={{ ...styles.searchInput, color: theme.currentTheme === 'light' ? 'black' : 'white', backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                placeholder={placeholder}
                placeholderTextColor={theme.currentTheme === 'light' ? 'gray' : 'darkgray'}
                value={searchText}
                autoCorrect={false}
                autoComplete='off'
                onChangeText={handleChangeText}
            />
            {searchText ? (
                <TouchableOpacity onPress={() => handleChangeText('')}>
                    <AntDesign name="close" size={20} color={theme.customColors.activeColor} style={styles.closeIcon} />
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    // search: {
    //     width: '10%',
    //     height: '15%',
    //     justifyContent: 'center',
    //     marginBottom: 15,
    //     paddingHorizontal: '5%',
    //     backgroundColor: 'white'
    // },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        width: '100%',
    },
    searchIcon: {
        paddingHorizontal: 15,
    },
    closeIcon: {
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 25,
        fontSize: 18,
    },
});