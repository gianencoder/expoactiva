import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventFunction } from './EventFunction';



export const FavouriteEventFunction = () => {
    const { favoritos, setFavoritos } = EventFunction()


    const agregarFavorito = async (item: Event) => {
        try {
            // Recupera la lista de favoritos actual desde AsyncStorage
            const favoritosGuardados = await AsyncStorage.getItem('favoritosUsuario');

            let nuevaListaFavoritos = [];

            if (favoritosGuardados) {
                // Si ya hay elementos en la lista de favoritos, conviértelos de JSON a un array
                nuevaListaFavoritos = JSON.parse(favoritosGuardados);
            }

            // Verifica si el elemento ya está en la lista de favoritos antes de agregarlo
            if (!nuevaListaFavoritos.some((favorito: Event) => favorito._id === item._id)) {
                nuevaListaFavoritos.push(item);

                // Almacena la lista actualizada de favoritos en AsyncStorage
                await AsyncStorage.setItem('favoritosUsuario', JSON.stringify(nuevaListaFavoritos));

                // Actualiza el estado local de favoritos
                setFavoritos(nuevaListaFavoritos);
            }
        } catch (error) {
            console.error('Error al agregar favorito:', error);
        }
    };

    const quitarFavorito = async (item: Event) => {
        const { } = EventFunction()
        try {
            // Recupera la lista de favoritos actual desde AsyncStorage
            const favoritosGuardados = await AsyncStorage.getItem('favoritosUsuario');

            if (favoritosGuardados) {
                // Convierte la lista de favoritos de JSON a un array
                let listaFavoritos = JSON.parse(favoritosGuardados);

                // Filtra los elementos para eliminar el que deseas quitar
                listaFavoritos = listaFavoritos.filter((favorito: Event) => favorito._id !== item._id);

                // Almacena la lista actualizada de favoritos en AsyncStorage
                await AsyncStorage.setItem('favoritosUsuario', JSON.stringify(listaFavoritos));

                // Actualiza el estado local de favoritos
                setFavoritos(listaFavoritos);
            }
        } catch (error) {
            console.error('Error al quitar favorito:', error);
        }
    };

    return (
        {
            agregarFavorito
        }
    )

}


