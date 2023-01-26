import React, {useState} from 'react';
import Login from './components/Login';
import Signin from './components/Signin';

export default function Auth() {
    const [flag, setFlag] = useState(true);

    return (<>
        <div className={"card shadow my-auto mx-auto mt-5"}>
            {(flag) ? <>
                <Login />
                <div className={"mt-3"}></div>
                <hr />
                <div className={"mt-2"}>
                    Not have an account?
                    <button className={"ms-3 btn btn-primary complete-rounded"} onClick={() => setFlag(false)}>
                        <i className={"bi bi-chevron-right"}></i>
                    </button>
                </div>
            </> : <>
                <Signin />
                <div className={"mt-3"}></div>
                <hr />
                <div className={"mt-2"}>
                    Already have an account?
                    <button className={"ms-3 btn btn-primary complete-rounded"} onClick={() => setFlag(true)}>
                        <i className={"bi bi-chevron-right"}></i>
                    </button>
                </div>
            </>}
        </div>
    </>);
}

