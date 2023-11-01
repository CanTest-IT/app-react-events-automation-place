
import axiosInstance from '../axiosInstance.js';
import dynamic from 'next/dynamic';
import Router from "next/router";
import { setCookie } from 'nookies';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useRef, useState } from 'react';
import Head from 'next/head';
import { Toast } from 'primereact/toast';

const DynamicButton = dynamic(() => import('primereact/button').then(button => button.Button), {
	ssr: false,
})

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useRef(null);

	const register = useCallback(() => {
		setLoading(true)
		axiosInstance.post('/api/auth/register', {
			username,
			password,
			email
		})
			.then((result) => {
				setCookie(null, 'cantest_token', result.data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                  })
				Router.push('/')
			})
			.catch(() => {
				toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid data', life: 3000 });
			})
			.finally(() => setLoading(false))
	}, [username, password, email])

	return (
		<>
		<Head>
            <title>CanTest network - Register</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/x-icon" href="https://static.wixstatic.com/media/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png"></link>
        </Head>
		<div className="pages-body register-page flex flex-column">
			<Toast ref={toast}></Toast>
			<div className="align-self-center mt-auto mb-auto">
				<InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
				<InputText value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
				<InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
				<DynamicButton label="Register" onClick={register} disabled={loading} />
			</div>
		</div>
		</>
	)
}

export default Register;