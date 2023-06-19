import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';


interface Props extends StackScreenProps<any, any> { }

export const HomeScreen = ({ navigation }: Props) => {

    return (
        <View style={styles.homeContainer}>
            <View style={styles.bigComponentContainer}>
                <View style={styles.bigComponent}></View>
            </View>
            <View style={styles.littleComponentContainer}>
                <HomeLittleComponent action={() => navigation.navigate('TicketsScreen')} page={'Entradas'} icon={<Fontisto name='ticket' color={MyColors.primary} size={50} />} />
                <HomeLittleComponent action={() => navigation.navigate('InterestPointScreen')} page={'Puntos de interes'} icon={<MaterialCommunityIcons name='map-search' color={MyColors.primary} size={50} />} />
                <HomeLittleComponent action={() => navigation.navigate('EventScreen')} page={'Eventos'} icon={<MaterialIcons name='event-available' color={MyColors.primary} size={50} />} />
                <HomeLittleComponent action={() => navigation.navigate('AuthScreen')} page={'Autenticación'} icon={<MaterialCommunityIcons name='login' color={MyColors.primary} size={50} />} />
            </View>


        </View >

    )
}
