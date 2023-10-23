import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useAuthContext } from '../context/AuthContext/AuthContext'

export const UserProfileScreen = () => {

    const { user, logout } = useAuthContext()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user?.name}</Text>
            <Text>{user?.email}</Text>
            <Text>{user?.image}</Text>


            <Text onPress={() => logout()} style={{ fontWeight: 'bold', fontSize: 20 }}>Logout</Text>
        </View>
    )
}
