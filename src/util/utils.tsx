import React, { useEffect, useState } from 'react'
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
        // Verificar si la traducción está en caché
        const cacheKey = `${language}_${text}`;
        const cachedTranslation = await AsyncStorage.getItem(cacheKey);

        if (cachedTranslation) {
            // Si está en caché, devolver la traducción almacenada
            return cachedTranslation;
        }

        // Si no está en caché, realizar la solicitud de traducción
        const response = await fetch(`${properties.desa}traducir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texto: text,
                idiomaDestino: language,
            }),
        });

        if (response.ok) {
            // Obtener la traducción y almacenarla en caché
            const result = await response.json();
            const translation = result.traduccion;

            // Almacenar en caché la traducción para futuras llamadas
            await AsyncStorage.setItem(cacheKey, translation);

            return translation;
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

    es: {
        aboutExpoactivaScreen: {
            text1: 'Expoactiva Nacional es una iniciativa de la Asociación Rural de Soriano, asociación de productores rurales del departamento, con más de 120 años de trabajo en equipo.',
            text2: 'En el marco de los festejos de los 100 años, en el año 1992, se organiza la 1era Expoactiva Nacional. Se realiza en el mes de abril de aquel año, en el predio del establecimiento “Santa Amelia” y se concreta como un evento de proyección con el sello de la Asociación Rural de Soriano. En la misma ya se mostraban actividades prácticas de labores agrícolas lo que hoy le llamamos muestra activa.',
            text3: 'Edición tras edición se fueron presentando los cambios de forma activa, cada evento tenía su proyección nacional y también regional, lo que hace que esta muestra tenga un concepto diferente; recibir público del sector proveniente de toda la región.',
            text4: 'En la actualidad está consolidada como la mayor muestra de agro negocios del país. Durante los cuatro días que dura el evento, participan más de 300 expositores y se presentan más de 750 marcas generando un impacto positivo en la región en áreas de conocimiento y tecnología. Los avances del sector los puedes ver en Expoactiva Nacional.'
        },
        configurationScreen: {
            configuration: 'Configuración',
            myAccount: 'Mi cuenta',
            notifications: 'Notificaciones',
            appearance: 'Apariencia',
            changeLanguage: 'Cambiar idioma',
            privacyPolicy: 'Política de privacidad y términos',
            helpAndSupport: 'Ayuda y soporte',
            aboutApp: 'Sobre Expoactiva Nacional App'
        },
        authScreen: {
            accountTitle: 'Mi cuenta',
            loginSubtitle: 'Inicia sesión para listar, comprar y compartir tus entradas',
            loginButton: 'Iniciar sesión',
            noAccountText: '¿No tienes cuenta?',
            createAccount: 'Presiona aquí',
            listar: 'listar',
            comprar: 'comprar',
            compartir: 'compartir'
        },
        buyTicketScreen: {
            showToastTitle: '¡Pago rechazado!',
            showToastMessage: 'No se pudo realizar la compra',
            expoactivaTitle: 'Expoactiva Nacional',
            quantityLabel: 'Cantidad',
            totalLabel: 'TOTAL',
            confirmButton: 'CONFIRMAR',
        },
        changeLanguage: {
            español: "Español",
            ingles: "Inglés",
            portugues: "Portugués"
        },
        editProfileScreen: {
            title: 'Editar perfil',
            toastSuccessTitle: '¡Bien hecho!',
            toastSuccessMessage: 'Usuario guardado con éxito',
            toastErrorEmptyNameTitle: '¡Error!',
            toastErrorEmptyNameMessage: 'El campo nombre es obligatorio',
            toastErrorBadDateTitle: '¡Error!',
            toastErrorBadDateMessage: 'Complete el campo con una fecha válida',
            nameLabel: 'Nombre y Apellido',
            dateOfBirthLabel: 'Fecha de nacimiento',
            selectInterestsLabel: 'Seleccionar intereses',
            saveButtonLabel: 'GUARDAR',
            cancelButtonLabel: 'Cancelar',
        },
        emailScreen: {
            errorTitle: '¡Error!',
            errorMessage: 'El email no es válido',
            emptyEmailError: 'No puedes dejar el campo vacío',
            warningTitle: '¡Cuidado!',
            warningMessage: 'Has alcanzado el límite de solicitudes, vuelve a intentarlo en unos minutos...',
            loginTitle: 'Iniciar sesión',
            emailLabel: 'Email',
            requiredSymbol: '*',
            placeholder: 'ejemplo@hotmail.com',
            continueButton: 'CONTINUAR',
            invalidEmailMessage: 'EMAIL INVÁLIDO',
            enterEmailMessage: 'INGRESA EMAIL PARA CONTINUAR',
            cancelButton: 'Cancelar',
        },
        eventDetails: {
            enCurso: 'En Curso',
            finalizado: 'Finalizado',
        },
        eventScreen: {
            searchPlaceholder: "Buscar nombre del evento...",
            active: "ACTIVA",
            conference: "CONFERENCIA",
            exhibitor: "EXPOSITOR",
            livestock: "GANADERA",
            noEvents: "No hay eventos para mostrar",
        },
        exhibitorDetails: {
            website: 'Sitio web'
        },
        exhibitorScreen: {
            searchPlaceholder: "Buscar nombre o número stand...",
            noExhibitors: "No hay expositores para mostrar"
        },
        favouriteScree: {
            searchBarPlaceholder: 'Buscar nombre del evento...',
            loadingText: 'Cargando...',
            noEventsText: 'No hay eventos para mostrar',
            noFavoritesText: 'No has agregado ningún favorito',
            extraOptionText: 'Presiona aquí para agregar...',
        },
        homeScreen: {
            Bien_hecho: "¡Bien hecho!",
            Has_iniciado_sesión_con_éxito: "Has iniciado sesión con éxito",
            Lamentamos_que_te_vayas: "Lamentamos que te vayas",
            Has_eliminado_tu_cuenta_con_éxito: "Has eliminado tu cuenta con éxito",
            Entradas: "Entradas",
            Mapa_expo: "Mapa expo",
            Eventos: "Eventos",
            Ir_a_Expoactiva: "Ir a Expoactiva",
            Ubicar_mi_vehículo: "Ubicar mi vehículo",
            Expositores: "Expositores"
        }
    },
    en: {
        aboutExpoactivaScreen: {
            text1: 'Expoactiva Nacional is an initiative of the Asociación Rural de Soriano, an association of rural producers in the department, with more than 120 years of teamwork.',
            text2: 'In the context of the celebrations for the 100 years, in 1992, the 1st Expoactiva Nacional is organized. It takes place in the month of April of that year, on the premises of the "Santa Amelia" establishment, and materializes as an event of projection with the stamp of the Asociación Rural de Soriano. In it, practical activities of agricultural work were already shown, what we now call an active exhibition.',
            text3: 'Edition after edition, changes were actively presented, each event had its national and also regional projection, which makes this exhibition have a different concept; receiving the public from the sector from the entire region.',
            text4: 'Currently, it is consolidated as the largest agribusiness exhibition in the country. During the four days of the event, more than 300 exhibitors participate, and more than 750 brands are presented, generating a positive impact on the region in areas of knowledge and technology. You can see the advances of the sector at Expoactiva Nacional.'
        },
        configurationScreen: {
            configuration: 'Settings',
            myAccount: 'My account',
            notifications: 'Notifications',
            appearance: 'Appearance',
            changeLanguage: 'Change language',
            privacyPolicy: 'Privacy policy and terms',
            helpAndSupport: 'Help and support',
            aboutApp: 'About Expoactiva Nacional App'
        },
        authScreen: {
            accountTitle: 'My account',
            loginSubtitle: 'Log in to list, buy, and share your tickets',
            loginButton: 'Log in',
            noAccountText: 'Don\'t have an account?',
            createAccount: 'Press here',
            listar: 'list',
            comprar: 'buy',
            compartir: 'share'
        },
        buyTicketScreen: {
            showToastTitle: 'Payment rejected!',
            showToastMessage: 'Purchase could not be completed',
            expoactivaTitle: 'Expoactiva Nacional',
            quantityLabel: 'Quantity',
            totalLabel: 'TOTAL',
            confirmButton: 'CONFIRM',
        },
        changeLanguage: {
            español: "Spanish",
            ingles: "English",
            portugues: "Portuguese"
        },
        editProfileScreen: {
            title: 'Edit profile',
            toastSuccessTitle: 'Well done!',
            toastSuccessMessage: 'User saved successfully',
            toastErrorEmptyNameTitle: 'Error!',
            toastErrorEmptyNameMessage: 'The name field is required',
            toastErrorBadDateTitle: 'Error!',
            toastErrorBadDateMessage: 'Please complete the field with a valid date',
            nameLabel: 'Name and Surname',
            dateOfBirthLabel: 'Date of birth',
            selectInterestsLabel: 'Select interests',
            saveButtonLabel: 'SAVE',
            cancelButtonLabel: 'Cancel',
        },
        emailScreen: {
            errorTitle: 'Error!',
            errorMessage: 'The email is not valid',
            emptyEmailError: 'You cannot leave the field empty',
            warningTitle: 'Caution!',
            warningMessage: 'You have reached the limit of requests, please try again in a few minutes...',
            loginTitle: 'Log in',
            emailLabel: 'Email',
            requiredSymbol: '*',
            placeholder: 'example@hotmail.com',
            continueButton: 'CONTINUE',
            invalidEmailMessage: 'INVALID EMAIL',
            enterEmailMessage: 'ENTER EMAIL TO CONTINUE',
            cancelButton: 'Cancel',
        },
        eventDetails: {
            enCurso: 'In Progress',
            finalizado: 'Completed',
        },
        eventScreen: {
            searchPlaceholder: "Search event name...",
            active: "ACTIVE",
            conference: "CONFERENCE",
            exhibitor: "EXHIBITOR",
            livestock: "LIVESTOCK",
            noEvents: "No events to display",
        },
        exhibitorDetails: {
            website: 'Website'
        },
        exhibitorScreen: {
            searchPlaceholder: "Search by name or stand number...",
            noExhibitors: "No exhibitors to show"
        },
        favouriteScree: {
            searchBarPlaceholder: 'Search event name...',
            loadingText: 'Loading...',
            noEventsText: 'No events to display',
            noFavoritesText: 'You haven\'t added any favorites',
            extraOptionText: 'Press here to add...',
        },
        homeScreen: {
            Bien_hecho: "Well done!",
            Has_iniciado_sesión_con_éxito: "You have successfully logged in",
            Lamentamos_que_te_vayas: "We're sorry to see you go",
            Has_eliminado_tu_cuenta_con_éxito: "You have successfully deleted your account",
            Entradas: "Tickets",
            Mapa_expo: "Expo Map",
            Eventos: "Events",
            Ir_a_Expoactiva: "Go to Expoactiva",
            Ubicar_mi_vehículo: "Locate my vehicle",
            Expositores: "Exhibitors"
        }
    },
    pt: {
        aboutExpoactivaScreen: {
            text1: 'Expoactiva Nacional é uma iniciativa da Asociación Rural de Soriano, associação de produtores rurais do departamento, com mais de 120 anos de trabalho em equipe.',
            text2: 'No contexto das comemorações pelos 100 anos, em 1992, é organizada a 1ª Expoactiva Nacional. Realiza-se no mês de abril daquele ano, nas dependências do estabelecimento "Santa Amelia", e se concretiza como um evento de projeção com o selo da Asociación Rural de Soriano. Nele, já eram mostradas atividades práticas de trabalhos agrícolas, o que hoje chamamos de mostra ativa.',
            text3: 'Edição após edição, as mudanças foram sendo apresentadas de forma ativa, cada evento tinha sua projeção nacional e também regional, o que faz desta mostra ter um conceito diferente; receber público do setor proveniente de toda a região.',
            text4: 'Atualmente, está consolidada como a maior mostra de agronegócios do país. Durante os quatro dias do evento, participam mais de 300 expositores e são apresentadas mais de 750 marcas, gerando um impacto positivo na região em áreas de conhecimento e tecnologia. Você pode ver os avanços do setor na Expoactiva Nacional.'
        },
        configurationScreen: {
            configuration: 'Configuração',
            myAccount: 'Minha conta',
            notifications: 'Notificações',
            appearance: 'Aparência',
            changeLanguage: 'Mudar idioma',
            privacyPolicy: 'Política de privacidade e termos',
            helpAndSupport: 'Ajuda e suporte',
            aboutApp: 'Sobre o aplicativo Expoactiva Nacional'
        },
        authScreen: {
            accountTitle: 'Minha conta',
            loginSubtitle: 'Faça login para listar, comprar e compartilhar seus ingressos',
            loginButton: 'Iniciar sessão',
            noAccountText: 'Não tem uma conta?',
            createAccount: 'Pressione aqui',
            listar: 'listar',
            comprar: 'comprar',
            compartir: 'compartilhar'
        },
        buyTicketScreen: {
            showToastTitle: 'Pagamento recusado!',
            showToastMessage: 'Não foi possível concluir a compra',
            expoactivaTitle: 'Expoactiva Nacional',
            quantityLabel: 'Quantidade',
            totalLabel: 'TOTAL',
            confirmButton: 'CONFIRMAR',
        },
        changeLanguage: {
            español: "Espanhol",
            ingles: "Inglês",
            portugues: "Português"
        },
        editProfileScreen: {
            title: 'Editar perfil',
            toastSuccessTitle: 'Muito bem!',
            toastSuccessMessage: 'Usuário salvo com sucesso',
            toastErrorEmptyNameTitle: 'Erro!',
            toastErrorEmptyNameMessage: 'O campo do nome é obrigatório',
            toastErrorBadDateTitle: 'Erro!',
            toastErrorBadDateMessage: 'Complete o campo com uma data válida',
            nameLabel: 'Nome e Sobrenome',
            dateOfBirthLabel: 'Data de nascimento',
            selectInterestsLabel: 'Selecionar interesses',
            saveButtonLabel: 'SALVAR',
            cancelButtonLabel: 'Cancelar',
        },
        emailScreen: {
            errorTitle: 'Erro!',
            errorMessage: 'O email não é válido',
            emptyEmailError: 'Você não pode deixar o campo vazio',
            warningTitle: 'Cuidado!',
            warningMessage: 'Você atingiu o limite de solicitações, tente novamente em alguns minutos...',
            loginTitle: 'Login',
            emailLabel: 'Email',
            requiredSymbol: '*',
            placeholder: 'exemplo@hotmail.com',
            continueButton: 'CONTINUAR',
            invalidEmailMessage: 'EMAIL INVÁLIDO',
            enterEmailMessage: 'INSIRA O EMAIL PARA CONTINUAR',
            cancelButton: 'Cancelar',
        },
        eventDetails: {
            enCurso: 'Em Andamento',
            finalizado: 'Concluído',
        },
        eventScreen: {
            searchPlaceholder: "Buscar nome do evento...",
            active: "ATIVO",
            conference: "CONFERÊNCIA",
            exhibitor: "EXPOSITOR",
            livestock: "PECUÁRIA",
            noEvents: "Nenhum evento para mostrar",
        },
        exhibitorDetails: {
            website: 'Site web'
        },
        exhibitorScreen: {
            searchPlaceholder: "Pesquisar por nome ou número do estande...",
            noExhibitors: "Não há expositores para mostrar"
        },
        favouriteScree: {
            searchBarPlaceholder: 'Buscar nome do evento...',
            loadingText: 'Carregando...',
            noEventsText: 'Nenhum evento para mostrar',
            noFavoritesText: 'Você não adicionou nenhum favorito',
            extraOptionText: 'Pressione aqui para adicionar...',
        },
        homeScreen: {
            Bien_hecho: "Bem feito!",
            Has_iniciado_sesión_con_éxito: "Você fez login com sucesso",
            Lamentamos_que_te_vayas: "Lamentamos que você vá",
            Has_eliminado_tu_cuenta_con_éxito: "Você excluiu sua conta com sucesso",
            Entradas: "Ingressos",
            Mapa_expo: "Mapa da Expo",
            Eventos: "Eventos",
            Ir_a_Expoactiva: "Ir para a Expoactiva",
            Ubicar_mi_vehículo: "Localizar meu veículo",
            Expositores: "Expositores"
        }
    }
};


export const loadTranslations = async (setTranslation) => {

    // Obtén el idioma guardado en AsyncStorage (asegúrate de haberlo almacenado previamente)
    const storedLanguage = await AsyncStorage.getItem('language');

    // Define el conjunto de traducciones según el idioma
    switch (storedLanguage) {
        case 'en':
            setTranslation(translations.en);
            break;
        case 'pt':
            setTranslation(translations.pt);
            break;
        default:
            setTranslation(translations.es);
            break;
    }
};

