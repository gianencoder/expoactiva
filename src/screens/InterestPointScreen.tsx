import React from 'react'
import WebView from 'react-native-webview'
import mapHtmlScript from '../helper/htmlScript/mapHtmlScript'

export const InterestPointScreen = () => {
    return (
        <WebView source={{ html: mapHtmlScript }} style={{}} />

    )
}
