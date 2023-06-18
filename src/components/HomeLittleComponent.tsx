import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../theme/GlobalTheme';



interface Props {
    action: (pagina: string) => void,
    page: string,
    icon: JSX.Element
}

export const HomeLittleComponent = ({ action, page, icon }: Props) => {
    return (
        <View style={styles.homeComponents}>
            <TouchableOpacity style={{ ...styles.buttonComponent, flexDirection: 'column' }}
                onPress={() => action(page)}>
                {icon}
                <Text style={styles.littleComponentTxt}>{page}</Text>
            </TouchableOpacity>

        </View >

    )
}


