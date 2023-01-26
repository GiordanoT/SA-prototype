import {initializeApp} from 'firebase/app';
import {deleteDoc, getFirestore, limit, onSnapshot, orderBy} from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import {Dictionary, WhereFilterOp} from 'utils/types';
import {editState} from "services/redux";
import {userSlice} from "services/redux/store";
import {Slice} from "@reduxjs/toolkit";

const firebaseConfig = {
    apiKey: "AIzaSyDo4TiRAwV_5DXtB6pzSXSCQeOP4OE6sBs",
    authDomain: "energy-community.firebaseapp.com",
    projectId: "energy-community",
    storageBucket: "energy-community.appspot.com",
    messagingSenderId: "656493736588",
    appId: "1:656493736588:web:8a9ffd70fc408f46b9c1a9",
    measurementId: "G-6DJYMYZ3FR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function load(store: Slice, path: string, id: number) {
    const DB = doc(db, path, id.toString());
    onSnapshot(DB, (doc) => {
        editState(store, "", doc.data() as Dictionary);
    });
}

export async function select(path: string, fields?: string[], op?: WhereFilterOp, value?: string|boolean|number){
    const DB = collection(db, path);
    let list: Dictionary[] = [];
    if(fields && op && value){
        for( let field of fields){
            let q = query(DB, where(field, op, value));
            let qs = await getDocs(q);
            qs.forEach((doc) => {
                list.push(doc.data());
            })
        }
    } else {
        let q = query(DB);
        let qs = await getDocs(q);
        qs.forEach((doc) => {
            list.push(doc.data());
        })
    }
    return list;
}

export async function write(path: string, id: number|string, value: Dictionary){
    const DB = doc(db, path, id.toString());
    await setDoc(DB, value,{ merge: true });
}

export async function overwrite(path: string, id:number|string, value: Dictionary){
    const DB = doc(db, path, id.toString());
    await setDoc(DB, value);
}

export async function remove(path: string, id:number|string){
    const DB = doc(db, path, id.toString());
    await deleteDoc(DB);
}

export async function signin (email: string, username: string, password: string) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const uid = result.user.uid;
        const users = await select("users");
        const id = users.length;
        await write("users", id, {id, username, email, uid, solarPanels: 0, windTurbines: 0, route: 0});
        const dict: Dictionary = {id, username, email, uid, solarPanels: 0, windTurbines: 0, route: 0}
        editState(userSlice, '', dict);
        return true;
    } catch (error) { return false; }
}

    export async function login (email: string, password: string) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const profile = await select("users", ["uid"], "==", result.user.uid);
            await write("users", profile[0].id, {route: 0});
            editState(userSlice, '', profile[0]);
            return true;
        } catch (error) { return false; }
    }

export async function logout () {
    await signOut(auth);
    const dict: Dictionary = {id: 0, username: '', email: '', uid: '', solarPanels: 0, windTurbines: 0, route: 0}
    editState(userSlice, '', dict);
}

export async function sensorsData(path: string, id: number, user: number, fixed?: number){
    if(!fixed) fixed = 10;
    const DB = collection(db, path);
    const list: Dictionary[] = [];
    const date = new Date(Date.now());
    date.setHours(date.getHours(), date.getMinutes() - 10, 0, 0);
    const q = query(
        DB,
        where('user', '==', user),
        where('number', "==", id),
        where('timestamp', ">=", date),
        orderBy("timestamp", "desc"),
        limit(fixed)
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    return list;
}

export async function sensorsUnlimitedData(path: string, id: number, user: number){
    const DB = collection(db, path);
    const list: Dictionary[] = [];
    const q = query(
        DB,
        where('user', '==', user),
        where('number', "==", id),
        orderBy("timestamp", "desc")
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    return list;
}

export async function consumptionsData(user: number, fixed?: number) {
    const DB = collection(db, 'consumptions');
    const list: Dictionary[] = [];
    let q;
    if(!fixed) { q = query(DB, where('user', '==', user), orderBy("timestamp", "desc")); }
    else { q = query(DB, where('user', '==', user), orderBy("timestamp", "desc"), limit(fixed));  }
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    return list;
}

export async function productionsData(user: number, fixed?: number) {
    const DB = collection(db, 'productions');
    const list: Dictionary[] = [];
    let q;
    if(!fixed) { q = query(DB, where('user', '==', user), orderBy("timestamp", "desc")); }
    else { q = query(DB, where('user', '==', user), orderBy("timestamp", "desc"), limit(fixed));  }
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    return list;
}

export async function monthConsumptions(user: number) {
    const DB = collection(db, 'consumptions');
    const list: Dictionary[] = [];
    const before = new Date();
    before.setDate(1); before.setHours(0, 0,0, 0);
    const after = new Date();
    after.setMonth(after.getMonth() + 1, 1); after.setHours(0, 0,0, 0);
    const q = query(DB,
        where('user', '==', user),
        where('timestamp', '>=', before),
        where('timestamp', '<', after),
        orderBy("timestamp", "desc"));
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    let consumptions = 0;
    for(let row of list) {
        consumptions += row['value'];
    }
    return consumptions;
}

export async function monthProductions(user: number) {
    const DB = collection(db, 'productions');
    const list: Dictionary[] = [];
    const before = new Date();
    before.setDate(1); before.setHours(0, 0,0, 0);
    const after = new Date();
    after.setMonth(after.getMonth() + 1, 1); after.setHours(0, 0,0, 0);
    const q = query(DB,
        where('user', '==', user),
        where('timestamp', '>=', before),
        where('timestamp', '<', after),
        orderBy("timestamp", "desc"));
    const qs = await getDocs(q);
    qs.forEach((doc) => {list.push(doc.data());});
    let productions = 0;
    for(let row of list) {
        productions += row['value'];
    }
    return productions;
}

export async function getMembers() {
    const users = await select('users');
    return users.length;
}

export async function getInput() {
    const users = await select('users');
    let input = 0;
    for(let user of users) {
        const id = user.id;
        input += await monthProductions(id);
    }
    return input;
}

export async function getOutput() {
    const users = await select('users');
    let output = 0;
    for(let user of users) {
        const id = user.id;
        output += await monthConsumptions(id);
    }
    return output;
}

