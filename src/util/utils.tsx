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
        const response = await fetch(`${properties.prod}translate`, {
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
            aboutApp: 'Sobre Expoactiva Nacional'
        },
        authScreen: {
            accountTitle: 'Mi cuenta',
            loginSubtitle: 'Inicia sesión para',
            loginSubtitle2: 'tus entradas',
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
        },
        LoginFormScreen: {
            tituloCrearCuenta: "Crear cuenta",
            errorNombreCampoObligatorio: "Nombre y apellido es un campo obligatorio",
            errorFechaCampoObligatorio: "Debes ingresar una fecha",
            errorFechaInvalida: "Debes ingresar una fecha válida",
            labelNombreApellido: "Nombre y Apellido",
            placeholderNombreApellido: "Nombre y Apellido",
            labelFechaNacimiento: "Fecha de nacimiento",
            placeholderFechaNacimiento: "DD-MM-YYYY",
            labelSeleccionarIntereses: "Seleccionar intereses",
            mensajeErrorCampos: "COMPLETA TODA LA INFORMACIÓN",
            mensajeCrear: "CREAR",
            textoCancelar: "Cancelar"
        },
        notificationScreen: {
            desactivarNotificaciones: "Desactivar las notificaciones push",
            activarNotificaciones: "Activar las notificaciones push",
            textoNotificacionesActivadas: "Las notificaciones push se encuentran activadas.\n Si quieres desactivarlas, ten en cuenta que no recibirás recordatorios de eventos favoritos.\n\n Para desactivarlas dirígete a los permisos de la aplicación en la configuración personal de tu teléfono.",
            textoNotificacionesDesactivadas: "Las notificaciones push se encuentran desactivadas.\n\n Para activarlas y recibir recordatorios de eventos, dirígete a los permisos de la aplicación en la configuración personal de tu teléfono.",
            botonAbrirConfiguracion: "Abrir configuración"
        },
        privacyPolicyScreen: {
            termsAndPrivacyTitle: "Términos de Uso y Política de Privacidad",
            welcomeText: "Bienvenido a Expoactiva Nacional, un evento organizado por la Asociación Rural de Soriano. A continuación, detallamos nuestra política de privacidad específica para este evento, para que comprendas cómo manejamos la información recopilada durante tu participación en Expoactiva Nacional.",
            infoCollectedTitle: "Información Recopilada durante Expoactiva Nacional",
            locationCoordinatesSubtitle: "1. Coordenadas de Ubicación",
            locationCoordinatesText: "Durante Expoactiva Nacional, Cyb3rSoft, equipo desarrollador de la aplicación, puede recopilar tus coordenadas de ubicación únicamente cuando hayas otorgado permiso explícito para acceder a tu GPS. Esta información se utilizará para proporcionarte servicios y contenido personalizado relacionado con Expoactiva Nacional, y no se asociará con datos que identifiquen personalmente a un individuo.",
            eventInfoSubtitle: "2. Información del Evento",
            eventInfoText: "Cyb3rSoft puede recopilar información relacionada con tus interacciones dentro de Expoactiva Nacional, como los stands que visitas, las actividades en las que participas y los horarios que seleccionas. Esta información se utiliza para mejorar tu experiencia en el evento y personalizar recomendaciones.",
            interestsAgeSubtitle: "3. Intereses y Edad",
            interestsAgeText: "Con el fin de ofrecerte una experiencia más personalizada durante Expoactiva Nacional, Cyb3rSoft puede recopilar información sobre tus intereses y edad. Estos datos se utilizan exclusivamente para adaptar las recomendaciones y el contenido del evento.",
            useOfInformationTitle: "Uso de la Información",
            useOfInformationText: "La información recopilada durante Expoactiva Nacional se utiliza para mejorar y personalizar tu experiencia en el evento. Cyb3rSoft se compromete a no compartir, vender ni divulgar tus datos personales a terceros de manera que te identifique de manera individual.",
            dataProtectionLawsTitle: "Cumplimiento con las Leyes de Protección de Datos",
            dataProtectionLawsText: "Cyb3rSoft garantiza el cumplimiento con las leyes vigentes de protección de datos personales en Uruguay, especialmente durante la participación en Expoactiva Nacional.",
            rightToRejectTitle: "Derecho de Rechazo",
            rightToRejectText: "Si no estás de acuerdo con nuestra política de privacidad específica para Expoactiva Nacional, te recomendamos que no utilices la aplicación durante el evento. Al no aceptar nuestras políticas, es posible que algunas funcionalidades personalizadas no estén disponibles.",
            privacyPolicyChangesTitle: "Cambios en la Política de Privacidad",
            privacyPolicyChangesText: "Nos reservamos el derecho de modificar esta política en cualquier momento. Las actualizaciones se comunicarán a través de la aplicación.",
            contactTitle: "Contacto",
            contactText: "Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad para Expoactiva Nacional, no dudes en ponerte en contacto con nosotros a través de cybersoft@hotmail.com. Gracias por ser parte de Expoactiva Nacional y confiar en Cyb3rSoft para mejorar tu experiencia en el evento mientras protegemos tu privacidad. ¡Disfruta del evento!"
        },
        reedemTicketScreen: {
            loadingMessage: "Canjea tu entrada",
            emptyCodeErrorMessage: {
                title: "¡Error!",
                message: "Introduce un código, por favor"
            },
            ticketNotFoundError: {
                title: "¡Error!",
                message: "La entrada no existe o no está compartida"
            },

            labelText: "Código",

            placeholder: "Tu código aquí...",
            redeemButtonText: {
                withCode: "CANJEAR",
                withoutCode: "INGRESA UN CÓDIGO"
            },
            cancelButtonText: "Cancelar"
        },
        ticketDetailScreen: {
            presentarQR: "Presentar QR en la entrada al predio para ingresar",
            qrNoValido: "Codigo QR no válido"
        },
        ticketsScreen: {
            myTickets: 'Mis entradas',
            loadingMessage: "Cargando entradas...",
            redeemTicket: "CANJEAR CON CÓDIGO",
            buyTicket: "PRESIONE AQUÍ PARA COMPRAR",
            noTicketsMessage: "No tienes entradas disponibles",
            noTicketsImage: "../assets/images/no-tickets.png",
            noTicketsSubtitle: "No tienes entradas disponibles",
            buyButton: "COMPRAR",
            redeemButton: "CANJEAR",
            successTitle: "¡Bien hecho!",
            successMessage: "Has recibido tu entrada",
            paymentSuccessTitle: "¡Pago recibido!",
            paymentSuccessMessage: "Se ha completado la compra con éxito"
        },
        userProfileScreen: {
            editProfile: "Editar perfil",
            logout: "Cerrar sesión",
            deleteAccount: "Eliminar cuenta",
            confirmLogoutTitle: "Cerrar sesión",
            confirmLogoutMessage: "¿Estás seguro de que quieres cerrar sesión?",
            cancel: "Cancelar",
            confirm: "Confirmar",
            editPhoto: "Editar foto",
            deletePhoto: "Eliminar foto",
            editProfileSuccess: "¡Perfil editado exitosamente!",
            deleteAccountConfirmationTitle: "Eliminar cuenta",
            deleteAccountConfirmationMessage: "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.",
            deleteAccountConfirmationConfirm: "Eliminar",
            sinPermiso: 'Sin permiso',
            deseasPermitirIngresarGaleria: "¿Deseas permitir ingresar a tu galería? ",
            configuracion: "Configuración",
            deseasPermitirUsarTuCamara: "¿Deseas permitir usar tu cámara? ",
            queDeseaRealizar: '¿Que desea realizar?',
            eliminar: 'Eliminar',
            abrirCamara: 'Abrir cámara',
            subirDesdeGaleria: 'Subir desde la galería',
            seleccioneUnaOpcion: 'Selecciona una opción'

        },
        validateCodeScreen: {
            titleTxt: 'Código de verificación',
            subtxt: 'Ingresa el código de verificación enviado a tu correo para iniciar sesión.',
            successMessage: 'El código se ha reenviado',
            errorMessage: 'El código ingresado no es válido',
            expiredMessage: 'Error, el código ha vencido. Reenvía el código y vuelve a intentar.',
            warningMessage: 'Revisa tu email. El código es válido por 10 minutos.',
            resendPrompt: '¿Aún no lo has recibido?',
            resendLink: 'Reenviar',
            confirmButton: 'Confirmar',
            cancelButton: 'Cancelar',
            placeholder: '______',
            bienHechoTitle: '¡Bien hecho!',
            bienHechoMessage: 'El código se ha reenviado',
            errorTitle: '¡Error!',
            errorVencidoTitle: '¡Error, el código ha vencido!',
            errorVencidoMessage: 'Reenvíe el código y vuelva a intentar',
            revisaEmailTitle: '¡Revisa tu correo!',
            revisaEmailMessage: 'El código es válido por 10 minutos',
        },
        visibilityScree: {
            activarModoOscuro: 'Activar modo oscuro',
            desactivarModoOscuro: 'Desactivar modo oscuro',
        },
        bottomTab: {
            inicio: "Inicio",
            misEntradas: "Mis entradas",
            configuracion: "Configuración"
        },
        goToPlaceScreen: {
            googleMaps: "Ir con Google Maps",
            appleMaps: "Ir con Apple Maps",
            waze: "Ir con Waze"
        },
        authComponent: {
            continueWithEmail: "Continuar con correo",
            continueWithGoogle: "Continuar con Google",
            iniciarSesionORegistrarse: "Inicia sesión o regístrate"
        },
        bottomSheetNavigator: {
            meters: "Metros",
            kilometers: "Kilómetros",
            youHaveArrived: "Ha llegado a su destino",
            youAreAtTheSite: "Usted se encuentra en el sitio",
            distanceAway: "A {distance} {unit} de distancia",
            start: "Iniciar",
            cancel: "Cancelar",
            howToGetThere: "Cómo llegar",
            onTheWayTo: "En camino a",
            close: "Cerrar",
            defaultDistanceValue: "0 Metros", // Valor por defecto cuando la distancia no está disponible
            loading: "Cargando" // Para el indicador de carga
        },
        exhibitors: {
            placeholder: "Expositor, Comidas, Baños...",
            noResultsText: "Sin resultados"
        },
        maps: {
            mapNotAvailable: "Mapa no disponible",
            mapAccessPermission: "Para ver el mapa, tiene que permitir el acceso a su ubicación.",
            goToSettings: "Ir a Configuración",
            cancel: "Cancelar",
            navigationCancelled: "Navegación cancelada",
            navigationAutoCancelled: "La navegación se ha cancelado automáticamente después de 1 hora.",
            navigationNotAvailable: "Navegación no disponible",
            navigationDirectionsRequirement: "Para recibir indicaciones, tiene que estar cerca del predio de Expoactiva.",
            howToGetThere: "¿Cómo llegar?",
            search: "Buscar"
        },
        whereismycar: {
            mapNotAvailable: "Mapa no disponible",
            mapAccessPermission: "Para ver el mapa, tiene que permitir el acceso a su ubicación.",
            goToSettings: "Ir a Configuración",
            cancel: "Cancelar",
            removeMarker: "Eliminar marca",
            removeMarkerConfirmation: "¿Estás seguro de que quieres eliminar la marca de tu vehículo?",
            delete: "Eliminar",
            veryCloseToYourCar: "Te encuentras muy cerca de tu vehículo",
            metersToYourCar: "metros hasta tu vehículo",
            deleteMarker: "Eliminar marca",
            markMyCar: "Marcar mi vehículo"
        },
        ticketAlert: {
            proceedWithSharing: "Canjea el siguiente código en la aplicación de Expoactiva para recibir tu entrada:",
            iosShareSuccessTitle: "¡Bien hecho!",
            iosShareSuccessMessage: "La entrada se compartió correctamente",
            iosShareErrorMessage: "Error al compartir",
            androidShareConfirmationTitle: "Compartir entrada",
            androidShareConfirmationMessage: "¿Realmente desea compartir su entrada?",
            androidShareConfirmationNoText: "No",
            androidShareConfirmationNoAction: "Compartir cancelado",
            androidShareConfirmationYesText: "Sí",
            androidShareConfirmationYesAction: "proceedWithSharing",
            androidShareErrorMessage: "Error en la API",
            generalErrorTitle: "Error",
            generalErrorMessage: "Ocurrió un error al compartir la entrada, inténtelo nuevamente"
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
            aboutApp: 'About Expoactiva Nacional'
        },
        authScreen: {
            accountTitle: 'My account',
            loginSubtitle: 'Log in to',
            loginSubtitle2: 'your tickets',
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
        },
        LoginFormScreen: {
            tituloCrearCuenta: "Create Account",
            errorNombreCampoObligatorio: "Name and surname is a required field",
            errorFechaCampoObligatorio: "You must enter a date",
            errorFechaInvalida: "Please enter a valid date",
            labelNombreApellido: "Name and Surname",
            placeholderNombreApellido: "Name and Surname",
            labelFechaNacimiento: "Date of Birth",
            placeholderFechaNacimiento: "DD-MM-YYYY",
            labelSeleccionarIntereses: "Select Interests",
            mensajeErrorCampos: "COMPLETE ALL INFORMATION",
            mensajeCrear: "CREATE",
            textoCancelar: "Cancel"
        },
        notificationScreen: {
            desactivarNotificaciones: "Disable push notifications",
            activarNotificaciones: "Enable push notifications",
            textoNotificacionesActivadas: "Push notifications are enabled.\n If you want to disable them, keep in mind that you won't receive reminders for favorite events.\n\n To disable them, go to the app permissions in your phone's personal settings.",
            textoNotificacionesDesactivadas: "Push notifications are disabled.\n\n To enable them and receive event reminders, go to the app permissions in your phone's personal settings.",
            botonAbrirConfiguracion: "Open settings"
        },

        privacyPolicyScreen: {
            termsAndPrivacyTitle: "Terms of Use and Privacy Policy",
            welcomeText: "Welcome to Expoactiva Nacional, an event organized by the Asociación Rural de Soriano. Below, we outline our specific privacy policy for this event, so you understand how we handle the information collected during your participation in Expoactiva Nacional.",
            infoCollectedTitle: "Information Collected during Expoactiva Nacional",
            locationCoordinatesSubtitle: "1. Location Coordinates",
            locationCoordinatesText: "During Expoactiva Nacional, Cyb3rSoft, the application's development team, may collect your location coordinates only when you have granted explicit permission to access your GPS. This information will be used to provide you with services and personalized content related to Expoactiva Nacional, and will not be associated with personally identifiable data.",
            eventInfoSubtitle: "2. Event Information",
            eventInfoText: "Cyb3rSoft may collect information related to your interactions within Expoactiva Nacional, such as the booths you visit, the activities you participate in, and the schedules you select. This information is used to enhance your experience at the event and personalize recommendations.",
            interestsAgeSubtitle: "3. Interests and Age",
            interestsAgeText: "In order to offer you a more personalized experience during Expoactiva Nacional, Cyb3rSoft may collect information about your interests and age. This data is used exclusively to tailor recommendations and event content.",
            useOfInformationTitle: "Use of Information",
            useOfInformationText: "The information collected during Expoactiva Nacional is used to improve and personalize your experience at the event. Cyb3rSoft is committed to not sharing, selling, or disclosing your personal data to third parties in a way that individually identifies you.",
            dataProtectionLawsTitle: "Compliance with Data Protection Laws",
            dataProtectionLawsText: "Cyb3rSoft ensures compliance with current personal data protection laws in Uruguay, especially during participation in Expoactiva Nacional.",
            rightToRejectTitle: "Right to Reject",
            rightToRejectText: "If you do not agree with our specific privacy policy for Expoactiva Nacional, we recommend that you do not use the application during the event. By not accepting our policies, some personalized features may not be available.",
            privacyPolicyChangesTitle: "Changes to the Privacy Policy",
            privacyPolicyChangesText: "We reserve the right to modify this policy at any time. Updates will be communicated through the application.",
            contactTitle: "Contact",
            contactText: "If you have any questions or concerns about our privacy policy for Expoactiva Nacional, feel free to contact us at cybersoft@hotmail.com. Thank you for being part of Expoactiva Nacional and trusting Cyb3rSoft to enhance your event experience while protecting your privacy. Enjoy the event!"
        },
        reedemTicketScreen: {
            loadingMessage: "Redeem your ticket",
            emptyCodeErrorMessage: {
                title: "Error!",
                message: "Enter a code, please"
            },
            ticketNotFoundError: {
                title: "Error!",
                message: "The ticket does not exist or is not shared"
            },
            labelText: "Code",
            placeholder: "Your code here...",
            redeemButtonText: {
                withCode: "REDEEM",
                withoutCode: "ENTER CODE"
            },
            cancelButtonText: "Cancel"
        },
        ticketDetailScreen: {
            presentarQR: "Present QR at the entrance to access",
            qrNoValido: "Invalid QR Code"
        },
        ticketsScreen: {
            myTickets: 'My tickets',
            loadingMessage: "Loading tickets...",
            redeemTicket: "REDEEM WITH CODE",
            buyTicket: "PRESS HERE TO BUY",
            noTicketsMessage: "You have no available tickets",
            noTicketsImage: "../assets/images/no-tickets.png",
            noTicketsSubtitle: "You have no available tickets",
            buyButton: "BUY",
            redeemButton: "REDEEM",
            successTitle: "Well done!",
            successMessage: "You have received your ticket",
            paymentSuccessTitle: "Payment received!",
            paymentSuccessMessage: "Purchase completed successfully"
        },
        userProfileScreen: {
            editProfile: "Edit profile",
            logout: "Logout",
            deleteAccount: "Delete account",
            confirmLogoutTitle: "Logout",
            confirmLogoutMessage: "Are you sure you want to log out?",
            cancel: "Cancel",
            confirm: "Confirm",
            editPhoto: "Edit photo",
            deletePhoto: "Delete photo",
            editProfileSuccess: "Profile edited successfully!",
            deleteAccountConfirmationTitle: "Delete account",
            deleteAccountConfirmationMessage: "Are you sure you want to delete your account? This action is irreversible.",
            deleteAccountConfirmationConfirm: "Delete",
            sinPermiso: 'No permission',
            deseasPermitirIngresarGaleria: "Do you want to allow access to your gallery?",
            configuracion: "Settings",
            deseasPermitirUsarTuCamara: "Do you want to allow the use of your camera?",
            queDeseaRealizar: 'What do you want to do?',
            eliminar: 'Delete',
            abrirCamara: 'Open camera',
            subirDesdeGaleria: 'Upload from gallery',
            seleccioneUnaOpcion: 'Select an option'
        },
        validateCodeScreen: {
            titleTxt: 'Verification Code',
            subtxt: 'Enter the verification code sent to your email to log in.',
            successMessage: 'The code has been resent',
            errorMessage: 'The entered code is not valid',
            expiredMessage: 'Error, the code has expired. Resend the code and try again.',
            warningMessage: 'Check your email. The code is valid for 10 minutes.',
            resendPrompt: 'Haven\'t received it yet?',
            resendLink: 'Resend',
            confirmButton: 'Confirm',
            cancelButton: 'Cancel',
            placeholder: '______',
            bienHechoTitle: 'Well done!',
            bienHechoMessage: 'The code has been resent',
            errorTitle: 'Error!',
            errorVencidoTitle: 'Error, the code has expired!',
            errorVencidoMessage: 'Resend the code and try again',
            revisaEmailTitle: 'Check your email!',
            revisaEmailMessage: 'The code is valid for 10 minutes',
        },
        visibilityScree: {
            activarModoOscuro: 'Activate Dark Mode',
            desactivarModoOscuro: 'Desactivate Dark Mode',
        },
        bottomTab: {
            inicio: "Home",
            misEntradas: "My tickets",
            configuracion: "Settings"
        },
        goToPlaceScreen: {
            googleMaps: "Go with Google Maps",
            appleMaps: "Go with Apple Maps",
            waze: "Go with Waze"
        },
        authComponent: {
            continueWithEmail: "Continue with email",
            continueWithGoogle: "Continue with Google",
            iniciarSesionORegistrarse: "Log in or register"
        },
        bottomSheetNavigator: {
            meters: "Meters",
            kilometers: "Kilometers",
            youHaveArrived: "You have arrived at your destination",
            youAreAtTheSite: "You are at the site",
            distanceAway: "A {distance} {unit} away",
            start: "Start",
            cancel: "Cancel",
            howToGetThere: "How to get there",
            onTheWayTo: "On the way to",
            close: "Close",
            defaultDistanceValue: "0 Meters", // Default value when distance is not available
            loading: "Loading" // For the loading indicator
        },
        exhibitors: {
            placeholder: "Exhibitor, Food, Bathrooms...",
            noResultsText: "No results"
        },
        maps: {
            mapNotAvailable: "Map not available",
            mapAccessPermission: "To view the map, you must allow access to your location.",
            goToSettings: "Go to Settings",
            cancel: "Cancel",
            navigationCancelled: "Navigation cancelled",
            navigationAutoCancelled: "Navigation has been automatically cancelled after 1 hour.",
            navigationNotAvailable: "Navigation not available",
            navigationDirectionsRequirement: "To receive directions, you must be near the Expoactiva site.",
            howToGetThere: "How to get there?",
            search: "Search"
        },
        whereismycar: {
            mapNotAvailable: "Map not available",
            mapAccessPermission: "To view the map, you must allow access to your location.",
            goToSettings: "Go to Settings",
            cancel: "Cancel",
            removeMarker: "Remove marker",
            removeMarkerConfirmation: "Are you sure you want to remove your vehicle's marker?",
            delete: "Delete",
            veryCloseToYourCar: "You are very close to your vehicle",
            metersToYourCar: "meters to your vehicle",
            deleteMarker: "Remove marker",
            markMyCar: "Mark my vehicle"
        },
        ticketAlert: {
            proceedWithSharing: "Redeem the following code in the Expoactiva app to receive your ticket:",
            iosShareSuccessTitle: "Well done!",
            iosShareSuccessMessage: "The ticket has been shared successfully",
            iosShareErrorMessage: "Error sharing",
            androidShareConfirmationTitle: "Share ticket",
            androidShareConfirmationMessage: "Do you really want to share your ticket?",
            androidShareConfirmationNoText: "No",
            androidShareConfirmationNoAction: "Sharing canceled",
            androidShareConfirmationYesText: "Yes",
            androidShareConfirmationYesAction: "proceedWithSharing",
            androidShareErrorMessage: "API error",
            generalErrorTitle: "Error",
            generalErrorMessage: "An error occurred while sharing the ticket, please try again"
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
            aboutApp: 'Sobre Expoactiva Nacional'
        },
        authScreen: {
            accountTitle: 'Minha conta',
            loginSubtitle: 'Iniciar sessão para',
            loginSubtitle2: 'seus ingressos',
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
            loginTitle: 'Iniciar sessão',
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
        },
        LoginFormScreen: {
            tituloCrearCuenta: "Criar Conta",
            errorNombreCampoObligatorio: "Nome e sobrenome são campos obrigatórios",
            errorFechaCampoObligatorio: "Você deve inserir uma data",
            errorFechaInvalida: "Por favor, insira uma data válida",
            labelNombreApellido: "Nome e Sobrenome",
            placeholderNombreApellido: "Nome e Sobrenome",
            labelFechaNacimiento: "Data de Nascimento",
            placeholderDataNascimento: "DD-MM-AAAA",
            labelSeleccionarIntereses: "Selecionar interesses",
            mensajeErrorCampos: "COMPLETE TODAS AS INFORMAÇÕES",
            mensajeCrear: "CRIAR",
            textoCancelar: "Cancelar"
        },
        notificationScreen: {
            desactivarNotificaciones: "Desativar notificações push",
            activarNotificaciones: "Ativar notificações push",
            textoNotificacionesActivadas: "As notificações push estão ativadas.\n Se deseja desativá-las, tenha em mente que você não receberá lembretes de eventos favoritos.\n\n Para desativá-las, vá para as permissões do aplicativo nas configurações pessoais do seu telefone.",
            textoNotificacionesDesactivadas: "As notificações push estão desativadas.\n\n Para ativá-las e receber lembretes de eventos, vá para as permissões do aplicativo nas configurações pessoais do seu telefone.",
            botonAbrirConfiguracion: "Abrir configurações"
        },
        privacyPolicyScreen: {
            termsAndPrivacyTitle: "Termos de Uso e Política de Privacidade",
            welcomeText: "Bem-vindo ao Expoactiva Nacional, um evento organizado pela Associação Rural de Soriano. Abaixo, detalhamos nossa política de privacidade específica para este evento, para que você compreenda como lidamos com as informações coletadas durante sua participação no Expoactiva Nacional.",
            infoCollectedTitle: "Informações Coletadas durante o Expoactiva Nacional",
            locationCoordinatesSubtitle: "1. Coordenadas de Localização",
            locationCoordinatesText: "Durante o Expoactiva Nacional, a Cyb3rSoft, equipe desenvolvedora do aplicativo, pode coletar suas coordenadas de localização apenas quando você tiver concedido permissão explícita para acessar seu GPS. Essas informações serão utilizadas para fornecer serviços e conteúdo personalizado relacionado ao Expoactiva Nacional e não serão associadas a dados que identifiquem pessoalmente um indivíduo.",
            eventInfoSubtitle: "2. Informações do Evento",
            eventInfoText: "A Cyb3rSoft pode coletar informações relacionadas às suas interações dentro do Expoactiva Nacional, como os estandes que você visita, as atividades em que participa e os horários que seleciona. Essas informações são usadas para aprimorar sua experiência no evento e personalizar recomendações.",
            interestsAgeSubtitle: "3. Interesses e Idade",
            interestsAgeText: "Com o objetivo de oferecer uma experiência mais personalizada durante o Expoactiva Nacional, a Cyb3rSoft pode coletar informações sobre seus interesses e idade. Esses dados são usados exclusivamente para adaptar recomendações e conteúdo do evento.",
            useOfInformationTitle: "Uso das Informações",
            useOfInformationText: "As informações coletadas durante o Expoactiva Nacional são usadas para aprimorar e personalizar sua experiência no evento. A Cyb3rSoft compromete-se a não compartilhar, vender ou divulgar seus dados pessoais a terceiros de maneira que o identifique individualmente.",
            dataProtectionLawsTitle: "Conformidade com as Leis de Proteção de Dados",
            dataProtectionLawsText: "A Cyb3rSoft garante a conformidade com as leis vigentes de proteção de dados pessoais no Uruguai, especialmente durante a participação no Expoactiva Nacional.",
            rightToRejectTitle: "Direito de Recusar",
            rightToRejectText: "Se você não concorda com nossa política de privacidade específica para o Expoactiva Nacional, recomendamos que não use o aplicativo durante o evento. Ao não aceitar nossas políticas, algumas funcionalidades personalizadas podem não estar disponíveis.",
            privacyPolicyChangesTitle: "Alterações na Política de Privacidade",
            privacyPolicyChangesText: "Reservamo-nos o direito de modificar esta política a qualquer momento. As atualizações serão comunicadas por meio do aplicativo.",
            contactTitle: "Contato",
            contactText: "Se tiver alguma dúvida ou preocupação sobre nossa política de privacidade para o Expoactiva Nacional, não hesite em entrar em contato conosco pelo e-mail cybersoft@hotmail.com. Obrigado por fazer parte do Expoactiva Nacional e confiar na Cyb3rSoft para aprimorar sua experiência no evento, ao mesmo tempo que protegemos sua privacidade. Aproveite o evento!"
        },
        reedemTicketScreen: {
            loadingMessage: "Resgate seu ingresso",
            emptyCodeErrorMessage: {
                title: "Erro!",
                message: "Digite um código, por favor"
            },
            ticketNotFoundError: {
                title: "Erro!",
                message: "O ingresso não existe ou não está compartilhado"
            },
            labelText: "Código",
            placeholder: "Seu código aqui...",
            redeemButtonText: {
                withCode: "RESGATAR",
                withoutCode: "INSIRA UM CÓDIGO"
            },
            cancelButtonText: "Cancelar"
        },
        ticketDetailScreen: {
            presentarQR: "Apresentar o QR na entrada para acessar",
            qrNoValido: "Código QR inválido"
        },
        ticketsScreen: {
            myTickets: 'Minhas entradas',
            loadingMessage: "Carregando entradas...",
            redeemTicket: "CANJEAR COM CÓDIGO",
            buyTicket: "PRESIONE AQUÍ PARA COMPRAR",
            noTicketsMessage: "No tienes entradas disponibles",
            noTicketsImage: "../assets/images/sin-resultado.png",
            noTicketsSubtitle: "No tienes entradas disponibles",
            buyButton: "COMPRAR",
            redeemButton: "RESGATAR",
            successTitle: "Feito!",
            successMessage: "Você recebeu seu ingresso",
            paymentSuccessTitle: "Pagamento Recebido!",
            paymentSuccessMessage: "A compra foi concluída com sucesso"
        },
        userProfileScreen: {
            editProfile: "Editar perfil",
            logout: "Sair",
            deleteAccount: "Excluir conta",
            confirmLogoutTitle: "Sair",
            confirmLogoutMessage: "Tem certeza de que deseja sair?",
            cancel: "Cancelar",
            confirm: "Confirmar",
            editPhoto: "Editar foto",
            deletePhoto: "Excluir foto",
            editProfileSuccess: "Perfil editado com sucesso!",
            deleteAccountConfirmationTitle: "Excluir conta",
            deleteAccountConfirmationMessage: "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.",
            deleteAccountConfirmationConfirm: "Excluir",
            sinPermiso: 'Sem permissão',
            deseasPermitirIngresarGaleria: "Deseja permitir o acesso à sua galeria?",
            configuracao: "Configuração",
            deseasPermitirUsarTuCamara: "Deseja permitir o uso de sua câmera?",
            queDeseaRealizar: 'O que deseja realizar?',
            eliminar: 'Excluir',
            abrirCamara: 'Abrir câmera',
            subirDesdeGaleria: 'Carregar da galeria',
            seleccioneUnaOpcion: 'Selecione uma opção'


        },
        validateCodeScreen: {
            titleTxt: 'Código de Verificação',
            subtxt: 'Digite o código de verificação enviado para o seu e-mail para iniciar sessão.',
            successMessage: 'O código foi reenviado',
            errorMessage: 'O código inserido não é válido',
            expiredMessage: 'Erro, o código expirou. Reenvie o código e tente novamente.',
            warningMessage: 'Verifique seu e-mail. O código é válido por 10 minutos.',
            resendPrompt: 'Ainda não recebeu?',
            resendLink: 'Reenviar',
            confirmButton: 'Confirmar',
            cancelButton: 'Cancelar',
            placeholder: '______',
            bienHechoTitle: 'Muito bem!',
            bienHechoMessage: 'O código foi reenviado',
            errorTitle: 'Erro!',
            errorVencidoTitle: 'Erro, o código expirou!',
            errorVencidoMessage: 'Reenvie o código e tente novamente',
            revisaEmailTitle: 'Verifique seu e-mail!',
            revisaEmailMessage: 'O código é válido por 10 minutos',
        },
        visibilityScree: {
            activarModoOscuro: 'Ativar Modo Escuro',
            desactivarModoOscuro: 'Desativar Modo Escuro',
        },
        bottomTab: {
            inicio: "Início",
            misEntradas: "Minhas Entradas",
            configuracion: "Configurações"
        },
        goToPlaceScreen: {
            googleMaps: "Ir com o Google Maps",
            appleMaps: "Ir com o Apple Maps",
            waze: "Ir com o Waze"
        },
        authComponent: {
            continueWithEmail: "Continuar com o e-mail",
            continueWithGoogle: "Continuar com o Google",
            iniciarSesionORegistrarse: "Iniciar sessão ou cadastrar"
        },
        bottomSheetNavigator: {
            meters: "Metros",
            kilometers: "Quilômetros",
            youHaveArrived: "Você chegou ao seu destino",
            youAreAtTheSite: "Você está no local",
            distanceAway: "A",
            distanceAway2: "de distância",
            start: "Iniciar",
            cancel: "Cancelar",
            howToGetThere: "Como chegar",
            onTheWayTo: "A caminho de",
            close: "Fechar",
            defaultDistanceValue: "0 Metros", // Valor padrão quando a distância não está disponível
            loading: "Carregando" // Para o indicador de carregamento
        },
        exhibitors: {
            placeholder: "Expositor, Comidas, Banheiros...",
            noResultsText: "Sem resultados"
        },
        maps: {
            mapNotAvailable: "Mapa não disponível",
            mapAccessPermission: "Para ver o mapa, você deve permitir o acesso à sua localização.",
            goToSettings: "Ir para Configurações",
            cancel: "Cancelar",
            navigationCancelled: "Navegação cancelada",
            navigationAutoCancelled: "A navegação foi cancelada automaticamente após 1 hora.",
            navigationNotAvailable: "Navegação não disponível",
            navigationDirectionsRequirement: "Para receber direções, você deve estar perto do local da Expoactiva.",
            howToGetThere: "Como chegar?",
            search: "Buscar"
        },
        whereismycar: {
            mapNotAvailable: "Mapa não disponível",
            mapAccessPermission: "Para ver o mapa, você deve permitir o acesso à sua localização.",
            goToSettings: "Ir para Configurações",
            cancel: "Cancelar",
            removeMarker: "Remover marca",
            removeMarkerConfirmation: "Tem certeza de que deseja remover a marca do seu veículo?",
            delete: "Excluir",
            veryCloseToYourCar: "Você está muito perto do seu veículo",
            metersToYourCar: "metros até o seu veículo",
            deleteMarker: "Remover marca",
            markMyCar: "Marcar meu veículo"
        },
        ticketAlert: {
            proceedWithSharing: "Resgate o seguinte código no aplicativo Expoactiva para receber seu ingresso:",
            iosShareSuccessTitle: "Feito!",
            iosShareSuccessMessage: "O ingresso foi compartilhado com sucesso",
            iosShareErrorMessage: "Erro ao compartilhar",
            androidShareConfirmationTitle: "Compartilhar ingresso",
            androidShareConfirmationMessage: "Você realmente deseja compartilhar seu ingresso?",
            androidShareConfirmationNoText: "Não",
            androidShareConfirmationNoAction: "Compartilhamento cancelado",
            androidShareConfirmationYesText: "Sim",
            androidShareConfirmationYesAction: "proceedWithSharing",
            androidShareErrorMessage: "Erro na API",
            generalErrorTitle: "Erro",
            generalErrorMessage: "Ocorreu um erro ao compartilhar o ingresso, tente novamente"
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

