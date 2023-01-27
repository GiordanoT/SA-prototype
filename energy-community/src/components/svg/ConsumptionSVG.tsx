import React from "react";

interface IProps { width: number }
export default function CitySVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/421783/electric-energy-plug-2.svg"} width={props.width} />
    </div>);
}
