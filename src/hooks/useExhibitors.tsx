import React, { useEffect, useState } from 'react'
import axios from 'axios';
import properties from '../../properties.json'
import Constants from 'expo-constants';

const apikey = Constants.expoConfig?.extra?.apikey;

export const useExhibitors = () => {
    const [exhibitors, setExhibitors] = useState<Exhibitors[]>([])

    useEffect(() => {
        async function getExhibitors() {
            try {
                axios.defaults.headers.common['apikey'] = apikey;
                const res = await axios.get(`${properties.prod}exhibitors`);
                const exhibitors = res.data.map((data: any) => {
                    return {
                        ...data,
                        id: data._id,
                    }
                })
                setExhibitors(exhibitors);
            } catch (err) {
                console.log('error use exhibitors');
            }
        }
        getExhibitors();
    }, []);

    return exhibitors;
}
