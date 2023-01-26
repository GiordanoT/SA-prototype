import React from 'react';
import Predict from './components/Predict';

interface IProps {}
export default function Predictions(props: IProps) {
    return(<div className={"container"}>
        <Predict />
    </div>);
}
