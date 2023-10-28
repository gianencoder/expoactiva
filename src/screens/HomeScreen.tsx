import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';
import { CarouselComponent } from '../components/CarouselComponent';
import { data } from '../helper/imageList';
import { HomeFunction } from '../functions/HomeFunction';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { InteresPointIconComponent } from '../components/Icons/InteresPointIconComponent';
import { TicketIconComponent } from '../components/Icons/TicketIconComponent';
import { EventIconComponent } from '../components/Icons/EventIconComponent';
import { GoToPlaceIconComponent } from '../components/Icons/GoToPlaceIconComponent';
import { WhereIsMyCarIconComponent } from '../components/Icons/WhereIsMyCarIconComponent';
import { ExhibitorsComponent } from '../components/Icons/MyProfileIconComponent';
import { ToastMessageComponent } from '../components/ToastMessageComponent';
import { useAuthContext } from '../context/AuthContext/AuthContext';

interface Props extends StackScreenProps<any, any> { }
export const HomeScreen = ({ navigation }: Props) => {

    const { theme } = useContext(ThemeContext)
    const { visible } = useAuthContext()
    const { scrollViewRef } = HomeFunction();
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setToastVisible(true);
            }, 300);
            setTimeout(() => {
                setToastVisible(false);
            }, 2500);
        }
    }, [visible]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ToastMessageComponent visible={toastVisible} title={'¡Bien hecho!'} message={'Has iniciado sesión correctamente'} />
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
            >
                <View style={{ ...styles.homeContainer, backgroundColor: theme.colors.background }}>

                    <View style={{ ...styles.bigComponentContainer, backgroundColor: theme.customColors.littleComponentBg, shadowColor: 'black' }}>
                        <View style={{ ...styles.bigComponent, backgroundColor: theme.customColors.littleComponentBg }}>
                            <CarouselComponent data={data} />
                        </View>

                    </View>
                    <View style={{ ...styles.littleComponentContainer, backgroundColor: theme.colors.background }}>
                        <HomeLittleComponent action={() => navigation.navigate('TicketsScreen')} page={'Entradas'} icon={<TicketIconComponent />} />
                        <HomeLittleComponent action={() => navigation.navigate('InterestPointScreen')} page={'Mapa expo'} icon={<GoToPlaceIconComponent />} />
                        <HomeLittleComponent action={() => navigation.navigate('TopTabNavigtorEvent')} page={'Eventos'} icon={<EventIconComponent />} />
                        <HomeLittleComponent action={() => navigation.navigate('GoToPlaceScreen')} page={'Ir a Expoactiva'} icon={<InteresPointIconComponent />} />
                        <HomeLittleComponent action={() => navigation.navigate('WhereIsMyCarScreen')} page={'Ubicar mi vehículo'} icon={<WhereIsMyCarIconComponent />} />
                        <HomeLittleComponent action={() => navigation.navigate('Exhibitors')} page={'Expositores'} icon={<ExhibitorsComponent />} />
                    </View>
                </View >
            </ScrollView>
        </View>
    )
}
