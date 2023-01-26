import React, {useEffect, useState} from "react";
import {monthConsumptions, monthProductions} from "services/firebase";
import {useEffectOnce} from "usehooks-ts";
import {monthString} from "utils/functions";
import {MoneySVG} from "../../../components";

interface IProps { user: number }
export default function BillsInfo(props: IProps) {

    const user = props.user;
    const [consumption, setConsumption] = useState(0);
    const [production, setProduction] = useState(0);
    const [total, setTotal] = useState(0);

    const month = monthString(new Date());

    useEffectOnce(() => {
        monthConsumptions(user).then((value) => {
            setConsumption(value);
        });
        monthProductions(user).then((value) => {
            setProduction(value);
        });
    })

    useEffect(() => {
        const diff = consumption - production;
        if(diff > 0){ setTotal(parseFloat(((diff / 1000) * 0.2).toFixed(2))) }
        else { setTotal(0); }
    })

    return(<div className={"ms-auto card shadow"} style={{width: '30%'}}>
        <label>Month: <b>{month}</b></label>
        <label>Energy Bill: <b>{total}$</b></label>
        <hr />
        <MoneySVG  width={100} />
        <hr />
        <label>Total Production: <b className={"text-success"}>{production / 1000}</b> Kw</label>
        <label>Total Consumption: <b className={"text-danger"}>{consumption / 1000}</b> Kw</label>
    </div>);
}
