import React from "react";
import {RootState} from "services/redux";
import EditorSensors from "./components/EditorSensors";
import Community from "./components/Community";

interface IProps { state: RootState }
export default function Home(props: IProps) {

    const state = props.state;

    return(<div className={"container d-flex"}>
        <Community />
        <EditorSensors state={state} />
    </div>);
}
