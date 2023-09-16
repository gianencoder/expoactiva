import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const NavigationHook = () => {
    const navigation = useNavigation();
    const [goBack, setgoBack] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            const canGoBack = navigation.canGoBack()
            if (canGoBack) {
                setgoBack(true)
            } else {
                setgoBack(false)
            }
        });
        return unsubscribe;
    }, []);

    return ({
        goBack,
        navigation,
    })
}


