import React from "react";

interface IProps { width: number }
export default function MoneySVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.svgrepo.com/show/277203/money-cash.svg"} width={props.width} />
    </div>);
}
