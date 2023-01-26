import React from "react";

interface IProps { width: number }
export default function SolarPanelSVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/293503/solar-panel.svg"} width={props.width} />
    </div>);
}
