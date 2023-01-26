import React, {useState} from "react";
import {useEffectOnce, useInterval} from "usehooks-ts";
import {sensorsData} from "services/firebase";
import {LineChart, WindTurbineSVG} from "components";
import {getLastValueInMap, sortByTimestamp} from "utils/functions";

interface IProps { id: number, user: number }
export default function WindTurbine(props: IProps) {

    const id = props.id;
    const user = props.user;
    const [data, setData] = useState<Map<string, number>>(new Map());

    useEffectOnce(() => {
        sensorsData('windTurbines', id, user).then((results) => {
            let map = new Map<string, number>();
            for(let result of results) {
                const date = new Date(result.timestamp.seconds * 1000);
                let strDate = date.toLocaleTimeString("it-IT");
                strDate = strDate.slice(0, strDate.lastIndexOf(':'))
                map.set(strDate, result.value);
            }
            map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
            setData(map);
        });
    })

    useInterval(async() => {
        const results = await sensorsData('windTurbines', id, user);
        let map = new Map<string, number>();
        for(let result of results) {
            const date = new Date(result.timestamp.seconds * 1000);
            let strDate = date.toLocaleTimeString("it-IT");
            strDate = strDate.slice(0, strDate.lastIndexOf(':'))
            map.set(strDate, result.value);
        }
        map = new Map<string, number>([...map.entries()].sort(sortByTimestamp));
        setData(map);
    }, 60000)

    return (<>
        <LineChart label={'Production'} data={data} />
        <div className={"ms-5 card shadow"}>
            <WindTurbineSVG width={100} />
            <hr />
            <label>Generating <b className={"text-success"}>{getLastValueInMap(data)}</b> w</label>
        </div>
    </>);


}


