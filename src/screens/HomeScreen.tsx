import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View, Text, Alert } from 'react-native';
import { styles } from '../theme/GlobalTheme';
import { HomeLittleComponent } from '../components/HomeLittleComponent';
import { CarouselComponent } from '../components/CarouselComponent';
import { data2, data } from '../helper/imageList';
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
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<any, any> { }
export const HomeScreen = ({ navigation }: Props) => {

    const { theme } = useContext(ThemeContext)
    const { visible, deletedAccount, user } = useAuthContext()
    const { scrollViewRef } = HomeFunction();
    const [loginVisible, setLoginVisible] = useState(false);
    const [deletedVisible, setDeletedVisible] = useState(false);
    const globalNavigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setLoginVisible(true);
            }, 800)
            setTimeout(() => {
                setLoginVisible(false);
            }, 2600);
        }
    }, [visible]);

    const handleTicketsNavigation = () => {

        if (user === {} as User || user === undefined || user === null) {
            globalNavigation.navigate('AuthScreen');
        } else {
            globalNavigation.navigate('Mis entradas');
        }

    }

    useEffect(() => {
        if (deletedAccount) {
            setDeletedVisible(true);
            setTimeout(() => {
                setDeletedVisible(false);
            }, 5000);
        }
    }, [deletedAccount]);

    useEffect(() => {
        if (theme.currentTheme === 'light') {
            setDarkMode(false)
        }
    }, [theme.currentTheme === 'light'])
    useEffect(() => {
        if (theme.currentTheme === 'dark') {
            setDarkMode(true)
        }
    }, [theme.currentTheme === 'dark'])

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ToastMessageComponent
                width={'90%'}
                visible={loginVisible}
                title={'¡Bien hecho!'}
                message={'Has iniciado sesión con éxito'}
                backgroundColor={theme.customColors.bgSuccesMessage}
                iconColor={theme.customColors.colorSuccessMessage}
                textColor={theme.customColors.colorSuccessMessage}
            />

            <ToastMessageComponent
                width={'90%'}
                visible={deletedVisible}
                title={'Lamentamos que te vayas'}
                iconName={'frowno'}
                message={'Has eliminado tu cuenta con éxito'}
                backgroundColor={theme.customColors.bgWarningMessage}
                iconColor={theme.customColors.colorWarningMessage}
                textColor={theme.customColors.colorWarningMessage}
            />
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
            >
                <View style={{ ...styles.homeContainer, backgroundColor: theme.colors.background }}>

                    <View style={{ ...styles.bigComponentContainer, backgroundColor: theme.customColors.littleComponentBg, shadowColor: 'black' }}>
                        <View style={{ ...styles.bigComponent, backgroundColor: theme.customColors.littleComponentBg }}>
                            {darkMode && <CarouselComponent data={data2} />}
                            {!darkMode && <CarouselComponent data={data} />}
                        </View>
                    </View>
                    <View style={{ ...styles.littleComponentContainer, backgroundColor: theme.colors.background }}>
                        <HomeLittleComponent action={handleTicketsNavigation} page={'Entradas'} icon={<TicketIconComponent />} />
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
