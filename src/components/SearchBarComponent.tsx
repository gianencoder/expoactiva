import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
// import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({ placeholder, onSearchTextChange }: any) {
    const [searchText, setSearchText] = useState('');

    const handleChangeText = (text: any) => {
        setSearchText(text);
        onSearchTextChange(text);
    };

    return (
        <View style={styles.searchWrapper}>
            <AntDesign name="search1" size={20} color="darkgreen" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                value={searchText}
                onChangeText={handleChangeText}
            />
            {searchText ? (
                <TouchableOpacity onPress={() => handleChangeText('')}>
                    <AntDesign name="close" size={20} color="darkgreen" style={styles.closeIcon} />
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
        backgroundColor: '#e8e8e8',
        borderRadius: 15,
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
        backgroundColor: '#e8e8e8',
        height: 40,
        borderRadius: 10,
        fontSize: 18,
    },
});