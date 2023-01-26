import React from 'react';
import {sensorsUnlimitedData} from "services/firebase";
import {dictionaryToString} from "utils/functions";

interface IProps {user: number, index: number, path: string}
export default function Download(props: IProps) {

    const user = props.user;
    const index = props.index;
    const path = props.path;

    const click = async() => {
        const element = document.createElement("a");
        const data = await sensorsUnlimitedData(path, index, user);
        const dataStr = dictionaryToString(data);
        const file = new Blob([dataStr], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = path.slice(0, -1) + (index + 1) + '.csv';
        document.body.appendChild(element);
        element.click();
    }

    return(<button className={"btn btn-success"} onClick={click}>
        <i className={"bi bi-download"}></i>
    </button>);
}
