import { Text, View } from 'react-native';
import { ProfileStyle } from '../theme/ProfileTheme';
import { AntDesign } from '@expo/vector-icons';



export const ProfileScreen = () => {
    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.iconContainer}>
                {/* <Image style={ProfileStyle.img} source={require('../assets/user.png')} /> */}
                <View style={ProfileStyle.iconCircle}>
                    <AntDesign name="user" size={45} color='#616161' style={{ padding: 10 }} />
                </View>
                <Text style={ProfileStyle.txt}>mendoza.gian@hotmail.com</Text>
            </View>
            <View style={ProfileStyle.infoContainer}></View>
            <View style={ProfileStyle.settingContainer}></View>

        </View>
    )
}