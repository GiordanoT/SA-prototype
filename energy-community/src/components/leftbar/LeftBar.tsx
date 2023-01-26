import React from "react";
import "./leftbar.scss";
import {write} from "services/firebase";
import {RootState} from "services/redux";

interface IProps {state: RootState}
export default function LeftBar(props: IProps) {

    const state = props.state;
    const user = state.user;

    const changeRoute = async(route: number) => {
        await write('users', user.id, {route})
    }

    return(<div className={"leftbar border-right border-default shadow"}>
        <div className={"list"}>
            <div className={"item"} onClick={async() => {await changeRoute(0)}}>
                <i className={"bi bi-house-door"}></i> Home
            </div>
            <div className={"item"} onClick={async() => {await changeRoute(1)}}>
                <i className={"bi bi-lightning-charge"}></i> Solar Panels
            </div>
            <div className={"item"} onClick={async() => {await changeRoute(2)}}>
                <i className={"bi bi-lightning-charge"}></i> Wind Turbines
            </div>
            <div className={"item"} onClick={async() => {await changeRoute(5)}}>
                <i className={"bi bi-dash-circle"}></i> Consumption
            </div>
            <div className={"item"} onClick={async() => {await changeRoute(4)}}>
                <i className={"bi bi-wallet2"}></i> Bills
            </div>
            <div className={"item"} onClick={async() => {await changeRoute(3)}}>
                <i className={"bi bi-lightbulb"}></i> Predictions
            </div>
        </div>
    </div>);
}
