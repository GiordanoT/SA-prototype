import React, {useState} from "react";
import {DoubleLineChart} from "components";
import {useEffectOnce, useInterval} from "usehooks-ts";
import {consumptionsData, productionsData} from "services/firebase";
import {sortByTimestamp} from "utils/functions";

interface IProps { user: number }
export default function Comparision(props: IProps) {

    const user = props.user;
    const [first, setFirst] = useState<Map<string, number>>(new Map());
    const [second, setSecond] = useState<Map<string, number>>(new Map());

    useEffectOnce(() => {
        consumptionsData(user, 10).then((results) => {
            let map = new Map<string, number>();
            for(let result of results) {
                const date = new Date(result.timestamp.seconds * 1000);
                let strDate = date.toLocaleTimeString("it-IT");
                strDate = strDate.slice(0, strDate.lastIndexOf(':'))
                map.set(strDate, result.value);
            }
            map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
            setSecond(map);
        });
        productionsData(user, 10).then((results) => {
            let map = new Map<string, number>();
            for(let result of results) {
                const date = new Date(result.timestamp.seconds * 1000);
                let strDate = date.toLocaleTimeString("it-IT");
                strDate = strDate.slice(0, strDate.lastIndexOf(':'))
                map.set(strDate, result.value);
            }
            map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
            setFirst(map);
        });
    })

    useInterval(async() => {
        let results = await consumptionsData(user, 10);
        let map = new Map<string, number>();
        for(let result of results) {
            const date = new Date(result.timestamp.seconds * 1000);
            let strDate = date.toLocaleTimeString("it-IT");
            strDate = strDate.slice(0, strDate.lastIndexOf(':'))
            map.set(strDate, result.value);
        }
        map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
        setSecond(map);
        results = await productionsData(user, 10);
        map = new Map<string, number>();
        for(let result of results) {
            const date = new Date(result.timestamp.seconds * 1000);
            let strDate = date.toLocaleTimeString("it-IT");
            strDate = strDate.slice(0, strDate.lastIndexOf(':'))
            map.set(strDate, result.value);
        }
        map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
        setFirst(map);
    }, 60000);

    return(<DoubleLineChart label={"PRODUCTIONS & CONSUMPTIONS"} first={first} second={second} />);
}
