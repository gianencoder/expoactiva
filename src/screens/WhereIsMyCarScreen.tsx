import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { WhereIsMyCarFunction } from '../functions/WhereIsMyCarFunction';
import { ActivityIndicator, Text, View } from 'react-native';
import { MyColors } from '../theme/ColorsTheme';


export const WhereIsMyCarScreen = () => {
    const { isLoading, location } = WhereIsMyCarFunction()
    return (
        isLoading ?
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={MyColors.primary} />
                <Text style={{ padding: 10, fontSize: 16 }}>Obteniendo información...</Text>
            </View> :
            <MapView
                initialRegion={{
                    latitude: location!.coords.latitude,
                    longitude: location!.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                style={{ flex: 1 }}
            >
                <Marker
                    coordinate={{ latitude: location!.coords.latitude, longitude: location!.coords.longitude }}
                />
            </MapView>
    )
}
