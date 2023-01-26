import React from 'react';
import AddDevice from "./components/AddDevice";
import Devices from "./components/Devices";
import Emissions from "./components/Emissions";

interface IProps {user: number, devices: number}
export default function Consumptions(props: IProps) {

    const user = props.user;
    const devices = props.devices;

    return(<div className={"container"}>
        <div className={"d-flex"}>
            <AddDevice user={user} devices={devices} />
            <Devices user={user} devices={devices} />
            <Emissions user={user} />
        </div>

    </div>);
}
