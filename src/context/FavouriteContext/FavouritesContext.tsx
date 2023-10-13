import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define el tipo para el contexto
type FavoritesContextType = {
  favorites: EventoMoshi[];
  addFavorite: (event: EventoMoshi) => void;
  removeFavorite: (id: number) => void;
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
  const [favorites, setFavorites] = useState<EventoMoshi[]>([]);

  const persist = async () => await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
    .then((e) => console.log("Guardando...", favorites.forEach(element => console.log(element.idEvent))))
    .catch(err => console.error(err))



  const addFavorite = (event: EventoMoshi) => {
    setFavorites((prevFavorites) => [...prevFavorites, event]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter(event => event.idEvent !== id));
  };


  useEffect(() => {
    const getPersistEvent = async () => {
      try {
        const data = await AsyncStorage.getItem('favorites');
        if (data !== null) {
          setFavorites(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error al cargar favoritos desde AsyncStorage:', error);
      }
    };
    getPersistEvent();

  }, []);

  useEffect(() => {
    persist()
  }, [favorites])




  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
