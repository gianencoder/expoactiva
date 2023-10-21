interface Event {
    _id: number,
    title: string,
    description: string,
    date: Date,
    expositor: string,
    v: number
}

interface BottomTabIcons {
    iconSize: number,
    txtSize: number,
    color: string
}

interface EventoMoshi {
    idEvent: number;
    eventName: string;
    dateHourStart: Date;
    dateHourEnd: Date;
    type: string;
    description: string;
    picture: string;
    idPerson: number;
    person: number;
    isFavorite: boolean
}

interface Exhibitors {
    _id: number
    name: string
    tel: string
    image: string
    logo: string
    description: string
    type: string
    standId: number
    webPage: string
    longitude: number,
    latitude: number
}

interface Ticket {

    _id: number,
    code: string,
    qrCode: string,
    in: boolean,
    state: boolean,
    deviceId: number,
    expireDate: Date,
    shared: boolean
}
