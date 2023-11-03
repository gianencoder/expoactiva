import React, { useEffect, useState } from 'react'
import axios from 'axios';
import properties from '../../properties.json'

export const useExhibitors = () => {
    const [exhibitors, setExhibitors] = useState<Exhibitors[]>([])
    
    useEffect(() => {
        async function getExhibitors() {
            try {
                const res = await axios.get(`${properties.cyberSoftURL}exhibitors`);
                const exhibitors = res.data.map ((data: any) => {
                    return {
                        ...data,
                        id: data._id,
                    }
                })
                setExhibitors(exhibitors);
            } catch (err) {
                console.log(err);
            }
        }
        getExhibitors();
    }, []);

    return exhibitors;
}
