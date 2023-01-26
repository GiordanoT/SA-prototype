import React, {useState} from "react";
import WindTurbine from "./components/WindTurbine";
import {Download} from "../../components";

interface IProps { user: number, length: number }
export default function WindTurbines(props: IProps) {

    const user = props.user;
    const options = new Array(props.length).fill(0);
    const [id, setId] = useState(0);

    if(props.length > 0) {
        return (<div className={"container"}>
            <div className={"d-flex w-25 me-auto"}>
                <select className={"form-select me-4"} defaultValue={0} onChange={(event) => { setId(parseInt(event.target.value)) }}>
                    {options.map((fake, index) => {
                        return <option value={index} key={index}>Wind Turbine {index + 1}</option>
                    })}
                </select>
                <Download user={user} index={id} path={'windTurbines'} />
            </div>
            <div className={"d-flex mt-3"}>
                <WindTurbine key={id} id={id} user={user} />
            </div>
        </div>);
    } else {
        return(<div className={"container"}>
            <h5>NO WIND TURBINES!</h5>
        </div>);
    }



}
