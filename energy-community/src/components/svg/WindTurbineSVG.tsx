import React from "react";

interface IProps { width: number }
export default function WindTurbineSVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/274793/eolic-energy-windmill.svg"} width={props.width} />
    </div>);
}
