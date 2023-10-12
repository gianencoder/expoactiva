
import { Linking } from 'react-native';


export const GoToPlaceFunction = () => {

    const endLatitude = -33.44658027584278
    const endLongitude = -57.897090129037736

    const wazeNavigate = () => {
        const wazeUrl = `waze://?ll=${endLatitude},${endLongitude}&navigate=yes`;
        Linking.openURL(wazeUrl)
            .catch(() => {
                const webUrl = `https://www.waze.com/ul?ll=${endLatitude},${endLongitude}&navigate=yes`;
                Linking.openURL(webUrl);
            });
    };

    const iosNavigate = () => {
        const iosUrl = `http://maps.apple.com/?daddr=${endLatitude},${endLongitude}`

        Linking.openURL(iosUrl)
            .catch(() => {
                const webUrl = `https://www.apple.com/maps/dir/?daddr=${endLatitude},${endLongitude}`;
                Linking.openURL(webUrl);
            })
    }

    const androidNavigate = () => {
        const androidUrl = `https://www.google.com/maps/dir/?api=1&destination=${endLatitude},${endLongitude}`
        Linking.openURL(androidUrl)
            .catch(() => {
                const webUrl = `https://www.google.com/maps/place/${endLongitude},${endLongitude}`
                Linking.openURL(webUrl)
            })
    }
    return ({
        androidNavigate,
        iosNavigate,
        wazeNavigate,
    })
}
