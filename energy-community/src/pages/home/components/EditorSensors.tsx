import React from "react";
import {RootState} from "services/redux";
import {write} from "services/firebase";
import {Dictionary} from "utils/types";
import {SolarPanelSVG, WindTurbineSVG} from "components";

interface IProps { state: RootState }
export default function EditorSensors(props: IProps) {

    const state = props.state;
    const user = state.user;

    const solarPanelsEdit = async(n: number) => {
        if(n >= 0 && n < 5) {
            const dict: Dictionary = { solarPanels: n };
            await write('users', user.id, dict);
        }
    }
    const windTurbinesEdit = async(n: number) => {
        if(n >= 0 && n < 3) {
            const dict: Dictionary = { windTurbines: n };
            await write('users', user.id, dict);
        }
    }

    return(<>
        <div className={"card shadow ms-3"}>
            <label className={"mb-2"}><b>Solar Panels</b></label>
            <SolarPanelSVG width={100} />
            <hr />
            <div className={"d-block mt-3"}>
                <button onClick={async() => {await solarPanelsEdit(user.solarPanels + 1)}}
                        className={"btn btn-success complete-rounded"}>
                    <i className={"bi bi-arrow-up"}></i>
                </button>
                <label className={"ms-2 me-2 bold"}>{user.solarPanels}</label>
                <button onClick={async () => {await solarPanelsEdit(user.solarPanels - 1)}}
                        className={"btn btn-danger complete-rounded"}>
                    <i className={"bi bi-arrow-down"}></i>
                </button>
                <p className={"mt-1"}>Edit solar panels number</p>
            </div>
        </div>

        <div className={"card shadow ms-3"}>
            <label className={"mb-2"}><b>Wind Turbines</b></label>
            <WindTurbineSVG width={100} />
            <hr />
            <div className={"d-block mt-3"}>
                <button onClick={async() => {await windTurbinesEdit(user.windTurbines + 1)}}
                        className={"btn btn-success complete-rounded"}>
                    <i className={"bi bi-arrow-up"}></i>
                </button>
                <label className={"ms-2 me-2 bold"}>{user.windTurbines}</label>
                <button onClick={async () => {await windTurbinesEdit(user.windTurbines - 1)}}
                        className={"btn btn-danger complete-rounded"}>
                    <i className={"bi bi-arrow-down"}></i>
                </button>
                <p className={"mt-1"}>Edit wind turbines number</p>
            </div>
        </div>

    </>);
}
