import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MyColors } from '../theme/ColorsTheme';
import { useIsFocused } from '@react-navigation/native';
import { CarouselComponent } from '../components/CarouselComponent';
import { data } from '../helper/imageList';



interface Props extends StackScreenProps<any, any> { }

export const HomeScreen = ({ navigation }: Props) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const isFocused = useIsFocused(); //Se esta mostrando la pantalla?
    useEffect(() => {
        //Si la pantalla se esta mostrando y si existe una referencia al scrollView
        if (isFocused && scrollViewRef.current) {

            const delay = 50;
            const timeout = setTimeout(() => {
                scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [isFocused]);

    return (
        <View style={styles.homeContainer}>
            <View style={styles.bigComponentContainer}>
                <View style={styles.bigComponent}>
                    <CarouselComponent data={data} />
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
            >
                <View style={styles.littleComponentContainer}>
                    <HomeLittleComponent action={() => navigation.navigate('TicketsScreen')} page={'Entradas'} icon={<Fontisto name='ticket' color={MyColors.primary} size={50} />} />
                    <HomeLittleComponent action={() => navigation.navigate('InterestPointScreen')} page={'Puntos de interés'} icon={<MaterialCommunityIcons name='map-search' color={MyColors.primary} size={50} />} />
                    <HomeLittleComponent action={() => navigation.navigate('EventScreen')} page={'Eventos'} icon={<MaterialIcons name='event-available' color={MyColors.primary} size={50} />} />
                    <HomeLittleComponent action={() => navigation.navigate('GoToPlaceScreen')} page={'Ir a Expoactiva'} icon={<Ionicons name='navigate' color={MyColors.primary} size={50} />} />
                    <HomeLittleComponent action={() => navigation.navigate('WhereIsMyCarScreen')} page={'Ubicar mi vehículo'} icon={<MaterialCommunityIcons name='car-select' color={MyColors.primary} size={50} />} />
                    <HomeLittleComponent action={() => navigation.navigate('ProfileScreen')} page={'Perfil'} icon={<MaterialCommunityIcons name='account-wrench' color={MyColors.primary} size={50} />} />
                </View>
            </ScrollView>
        </View >

    )
}
