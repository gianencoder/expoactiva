
export function dateFormmater(dateTimeString) {
    const date = new Date(dateTimeString);

    // Formatear la fecha en 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Resto del formateo como antes
    const optionsDay = {
        weekday: 'long', // Obtener el nombre del día de la semana
    };
    const optionsTime = {
        hour: 'numeric',  // Obtener la hora en formato de 24 horas
        minute: 'numeric', // Obtener los minutos
    };
    const dayNumber = date.getDate(); // Obtener el número del día del mes
    const formattedDay = new Intl.DateTimeFormat('es-ES', optionsDay).format(date);
    const formattedTime = new Intl.DateTimeFormat('es-ES', optionsTime).format(date);

    return {
        day: formattedDay,
        time: formattedTime,
        dayNumber: dayNumber,
        formattedDate: formattedDate,
    };
}
