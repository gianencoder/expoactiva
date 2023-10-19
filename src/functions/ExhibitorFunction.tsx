import React, { useEffect, useState } from 'react'
import properties from '../../properties.json'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const ExhibitorFunction = () => {
    const [exhibitor, setExhibitor] = useState([])
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');

    const filter = exhibitor.filter((exp: Exhibitors) =>
        exp.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const getExhibitor = async () => {
        await fetch(`${properties.cyberSoftURL}exhibitors/`, {
            method: 'GET',
            headers: {

            }
        })
            .then(async res => await res.json())
            .then(res => {
                setExhibitor(res)
            })
            .catch(err => {
                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "OK", onPress: () => navigation.goBack() }])
                console.error(err)
            }).finally
    }
    useEffect(() => {
        getExhibitor()
    }, [])

    return ({
        exhibitor,
        setSearchText,
        filter
    })

}

