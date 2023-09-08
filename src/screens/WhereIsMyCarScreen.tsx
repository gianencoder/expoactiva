import React from 'react'
import { LoadingScreen } from './LoadingScreen'
import MapView, { Marker } from 'react-native-maps';
import { WhereIsMyCarFunction } from '../functions/WhereIsMyCarFunction';
import { StackScreenProps } from '@react-navigation/stack';
interface Props extends StackScreenProps<any, any> { }


export const WhereIsMyCarScreen = ({ navigation }: Props) => {
    const { isLoading, location } = WhereIsMyCarFunction(navigation)
    return (
        isLoading ? <LoadingScreen></LoadingScreen> :
            <MapView
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                style={{ flex: 1 }}
            >
                <Marker
                    coordinate={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude }}
                />
            </MapView>
    )
}
