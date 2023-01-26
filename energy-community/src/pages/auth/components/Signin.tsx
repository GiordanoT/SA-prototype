import React, {FormEvent, useRef, useState} from 'react'
import {signin} from "services/firebase";

export default function Signin() {
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const[status, setStatus] = useState(true);

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(username.current && email.current && password.current) {
            const result = await signin(email.current.value, username.current.value, password.current.value )
            setStatus(result);
        } else { setStatus(false) }

    }

    return(<>
            <h4 className={"mt-4"}>SIGNIN</h4>
            {!status && <h5 className={"text-danger"}>ERROR!</h5>}
            <form className={"mt-3"} onSubmit={handleSubmit}>
                <input style={{maxWidth:"80%"}}
                       className={"rounded form-control mx-auto mt-2 d-block"}
                       type={"email"} ref={email} required={true} placeholder={"Email"} />
                <input style={{maxWidth:"80%"}}
                       className={"rounded form-control mx-auto mt-2 d-block"}
                       type={"text"} ref={username} required={true} placeholder={"Username"} />
                <input style={{maxWidth:"80%"}}
                       className={"rounded form-control mx-auto mt-2 d-block"}
                       type={"password"} ref={password} required={true} placeholder={"Password"} />
                <button className={"rounded mt-3 btn btn-success"}
                        type={"submit"}>SIGNIN
                </button>
            </form>
        </>
    )
}
