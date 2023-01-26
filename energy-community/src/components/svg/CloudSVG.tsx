import React from "react";

interface IProps { width: number }
export default function CloudSVG(props: IProps) {
    return (<div className={"d-block mx-auto"}>
        <img src={"https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg"}
             width={props.width} />
    </div>);
}