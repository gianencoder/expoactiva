import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";

// Define el tipo para el contexto
type FavoritesContextType = {
  favorites: number[];
  addFavorite: (event: number) => void;
  removeFavorite: (id: number, eventFunction: boolean) => void;
};

// Crear un contexto
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

type FavoritesProviderProps = {
  children: ReactNode;
};


export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const persist = async () => await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
    .then()
    .catch(err => new Error(err))



  const addFavorite = (event: number) => {
    setFavorites((prevFavorites) => [...prevFavorites, event]);
  };

  const removeFavorite = async (id: number, eventFunction: boolean) => {
    if (eventFunction) {
      setFavorites((prevFavorites) => prevFavorites.filter(event => event !== id));
      return
    }
    const userDecision = await presentRemoveFavoriteAlert();
    userDecision && setFavorites((prevFavorites) => prevFavorites.filter(event => event !== id));
  };


  useEffect(() => {
    const getPersistEvent = async () => {
      try {
        const data = await AsyncStorage.getItem('favorites');
        if (data !== null) {
          setFavorites(JSON.parse(data));
        }
      } catch (error) {
        throw new Error('Error')
      }
    };
    getPersistEvent();

  }, []);

  useEffect(() => {
    persist()
  }, [favorites])


  const presentRemoveFavoriteAlert = () => {
    return new Promise(resolve => {
      Alert.alert(
        '¿Desea eliminar el favorito?',
        '',
        [
          { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
          { text: 'Eliminar', onPress: () => resolve(true), style: 'destructive' }
        ]
      );
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
