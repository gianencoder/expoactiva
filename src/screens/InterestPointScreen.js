import { Modal, View, Text, TouchableOpacity } from 'react-native'
import Map from '../components/Map.js'
import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { HeaderComponent } from '../components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';

export const InterestPointScreen = () => {

    const [visible, setVisible] = useState(false)
    const navigation = useNavigation()

    const showModal = () => {
        setVisible(prevState => !prevState)
        navigation.goBack()
    }

    useEffect(() => {
        setVisible(true)
    }, [])


    return (
        <Modal visible={visible} transparent={true} animationType='slide'>
            <HeaderComponent />
            <TouchableOpacity onPress={
                showModal
            }>
                <Text>Cerrar</Text>
            </TouchableOpacity>
            <View style={styles.page}>
                <Map />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        width: '100%',
    }
});