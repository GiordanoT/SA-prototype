import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'services/redux';
import {useInterval} from "usehooks-ts";
import axios from 'axios';
import {Dictionary} from "../../utils/types";
import SnowSVG from "../svg/SnowSVG";
import RainSVG from "../svg/RainSVG";
import MoonSVG from "../svg/MoonSVG";

export default function Test() {

    const state: RootState = useSelector((state: RootState) => state);
    const [data, setData] = useState<any>([]);
    const query = 'https://api.open-meteo.com/v1/forecast?latitude=42.35&longitude=13.40&current_weather=true';

    useInterval(async() => {

    }, 5000)

    const test = async() => {
        const r = await axios.get(query);
        console.log((r.data as Dictionary).current_weather)
    }


    return (<div style={{marginLeft: '400px'}}>
        Hello World
    </div>);
}

