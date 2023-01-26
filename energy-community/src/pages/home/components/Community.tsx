import React, {useState} from "react";
import {Dictionary} from "utils/types";
import CitySVG from "components/svg/CitySVG";
import {useEffectOnce} from "usehooks-ts";
import axios from "axios";
import {CloudSVG, MoonSVG, RainSVG, SnowSVG, SunSVG} from "components";
import {getInput, getMembers, getOutput} from "services/firebase";

interface IProps { }
export default function Community(props: IProps) {

    const [weather, setWeather] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [temperature, setTemperature] = useState<number>(0);
    const [light, setLight] = useState<number>(0);
    const hours = new Date().getHours();
    const isDay = hours > 6 && hours <= 18;

    const [members, setMembers] = useState(0);
    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);

    const query = 'https://api.open-meteo.com/v1/forecast?latitude=45.59&longitude=9.57&current_weather=true';

    useEffectOnce(() => {
        axios.get(query).then((httpResponse) => {
            const data = (httpResponse as Dictionary).data.current_weather;
            const code = data.weathercode;
            switch(code) {
                case code >= 0 && code <= 19: setWeather(0); break;
                case code >= 20 && code <= 49: setWeather(1); break;
                case code >= 50 && code <= 69: setWeather(2); break;
                case code >= 70 && code <= 99: setWeather(3); break;
            }
            setWind(data.windspeed);
            setTemperature(data.temperature);
            if(isDay) {
                const value = ((100 - code) * (temperature + 1)) / 10;
                setLight(value)
            } else { setLight(0); }
        });
        getMembers().then((value) => setMembers(value));
        getInput().then((value) => setInput(value));
        getOutput().then((value) => setOutput(value));
    })

    return(<div className={"card shadow"}>
        <label className={"mb-2"}>Community: <b>MILANO</b></label>
        <CitySVG width={100} />
        <hr className={"mb-0"} />
        <div className={"d-block mt-0"}>
            {(weather === 0) && (isDay) && <SunSVG width={95} />}
            {(weather === 0) && (!isDay) && <MoonSVG width={95} />}
            {(weather === 1) && <CloudSVG width={95} />}
            {(weather === 2) && <RainSVG width={95} />}
            {(weather === 3) && <SnowSVG width={95} />}
        </div>
        <div className={"d-flex mx-auto"}>
            <div className={"d-flex p-2 mx-2 border border-default rounded"}>
                <i style={{fontSize: "1.25rem"}} className={"bi bi-thermometer-half"}></i>
                <label className={"my-auto"} style={{fontSize: "0.8rem"}}>&nbsp;<b>{temperature}</b></label>
            </div>
            <div className={"d-flex p-2 mx-2 border-default rounded"}>
                <i style={{fontSize: "1.25rem"}}  className={"bi bi-brightness-alt-high"}></i>
                <label className={"my-auto"} style={{fontSize: "0.8rem"}}>&nbsp;<b>{light}</b></label>
            </div>
            <div className={"d-flex p-2 mx-2 border-default rounded"}>
                <i style={{fontSize: "1.25rem"}}  className={"bi bi-wind"}></i>
                <label className={"my-auto"} style={{fontSize: "0.8rem"}}>&nbsp;<b>{wind}</b></label>
            </div>
        </div>
        <hr />
        <div className={"d-block ms-1"}>Active Members: <b>{members}</b></div>
        <div className={"d-block ms-1"}>Productions: <b className={"text-success"}>
            {input / 1000}</b> Kw
        </div>
        <div className={"d-block ms-1"}>Consumptions: <b className={"text-danger"}>
            {output / 1000}</b> Kw
        </div>
    </div>);
}
