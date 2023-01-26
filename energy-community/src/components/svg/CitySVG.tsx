import React from "react";

interface IProps { width: number }
export default function CitySVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/176730/city-nature.svg"} width={props.width} />
    </div>);
}
