import React, { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import moment from 'moment';
import { Alert } from 'react-native';
import properties from '../../properties.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function capitalize(word: any) {
    if (word && typeof word === 'string') {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return '';
}

export function formatPhoneNumber(phoneNumber: any) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    if (cleaned.length === 9) {
        // Formato XXX XXX XXX
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (cleaned.length === 8) {
        // Formato XXXX XXXX
        return cleaned.replace(/(\d{4})(\d{4})/, '$1 $2');
    } else {
        return phoneNumber;
    }
}

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

export function confirmation(title: string, message: string, txt1: string, txt2: string, method: () => void, style: "cancel" | "default" | "destructive" | undefined) {
    Alert.alert(
        title,
        message,
        [
            {
                text: txt1,
            },
            { text: txt2, onPress: method, style: style }
        ],
    );
}

export const data = [
    { label: 'Agricultura', value: 'Agricultura' },
    { label: 'Automóviles', value: 'Automóviles' },
    { label: 'Ganadería', value: 'Ganadería' },
    { label: 'Lácteos', value: 'Lacteos' },
    { label: 'Máquinas', value: 'Máquinas' },
    { label: 'Tecnología', value: 'Tecnología' },
];

export function filterFormmat(date) {
    return moment(date).format('YYYY-MM-DD');
};

export async function translate(text: string, language: string): Promise<string> {
    try {
        const response = await fetch(`${properties.desa}traducir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texto: text,
                idiomaDestino: language
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result.traduccion;
        } else {
            // Manejar errores de la solicitud
            throw new Error('Error en la solicitud de traducción');
        }

    } catch (error) {
        console.log('Error en la traducción:', error);

        // Establecer automáticamente el idioma español
        AsyncStorage.setItem('language', 'es');

        // Lanzar una excepción personalizada para detener la ejecución
        throw new Error('Traducción fallida');
    }
}




export const translations = {

    aboutExpoactivaScreen: {
        text1: 'Expoactiva Nacional es una iniciativa de la Asociación Rural de Soriano, asociación de productores rurales del departamento, con más de 120 años de trabajo en equipo.',
        text2: 'En el marco de los festejos de los 100 años, en el año 1992, se organiza la 1era Expoactiva Nacional. Se realiza en el mes de abril de aquel año, en el predio del establecimiento “Santa Amelia” y se concreta como un evento de proyección con el sello de la Asociación Rural de Soriano. En la misma ya se mostraban actividades prácticas de labores agrícolas lo que hoy le llamamos muestra activa.',
        text3: 'Edición tras edición se fueron presentando los cambios de forma activa, cada evento tenía su proyección nacional y también regional, lo que hace que esta muestra tenga un concepto diferente; recibir público del sector proveniente de toda la región.',
        text4: 'En la actualidad está consolidada como la mayor muestra de agro negocios del país. Durante los cuatro días que dura el evento, participan más de 300 expositores y se presentan más de 750 marcas generando un impacto positivo en la región en áreas de conocimiento y tecnología. Los avances del sector los puedes ver en Expoactiva Nacional.',
    },

    configurationScreen: {
        configuration: 'Configuración',
        myAccount: 'Mi cuenta',
        notifications: 'Notificaciones',
        appearance: 'Apariencia',
        changeLanguage: 'Cambiar idioma',
        privacyPolicy: 'Política de privacidad y términos',
        helpAndSupport: 'Ayuda y soporte',
        aboutApp: 'Sobre Expoactiva Nacional App',
    }
};

