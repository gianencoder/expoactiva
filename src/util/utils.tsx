import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import moment from 'moment';
import { Alert } from 'react-native';



export function dateFormmater(dateTimeString) {
    const date = new Date(dateTimeString);

    // Formatear la fecha en 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Resto del formateo como antes
    const optionsDay = {
        weekday: 'long',
    };
    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
    };
    const dayNumber = date.getDate();
    const formattedDay = new Intl.DateTimeFormat('es-ES', optionsDay).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-ES', optionsTime).format(date);

    // Formatear la fecha y hora completa
    const optionsFull = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formattedFullDate = new Intl.DateTimeFormat('es-ES', optionsFull).format(date);

    return {
        day: formattedDay,
        time: formattedTime,
        dayNumber: dayNumber,
        formattedDate: formattedDate,
        formattedFullDate: formattedFullDate,
    };
}



export function formatDate(date: Date) {
    return moment(date).format('DD-MM-YYYY');
};

export function calculateTimeLeft(dateTimeString) {
    return formatDistanceToNow(new Date(dateTimeString), { addSuffix: true, locale: esLocale });
};


export function confirmation(title: string, message: string, txt1: string, txt2: string, method: () => void) {
    Alert.alert(
        title,
        message,
        [
            {
                text: txt1,
            },
            { text: txt2, onPress: method },
        ],
    );
}


