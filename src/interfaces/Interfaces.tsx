interface Event {
    _id: number,
    title: string,
    description: string,
    date: Date,
    expositor: string,
    v: number
}

interface CustomColor {
    transparent: string,
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
}