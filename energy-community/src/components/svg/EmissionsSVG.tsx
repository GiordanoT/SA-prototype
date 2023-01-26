import React from "react";

interface IProps { width: number }
export default function EmissionsSVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/235536/co2.svg"} width={props.width} />
    </div>);
}
