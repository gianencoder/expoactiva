import React, { useEffect, useState } from 'react'
import properties from '../../properties.json'
import { Alert, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ExhibitorDetails } from '../screens/ExhibitorDetails';


export const ExhibitorFunction = () => {
    const [exhibitor, setExhibitor] = useState<Exhibitors[]>([])
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState({});
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(true);

    const filter = exhibitor.filter((exp: Exhibitors) =>
        exp.name.toLowerCase().includes(searchText.toLowerCase()) || exp.standId.toString().includes(searchText)
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
                setLoading(false)
            })
            .catch(err => {
                Alert.alert("Hubo un problema obteniendo la información",
                    "Intenta nuevamente en unos minutos",
                    [{ text: "OK", onPress: () => navigation.goBack() }])
                throw new Error(err)
            }).finally(() => setFetching(false))
    }


    useEffect(() => {
        getExhibitor()
    }, [fetching])

    const handleSetFetching = () => {
        setFetching(true)
    }


    const selectExhibitor = (id: number) => {

        try {
            const selectEx = filter.find(ex => ex._id === id)
            if (selectEx === null) {
                return false
            }
            navigation.navigate('ExhibitorDetail', {
                name: selectEx?.name
                , tel: selectEx?.tel
                , image: selectEx?.image
                , logo: selectEx?.logo
                , description: selectEx?.description
                , type: selectEx?.type
                , standId: selectEx?.standId
                , webPage: selectEx?.webPage
                , longitude: selectEx?.longitude
                , latitude: selectEx?.latitude
            })

        } catch (error) {
            throw new Error('No se pudo seleccionar el objeto')
        }
    }

    function formatearURL(url) {
        return url.replace("https://www.", "");
    }

    function goSite(url: string) {

        return Linking.openURL(url).catch(err => {
            Alert.alert('No se ha podido visitar el sitio',
                "Si el problema persiste ponte en contacto con los administradores",
                [{ text: "Ok" }])
        })
    }

    function callPhone(url: string) {
        return Linking.openURL(`tel:${url}`).catch(err => {

            Alert.alert('No se ha podido realizar la llamda',
                "Si el problema persiste ponte en contacto con los administradores",
                [{ text: "Ok" }])
        })
    }


    const showInMap = (id: number) => {

        try {
            const selectEx = filter.find(ex => ex._id === id)
            if (selectEx === null) {
                return false
            }
            navigation.navigate('InterestPointScreen', {
                id: selectEx?._id
                , name: selectEx?.name
                , image: selectEx?.image
                , logo: selectEx?.logo
                , description: selectEx?.description
                , type: selectEx?.type
                , standId: selectEx?.standId
                , longitude: selectEx?.longitude
                , latitude: selectEx?.latitude
                , previousScreen: 'ExhibitorDetail'
            })

        } catch (error) {
            throw new Error('No se pudo seleccionar el objeto')
        }
    }




    return ({
        exhibitor
        , setSearchText
        , filter
        , selectExhibitor
        , selected
        , formatearURL
        , goSite
        , showInMap
        , callPhone
        , fetching
        , loading
        , handleSetFetching
    })

}

