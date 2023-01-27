import React, {useRef, useState} from "react";
import * as tf from '@tensorflow/tfjs';
import {data, target} from "./dataset";
import {WindTurbineSVG} from "components";

interface IProps {}
export default function Predict(props: IProps) {

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

    const X = tf.tensor1d(data);
    const y = tf.tensor1d(target);

    const [value, setValue] = useState<undefined|number>();
    const speed = useRef<HTMLInputElement>(null);

    const predict = async() => {
        const x = (speed.current) ? parseInt(speed.current.value) : 0;
        if(!isNaN(x) && x > 0) {
            await model.fit(X, y, {batchSize: 32, epochs: 10});
            const x_new = tf.tensor1d([x]);
            const y_new: any = model.predict(x_new);
            const predictions = y_new.arraySync();
            setValue(parseInt(predictions[0]))
        } else { setValue(0) }
    }

    return(<div className={"card shadow"} style={{width: '32%'}}>
        <h6 className={"mb-3"}>PREDICT PRODUCTION</h6>
        <WindTurbineSVG  width={95} />
        <hr />
        <div className={"d-flex"}>
            <input className={"form-control"} type={'number'} ref={speed} defaultValue={0} min={0} />
            <button className={"btn btn-success ms-2"} onClick={() => predict()}>
                <i className={"bi bi-arrow-right"}></i>
            </button>
        </div>
        <label className={'mt-1 text-center'} style={{fontSize: '0.8rem'}}>*insert speed value*</label>
        <hr />
        <label>
            The predicted production is <b className={'text-success'}>{(value !== undefined) ? (value * 60) / 1000 : 0}</b> Kw/h
        </label>
    </div>);
}
