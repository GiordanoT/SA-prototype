import React, {useEffect, useState} from "react";
import {remove, select, write} from "services/firebase";
import {editState} from "services/redux";
import {utilitySlice} from "services/redux/store";
import {Switch} from "@mui/material";


interface Device { id: string, name: string, energy: number, active: boolean }
interface IProps { user: number, devices: number }
export default function Devices(props: IProps) {

    const user = props.user;
    const check = props.devices;
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        select('devices', ['user'], '==', user).then((list) => {
            const newList: Device[] = [];
            for(let row of list) {
                const device: Device = { id: row['id'], name: row['name'], energy: row['energy'], active: row['active'] };
                newList.push(device);
            }
            setDevices(newList)
        })
    }, [check])

    return(<div className={"ms-4 card shadow"} style={{width: 'max-content'}}>
        <table className={"table table-striped"}>
            <thead>
            <tr>
                <th>NAME</th>
                <th>ENERGY</th>
                <th>ACTIVE</th>
                <th>---</th>
            </tr>
            </thead>
            <tbody>
            {devices.map((device, index) => {
                return <tr key={index}>
                    <td className={"y-middle p-0"}>{device.name}</td>
                    <td className={"y-middle"}>{device.energy / 1000}<b style={{fontSize: '0.75rem'}}>Kw</b></td>
                    <td className={"y-middle"}>
                        <Switch checked={device.active} onChange={async() => {
                            await write('devices', device.id, {active: !device.active});
                            editState(utilitySlice, 'devices', check + 1);
                        }} />
                    </td>
                    <td className={"y-middle"}>
                        <button onClick={async() => {
                            await remove('devices', device.id);
                            editState(utilitySlice, 'devices', check - 1);
                        }}className={"btn btn-danger px-1 py-0 complete-rounded"}>
                            <i className={"bi bi-trash3-fill"}></i>
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>);
}
