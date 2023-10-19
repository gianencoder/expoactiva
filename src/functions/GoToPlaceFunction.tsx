
import { Linking } from 'react-native';

interface Props {
    appUrl: string,
    webUrl: string,
    optional?: string
}
export const GoToPlaceFunction = ({ appUrl, webUrl, optional }: Props) => {

    const endLatitude = -33.44658027584278
    const endLongitude = -57.897090129037736

    Linking.openURL(`${appUrl}${endLatitude},${endLongitude}${optional}`)
        .catch(() => {
            Linking.openURL(`${webUrl}${endLatitude},${endLongitude}${optional}`);
        });


}
