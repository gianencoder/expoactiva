import React from 'react'
import { View, TouchableOpacity, Text, TouchableNativeFeedback } from 'react-native';
import { styles } from '../theme/GlobalTheme';



interface Props {
    action: (pagina: string) => void,
    page: string
}

export const HomeLittleComponent = ({ action, page }: Props) => {
    return (
        <View style={styles.homeComponents}>
            <TouchableOpacity style={styles.buttonComponent}
                onPress={() => action(page)}>
                <Text>{page}</Text>
            </TouchableOpacity>

        </View >

    )
}


