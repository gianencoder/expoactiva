import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';


interface Props extends StackScreenProps<any, any> { }

export const HomeScreen = ({ navigation }: Props) => {

    return (
        <View style={styles.homeContainer}>
            <View style={styles.bigComponentContainer}>
                <View style={styles.bigComponent}></View>
            </View>

            <View style={styles.littleComponentContainer}>
                <HomeLittleComponent action={() => navigation.navigate('Tickets')} page={'Entradas'} />
                <HomeLittleComponent action={() => navigation.navigate('InterestPoints')} page={'Puntos de interes'} />
                <HomeLittleComponent action={() => navigation.navigate('Settings')} page={'Settings'} />
                <HomeLittleComponent action={() => navigation.navigate('AuthScreen')} page={'Auth'} />
            </View>


        </View >

    )
}
