import React, {useRef, useState} from "react";
import {ConsumptionSVG} from "../../../components";
import {consumptionsData} from "services/firebase";

interface IProps { user: number }
export default function Consumptions(props: IProps) {

    const user = props.user;
    const hours = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(0);

    const predict = async() => {
        const minutes = (hours.current) ? parseFloat(hours.current.value) * 60 : 0;
        const consumptions = await consumptionsData(user, 1);
        const consumption = consumptions[0].value;
        setValue((consumption * minutes) / 1000);
    }


    return(<div className={"card shadow ms-3"} style={{width: '32%'}}>
        <h6 className={"mb-3"}>PREDICT CONSUMPTIONS</h6>
        <ConsumptionSVG  width={95} />
        <hr />
        <div className={"d-flex"}>
            <input className={"form-control"} type={'number'} ref={hours} defaultValue={0} min={0} />
            <button className={"btn btn-success ms-2"} onClick={() => predict()}>
                <i className={"bi bi-arrow-right"}></i>
            </button>
        </div>
        <label className={'mt-1 text-center'} style={{fontSize: '0.8rem'}}>*insert hours value*</label>
        <hr />
        <label>
            The predicted consumption is <b className={'text-danger'}>{value}</b> Kw
        </label>
    </div>);
}
