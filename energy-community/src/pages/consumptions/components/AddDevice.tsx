import React, {useState} from 'react';
import {write} from "services/firebase";
import {Dictionary} from "utils/types";
import {editState} from "services/redux";
import {utilitySlice} from "services/redux/store";
import {generateID} from "utils/functions";

interface IProps { user: number, devices: number }
export default function AddDevice(props: IProps) {

    const user = props.user;
    const devices = props.devices;
    const [name, setName] = useState<string>();
    const [energy, setEnergy] = useState<number|string>();

    const submit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = generateID();
        const dict: Dictionary = { id, user, name, energy, active: true};
        await write('devices', id, dict);
        editState(utilitySlice, 'devices', devices + 1);
        setName(''); setEnergy('');
    }

    return(<div className={"card shadow"}>
            <form className={""} onSubmit={submit}>
                <label><b>ADD CONSUMPTION</b></label>
                <hr />
                <input className={"mx-auto form-control"} placeholder={'Name'} type={'text'} required={true}
                       name={'name'} value={name} onChange={(event) => setName(event.target.value)} />
                <input className={"mx-auto form-control mt-1"} placeholder={'Energy (w) for hour'} type={'number'} required={true}
                       name={'energy'} value={energy} onChange={(event) => setEnergy(parseInt(event.target.value))} />
                <button className={"btn btn-success w-25 mt-3 complete-rounded"} type={'submit'}>
                    <i className={"bi bi-plus-lg"}></i>
                </button>
            </form>
    </div>);
}
