import React from "react";
import Comparision from "./components/Comparision";
import BillsInfo from "./components/BillsInfo";

interface IProps { user: number }
export default function Bills(props: IProps) {

    const user = props.user;


    return(<div className={"container d-flex"}>
        <Comparision user={user} />
        <BillsInfo user={user} />
    </div>);
}

