import React, { useContext } from 'react'
import { Image, Text, Linking, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'


interface Props {
  ex: Exhibitors
}

export const ExhibitorComponent = ({ ex }: Props) => {
  const { theme } = useContext(ThemeContext)
  var formattedNumber = ex.tel.replace(/^0*0*5*9*8*(\d{2})(\d{3})(\d{3})$/, '0$1 $2 $3');

  const urlEncodedBase64 = ex.image
  const base64Data = decodeURIComponent(urlEncodedBase64)

  return (
    <TouchableOpacity>
      <View style={{ height: 120, width: '95%', paddingHorizontal: 5, backgroundColor: theme.colors.background, flexDirection: 'row', borderRadius: 30,  }}>
        <View style={{ flex: 1.2,justifyContent:'center'}}>
          <View style={{height:90, width:110, backgroundColor:'blue', borderRadius:15, overflow:'hidden'}}>
          <Image style={{ flex:1 }} source={urlEncodedBase64 !== '' ? { uri: base64Data } : require('../assets/images/noPhoto.jpg')} />
          </View>
        </View>
        <View style={{ flex: 2.5, flexDirection: 'row' }}>
          <View style={{ flex: 3, justifyContent: 'center', paddingHorizontal: 10, gap: 15 }}>
            <Text style={{ color: theme.colors.text, fontSize: 23 }}>{ex.name}</Text>
            <TouchableOpacity style={{ zIndex: 1 }} onPress={() => Linking.openURL(`${ex.webPage}`)}>
              <View style={{ flexDirection: 'row', gap: 5, height: 25, width: '80%', alignItems: 'center' }}>
                <Image style={{ height: 15, width: 15, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/web-page.png')} />
                <Text numberOfLines={2} style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', fontWeight: '400', fontSize: 16, color: theme.colors.text }}>Sitio web</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Image style={{ zIndex: 1, height: 15, width: 15, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/tel.png')} />
              <Text style={{ fontWeight: '400', fontSize: 16, color: theme.colors.text, fontStyle: 'italic' }} onPress={() => { Linking.openURL(`tel:${ex.tel}`) }}>{formattedNumber}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10, }}>
            <Text style={{ textAlign: 'right', color: 'orange', fontStyle: 'italic', fontWeight: 'bold' }}>Stand {ex.standId}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
