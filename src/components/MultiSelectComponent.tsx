import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemeContext } from '../context/themeContext/ThemeContext';


interface props {
    selected: []
    data: {
        label: string;
        value: string;
    }[]
    onChange: (value: string[]) => void
}

export const MultiSelectComponent = ({ selected, data, onChange }: props) => {

    const { theme } = useContext(ThemeContext)

    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <MultiSelect
                style={{ ...styles.dropdown, backgroundColor: theme.colors.background }}
                placeholderStyle={{ ...styles.placeholderStyle, color: theme.colors.text }}
                selectedTextStyle={{ ...styles.selectedTextStyle, color: theme.customColors.iconColor }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Seleccionar intereses"
                searchPlaceholder="Buscar intereses..."
                value={selected}
                onChange={onChange}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={theme.colors.text}
                        name="Safety"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: { padding: 10 },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});