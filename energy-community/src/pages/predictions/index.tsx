import React from 'react';
import Predict from './components/Predict';
import Consumptions from './components/Consumptions';

interface IProps { user: number }
export default function Predictions(props: IProps) {

    const user = props.user;

    return(<div className={"container d-flex"}>
        <Predict />
        <Consumptions user={user} />
    </div>);
}
