import React, { useContext, useEffect, useState, } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { EventFunction } from '../functions/EventFunction'
import { eventStyle } from '../theme/EventTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const FavouriteEventScreen = () => {
    const { favoritos } = EventFunction()
    const { theme } = useContext(ThemeContext)
    const [favorite, setFavorite] = useState()
    const [name, setName] = useState<string>()

    const save = async () => {

        try {
            await AsyncStorage.setItem("Myname", name!)
            console.log(AsyncStorage.getItem("Myname"))
        } catch (err) {
        }

    }

    const load = async () => {
        try {
            let name = await AsyncStorage.getItem("Myname")

            if (name !== null) {
                setName(name)
            }
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const remove = async () => {
        try {
            await AsyncStorage.removeItem("Myname")
        } catch (err) {
            alert(err)
        } finally {
            setName("")
        }
    }

    return (
        <View style={{ ...eventStyle.container, justifyContent: 'flex-start', alignItems: 'center' }} >
            <Text style={{ marginVertical: 50, fontSize: 20 }}>{name}</Text>
            <TextInput onChangeText={text => setName(text)} style={{ width: 250, height: 50, borderRadius: 10, borderColor: 'black', borderWidth: 1, marginVertical: 10 }} />
            <Button title='Guardar' onPress={save} ></Button>
            {/* <Button title='Eliminar' onPress={remove} color={'red'} ></Button> */}
        </View >

    );

}
