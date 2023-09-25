import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { CarouselComponent } from '../components/CarouselComponent';
import { data } from '../helper/imageList';
import { HomeFunction } from '../functions/HomeFunction';
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface Props extends StackScreenProps<any, any> { }
export const HomeScreen = ({ navigation }: Props) => {

    const { theme } = useContext(ThemeContext)

    const { scrollViewRef } = HomeFunction();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
            >
                <View style={{ ...styles.homeContainer, backgroundColor: theme.colors.background }}>
                    <View style={{ ...styles.bigComponentContainer }}>
                        <View style={{ ...styles.bigComponent }}>
                            <CarouselComponent data={data} />
                        </View>
                    </View>
                    <View style={{ ...styles.littleComponentContainer, backgroundColor: theme.colors.background }}>
                        <HomeLittleComponent action={() => navigation.navigate('TicketsScreen')} page={'Entradas'} icon={<Fontisto name='ticket' color={MyColors.primary} size={50} />} />
                        <HomeLittleComponent action={() => navigation.navigate('InterestPointScreen')} page={'Puntos de interés'} icon={<MaterialCommunityIcons name='map-search' color={MyColors.primary} size={50} />} />
                        <HomeLittleComponent action={() => navigation.navigate('EventScreen')} page={'Eventos'} icon={<MaterialIcons name='event-available' color={MyColors.primary} size={50} />} />
                        <HomeLittleComponent action={() => navigation.navigate('GoToPlaceScreen')} page={'Ir a Expoactiva'} icon={<Ionicons name='navigate' color={MyColors.primary} size={50} />} />
                        <HomeLittleComponent action={() => navigation.navigate('WhereIsMyCarScreen')} page={'Ubicar mi vehículo'} icon={<MaterialCommunityIcons name='car-select' color={MyColors.primary} size={50} />} />
                        <HomeLittleComponent action={() => navigation.navigate('ProfileScreen')} page={'Perfil'} icon={<MaterialCommunityIcons name='account' color={MyColors.primary} size={50} />} />
                    </View>
                </View >
            </ScrollView>
        </View>
    )
}
