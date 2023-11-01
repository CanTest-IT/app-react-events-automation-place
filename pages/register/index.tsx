import axios from 'axios';
import dynamic from 'next/dynamic';
import Router, { useRouter } from "next/router";
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useRef, useState } from 'react';
import Head from 'next/head';
import { Toast } from 'primereact/toast';

const DynamicButton = dynamic(() => import('primereact/button').then(button => button.Button), {
    ssr: false,
})

const Register = () => {
    const router = useRouter();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState(0)
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);

    const cancel = useCallback(() => {
        router.push('/login');
    }, [router]);

    const register = useCallback(() => {
        setLoading(true)
        axios.post('/api/auth/register', {
            login,
            password,
            name,
            lastname,
            age
        })
            .then(() => {
                Router.push('/')
            })
            .catch(() => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid data', life: 3000 });
            })
            .finally(() => setLoading(false))
    }, [login, password, name, lastname, age])

    return (
        <>
            <Head>
                <title>CanTest network</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/x-icon" href="https://static.wixstatic.com/media/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png"></link>
            </Head>
            <div className="pages-body register-page flex flex-column">
                <Toast ref={toast}></Toast>
                <div className="align-self-center mt-auto mb-auto">
                    <div className="pages-panel card flex flex-column">
                        <h4>Register</h4>
                        <div className="pages-detail mb-6 px-6">Please use the form to register to Cantest network</div>
                        <div className="input-panel flex flex-column px-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText onChange={e => setLogin(e.target.value)} type="text" id="inputgroup1" />
                                    <label htmlFor="inputgroup1">Login</label>
                                </span>
                            </div>

                            <div className="p-inputgroup mt-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText onChange={e => setPassword(e.target.value)} type="password" id="inputgroup2" />
                                    <label htmlFor="inputgroup2">Password</label>
                                </span>
                            </div>

                            <div className="p-inputgroup mt-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText onChange={e => setName(e.target.value)} type="text" id="inputgroup3" />
                                    <label htmlFor="inputgroup3">Name</label>
                                </span>
                            </div>

                            <div className="p-inputgroup mt-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText onChange={e => setLastname(e.target.value)} type="text" id="inputgroup4" />
                                    <label htmlFor="inputgroup4">Lastname</label>
                                </span>
                            </div>

                            <div className="p-inputgroup mt-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-calendar"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText onChange={e => setAge(parseInt(e.target.value))} type="number" id="inputgroup5" />
                                    <label htmlFor="inputgroup5">Age</label>
                                </span>
                            </div>

                            <div className="p-inputgroup mt-3">
                                <DynamicButton label="Register" onClick={register} disabled={loading} />
                                <span style={{ margin: '0 10px' }}></span>
                                <DynamicButton label="Cancel" onClick={cancel} className="p-button-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;