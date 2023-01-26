import {Dictionary} from "utils/types";

export const sortByTimestamp = (first: [string, number], second: [string, number]) => {
    const firstTS = first[0];
    const firstH = parseInt(firstTS.slice(0, 2));
    const firstM = parseInt(firstTS.slice(3, 5));
    const secondTS = second[0];
    const secondH = parseInt(secondTS.slice(0, 2));
    const secondM = parseInt(secondTS.slice(3, 5));
    if(firstH > secondH) return 1;
    if(firstH < secondH) return -1;
    if(firstM > secondM) return 1;
    if(firstM < secondM) return -1;
    return 0;
}
export function getLastItemInMap<Key, Value>(map: Map<Key, Value>): [Key, Value]|[0, 0] {
    const last = Array.from(map)[map.size-1];
    return (last === undefined) ? [0, 0] : last;
}
export function getLastKeyInMap<Key, Value>(map: Map<Key, Value>): Key|0 {
    const last = Array.from(map)[map.size-1];
    return (last === undefined) ? 0 : last[0];
}
export function getLastValueInMap<Key, Value>(map: Map<Key, Value>): Value|0 {
    const last = Array.from(map)[map.size-1];
    return (last === undefined) ? 0 : last[1];
}
export const dictionaryToString = (dict: Dictionary[]) => {
    console.log(dict);
    let str = '';
    for(let row of dict) {
        const date = new Date(row.timestamp.seconds * 1000);
        str = str + date.toLocaleString("it-IT") + ';' + row.value + '\n';
    }
    return str.replaceAll(',', '');
}

export const generateID = () => {
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    let lastPushTime = 0;
    const lastRandChars = [];
    let now = new Date().getTime();
    const duplicateTime = (now === lastPushTime);
    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        now = Math.floor(now / 64);
    }
    let id = timeStampChars.join('');
    if (!duplicateTime) {
        for (let i = 0; i < 12; i++) lastRandChars[i] = Math.floor(Math.random() * 64);
    } else {
        let index = 11;
        while(index >= 0 && lastRandChars[index] === 63) lastRandChars[index] = 0;
        lastRandChars[index]++;
    }
    for (let i = 0; i < 12; i++) id += PUSH_CHARS.charAt(lastRandChars[i]);
    return id;
}

export const monthString = (date: Date) => {
    const month = date.getMonth();
    switch(month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default: return '';
    }
}
