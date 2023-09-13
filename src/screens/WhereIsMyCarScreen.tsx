import React from 'react'
import { LoadingScreen } from './LoadingScreen'
import MapView, { Marker } from 'react-native-maps';
import { WhereIsMyCarFunction } from '../functions/WhereIsMyCarFunction';


export const WhereIsMyCarScreen = () => {
    const { isLoading, location } = WhereIsMyCarFunction()
    return (
        isLoading ? <LoadingScreen></LoadingScreen> :
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
