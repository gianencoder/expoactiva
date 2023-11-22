import React, { useContext, useState } from 'react'
import { Image, Text, Linking, TouchableOpacity, ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { eventStyle } from '../theme/EventTheme'
import { Ionicons } from '@expo/vector-icons'
import { exhibitorTheme } from '../theme/ExhibitorTheme'
import { ExhibitorFunction } from '../functions/ExhibitorFunction'
import { formatPhoneNumber } from '../util/utils'


interface Props {
  ex: Exhibitors
  selectEx: (id: number) => void
}

export const ExhibitorComponent = ({ ex, selectEx }: Props) => {
  const { theme } = useContext(ThemeContext)
  const [imgLoader, setImgLoader] = useState(false)

  const { goSite, callPhone, whatsapp } = ExhibitorFunction()

  return (
    <View style={{ backgroundColor: 'transparent', flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => selectEx(ex.id)}
      >
        <View style={eventStyle.event}>
          <View style={{ ...eventStyle.eventListImg, justifyContent: 'center', alignItems: 'center' }}>
            {imgLoader && <ActivityIndicator style={{ justifyContent: 'center', position: 'absolute', alignItems: 'center' }} color={theme.customColors.activeColor} />}
            {ex.logo === null || !ex.logo ? <Image style={{ ...eventStyle.img, height: 120, width: 105 }} source={require('../assets/images/noPhoto.jpg')} /> : <Image onLoadStart={() => setImgLoader(true)} onLoadEnd={() => setImgLoader(false)} style={{ height: 100, width: 100, borderRadius: 15 }} source={{ uri: ex.logo.toString() }} />}
          </View>
          <View style={{ ...eventStyle.eventListTitle, marginVertical: 5 }}>
            <Text numberOfLines={1} style={{ ...eventStyle.titleTxt, color: theme.colors.text, textTransform: 'uppercase' }}>{ex.name}</Text>
            <Text style={{ ...eventStyle.titleMinutes, width: '100%' }}>{ex.type}</Text>
            {ex.webPage && <View style={exhibitorTheme.linksView}>
              <Image style={{ ...exhibitorTheme.linksImg, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/web-page.png')} />
              <Text onPress={() => goSite(ex.webPage)} numberOfLines={1} style={{ ...exhibitorTheme.wbeSiteTxt, color: theme.colors.text }}>Sitio web</Text>
            </View>
            }
            {ex.tel && <View style={exhibitorTheme.linksView}>
              <Image style={{ ...exhibitorTheme.linksImg, tintColor: theme.customColors.activeColor }} source={require('../assets/icons/tel.png')} />
              <Text style={{ ...exhibitorTheme.phoneTxt, color: theme.colors.text }} onPress={() => callPhone(ex.tel)}>{formatPhoneNumber(ex.tel)}</Text>
            </View>
            }
          </View>
          <View style={eventStyle.eventListFavourite}>
            <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} activeOpacity={.5} >
              <View style={{ height: 60, width: 60, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 40 }}>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={exhibitorTheme.stand}>Stand {ex.standId}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
