import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface Props {
    action: (pagina: string) => void,
    page: string,
    icon: JSX.Element
}

export const HomeLittleComponent = ({ action, page, icon }: Props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...styles.homeComponents, backgroundColor: theme.colors.background }}>
            <TouchableOpacity style={{ ...styles.buttonComponent, flexDirection: 'column', backgroundColor: theme.customColors.littleComponentBg }}
                onPress={() => action(page)} activeOpacity={0.2} >
                {icon}
                <Text style={{ ...styles.littleComponentTxt, color: theme.colors.text }}>{page}</Text>
            </TouchableOpacity>

        </View >

    )
}


