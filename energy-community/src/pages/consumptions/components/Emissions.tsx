import React, {useState} from "react";
import {EmissionsSVG} from "components";
import {useEffectOnce, useInterval} from "usehooks-ts";
import {consumptionsData} from "services/firebase";
import GaugeChart from "react-gauge-chart";

interface IProps { user: number }
export default function Emissions(props: IProps) {

    const user = props.user;
    const [read, setRead] = useState(0);

    useEffectOnce(() => {
        consumptionsData(user, 1).then((result) => {
            if(result[0]) {
                const emission = ((result[0].value * 0.8) / 1000).toFixed(2);
                setRead(parseFloat(emission));
            }
            else { setRead(0); }
        });
    })

    useInterval(async () => {
        consumptionsData(user, 1).then((result) => {
            if(result[0]) {
                const emission = ((result[0].value * 0.8) / 1000).toFixed(2);
                setRead(parseFloat(emission));
            }
            else { setRead(0); }
        });
    }, 60000)

    return(<div className={"card shadow ms-auto"}>
        <EmissionsSVG width={100} />
        <hr />
        <h6>{read} lbs</h6>
        <GaugeChart hideText={true} percent={((read / 2) > 1) ? 1 : read / 2}
                    nrOfLevels={420} arcsLength={[0.3, 0.5, 0.2]}
                    colors={['#5BE12C', '#F5CD19', '#EA4228']} arcPadding={0.02} />
    </div>);
}
