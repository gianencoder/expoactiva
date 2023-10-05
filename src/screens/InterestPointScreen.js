import { View } from 'react-native'
import Map from '../components/Map.js'
import { StyleSheet } from 'react-native'

export const InterestPointScreen = () => {
    return (
        <View style={styles.page}>
            <Map />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      height: '100%',
      width: '100%',
    }
  });