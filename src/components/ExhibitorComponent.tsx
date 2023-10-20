import React, { useContext, useState } from 'react'
import { Image, Text, Linking, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { eventStyle } from '../theme/EventTheme'
import { Ionicons } from '@expo/vector-icons'
import { exhibitorTheme } from '../theme/ExhibitorTheme'


interface Props {
  ex: Exhibitors
  selectEx: (id: number) => void
}

export const ExhibitorComponent = ({ ex, selectEx }: Props) => {
  const { theme } = useContext(ThemeContext)
  const [isFavorite, setIsFavorite] = useState(true)
  var formattedNumber = ex.tel.replace(/^0*0*5*9*8*(\d{2})(\d{3})(\d{3})$/, '0$1 $2 $3');

  return (
    <View style={{ backgroundColor: 'transparent', flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => selectEx(ex._id)}
      >
        <View style={eventStyle.event}>
          <View style={eventStyle.eventListImg}>
            {ex.logo === null ? <Image style={{ ...eventStyle.img, height: 120, width: 105 }} source={require('../assets/images/noPhoto.jpg')} /> : <Image style={eventStyle.img} source={{ uri: ex.logo.toString() }} />}
          </View>
          <View style={{ ...eventStyle.eventListTitle, marginVertical: 5 }}>
            <Text numberOfLines={1} style={{ ...eventStyle.titleTxt, color: theme.colors.text, textTransform: 'uppercase' }}>{ex.name}</Text>
            <Text style={{ ...eventStyle.titleMinutes, width: '100%' }}>{ex.type}</Text>
            <View style={exhibitorTheme.linksView}>
              <Image style={{ ...exhibitorTheme.linksImg, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/web-page.png')} />
              <Text onPress={() => { Linking.openURL(ex.webPage) }} numberOfLines={1} style={{ ...exhibitorTheme.wbeSiteTxt, color: theme.colors.text }}>Sitio web</Text>
            </View>
            <View style={exhibitorTheme.linksView}>
              <Image style={{ ...exhibitorTheme.linksImg, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/tel.png')} />
              <Text style={{ ...exhibitorTheme.phoneTxt, color: theme.colors.text }} onPress={() => { Linking.openURL(`tel:${ex.tel}`) }}>{formattedNumber}</Text>
            </View>
          </View>
          <View style={eventStyle.eventListFavourite}>
            <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} activeOpacity={.5} >
              <View style={{ height: 60, width: 60, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 40 }}>
                <Ionicons style={{ position: 'absolute' }} name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'} size={24} color={isFavorite ? '#A50000' : theme.customColors.activeColor} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={exhibitorTheme.stand}>Stand {ex.standId}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    // <TouchableOpacity>
    //   <View style={{ height: 120, width: '95%', paddingHorizontal: 5, backgroundColor: theme.colors.background, flexDirection: 'row', borderRadius: 30, }}>
    //     <View style={{ flex: 1.2, justifyContent: 'center' }}>
    //       <View style={eventStyle.eventListImg}>
    //         {ex.image === null ? <Image style={{ ...eventStyle.img, height: 120, width: 105 }} source={require('../assets/images/noPhoto.jpg')} /> : <Image style={eventStyle.img} source={{ uri: ex.image.toString() }} />}
    //       </View>
    //     </View>
    //     <View style={{ flex: 2.5, flexDirection: 'row' }}>
    //       <View style={{ flex: 3, justifyContent: 'center', paddingHorizontal: 10, gap: 15 }}>
    //         <Text numberOfLines={2} style={{ ...eventStyle.titleTxt, color: theme.colors.text }}>{ex.name}</Text>
    //         <TouchableOpacity style={{ zIndex: 1 }} onPress={() => Linking.openURL(`${ex.webPage}`)}>
    //           <View style={{ flexDirection: 'row', gap: 5, height: 25, width: '80%', alignItems: 'center' }}>
    //             <Image style={{ height: 15, width: 15, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/web-page.png')} />
    //             <Text numberOfLines={2} style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid', fontWeight: '400', fontSize: 16, color: theme.colors.text }}>Sitio web</Text>
    //           </View>
    //         </TouchableOpacity>
    //         <View style={{ flexDirection: 'row', gap: 5 }}>
    //           <Image style={{ zIndex: 1, height: 15, width: 15, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/tel.png')} />
    //           <Text style={{ fontWeight: '400', fontSize: 16, color: theme.colors.text, fontStyle: 'italic' }} onPress={() => { Linking.openURL(`tel:${ex.tel}`) }}>{formattedNumber}</Text>
    //         </View>
    //       </View>
    //       <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10, }}>
    //         <Text style={{ textAlign: 'right', color: 'orange', fontStyle: 'italic', fontWeight: 'bold' }}>Stand {ex.standId}</Text>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  )
}
