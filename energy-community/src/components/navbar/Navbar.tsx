import React from "react";
import {RootState} from "services/redux";
import {logout} from "services/firebase";

interface IProps { state: RootState }
export default function Navbar(props: IProps) {

    const state = props.state;
    const user = state.user;

    return(<>
        <nav className={"navbar navbar-dark bg-first justify-content-between border-bottom border-default shadow"}>
            <button className={"ms-auto me-3 btn btn-danger"} onClick={async() => {await logout()}}>
                Logout
            </button>
        </nav>
    </>);
}
