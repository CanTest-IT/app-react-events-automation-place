import axios from 'axios';
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

const Login = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useRef(null);
	// const history = useHistory();

	const goDashboard = () => {
		// history.push('/');
	}

	const login = useCallback(() => {
		setLoading(true)
		axios.post('/api/auth/login', {
			login: username,
			password
		})
			.then((result) => {
				setCookie(null, 'cantest_token', result.data, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
				Router.push('/')
			})
			.catch(() => {
				toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid data', life: 3000 });
			})
			.finally(() => setLoading(false))
	}, [username, password])

	return (
		<>
		<Head>
            <title>CanTest network</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/x-icon" href="https://static.wixstatic.com/media/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/d4a01c_579d7aafc6be4be9ac6f31eaacfeef96%7Emv2.png"></link>
        </Head>
		<div className="pages-body login-page flex flex-column">
			<Toast ref={toast}></Toast>
			<div className="align-self-center mt-auto mb-auto">
				<div className="pages-panel card flex flex-column">
					<div style={{ transform: 'scale(0.5)' }}>
						<svg preserveAspectRatio="xMidYMid meet" data-bbox="-0.011 -0.06 236.741 34.21" viewBox="-0.011 -0.06 236.741 34.21" xmlns="http://www.w3.org/2000/svg" data-type="color" role="img" aria-labelledby="svgcid-5u5zdv-xm1upd"><defs></defs><title id="svgcid-5u5zdv-xm1upd">logo cantest it</title>
							<g>
								<g>
									<path d="M18.19 31.11c.72 0 1.11.48 1.11 1.44S18.91 34 18.19 34H7.78A7.39 7.39 0 0 1 0 26.21V17c0-4.61 3.17-8 7.73-8h6C18.39 9 21 11.71 21 15.94v.57c0 .72-.53 1.16-1.44 1.16s-1.44-.44-1.44-1.16v-.76c0-2.45-1.49-3.84-4.13-3.84h-6.5a4.44 4.44 0 0 0-4.61 4.65v10.13a4.31 4.31 0 0 0 4.61 4.42z" fill="#ffffff" data-color="1"></path>
									<path d="M49.44 33c0 .77-.48 1.15-1.44 1.15s-1.44-.38-1.44-1.15v-2.47L44 32.69a6.93 6.93 0 0 1-4.32 1.39h-4.45c-4.22 0-6.86-2.54-6.86-6.33v-3.7a6.45 6.45 0 0 1 6.38-6.43h4.56A6 6 0 0 1 43 19.15l3.6 3.17v-5.85c0-3.12-1.78-4.61-4.9-4.61h-9.3c-.72 0-1.1-.48-1.1-1.4S31.68 9 32.4 9H42a7.15 7.15 0 0 1 7.49 7.45zm-2.88-5.33v-2.13l-4.08-3.84a4.8 4.8 0 0 0-3.7-1.49h-3.84a3.67 3.67 0 0 0-3.74 4v3.89c0 2.26 1.58 3.46 3.74 3.46h5.24a5 5 0 0 0 3.4-1.39z" fill="#ffffff" data-color="1"></path>
									<path d="M79.25 33c0 .77-.48 1.15-1.44 1.15s-1.44-.38-1.44-1.15V16a4.49 4.49 0 0 0-4-4.28h-3.25a5.08 5.08 0 0 0-3.79 1.54l-4.52 4.46V33c0 .77-.48 1.15-1.39 1.15s-1.49-.38-1.49-1.15V10.13c0-.77.48-1.15 1.45-1.15s1.43.38 1.43 1.15v4.27l4-3.94A5.62 5.62 0 0 1 68.59 9H72a7.36 7.36 0 0 1 7.3 7.69z" fill="#ffffff" data-color="1"></path>
									<path d="M103.39 30.91c.77 0 1.15.48 1.15 1.49s-.38 1.39-1.15 1.39H98c-4.47 0-7-2.35-7-7.29V12.39h-4.6c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39H91v-8.5C91 .38 91.53 0 92.54 0s1.35.38 1.35 1.15v8.5h5.9c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#eb5c20" data-color="2"></path>
									<path d="M128.3 31.3c.72 0 1.16.48 1.16 1.39s-.39 1.39-1.16 1.39h-10.46a7.25 7.25 0 0 1-7.59-7.53v-9.84a7.42 7.42 0 0 1 7.3-7.71h6.63a7.52 7.52 0 0 1 7.34 7.69v2.88a3.63 3.63 0 0 1-3.22 3.21h-15.17v4.42a4.25 4.25 0 0 0 4.32 4.08zm-1.05-11.09a1.47 1.47 0 0 0 1.39-1.49v-2.49a4.49 4.49 0 0 0-4-4.32h-7.25a4.49 4.49 0 0 0-4.23 4.32v4z" fill="#eb5c20" data-color="2"></path>
									<path d="M152.93 31.3a3.87 3.87 0 0 0 3.89-4.08 3.83 3.83 0 0 0-3.94-4l-7.2-.29c-4.18-.15-7.11-3-7.11-6.87a6.81 6.81 0 0 1 6.72-6.91h11.77c.72 0 1.1.48 1.1 1.44s-.48 1.54-1.1 1.54L145.2 12a4 4 0 0 0-3.75 4.13 4.07 4.07 0 0 0 4.23 3.87l7.3.24a6.94 6.94 0 0 1-.1 13.87h-12.34c-.72 0-1.1-.48-1.1-1.44s.38-1.39 1.1-1.39z" fill="#eb5c20" data-color="2"></path>
									<path d="M183.26 30.91c.77 0 1.16.48 1.16 1.49s-.39 1.39-1.16 1.39h-5.37c-4.47 0-7-2.35-7-7.29V12.39h-4.61c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39h4.61v-8.5c0-.77.53-1.15 1.53-1.15s1.35.38 1.35 1.15v8.5h5.9c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#eb5c20" data-color="2"></path>
									<path d="M192.19 34.08a3 3 0 0 1-3-3 3 3 0 0 1 3-3.07 3.09 3.09 0 0 1 3.07 3.07 3 3 0 0 1-3.07 3z" fill="#eb5c21" data-color="3"></path>
									<path d="M212.69 31.3c.72 0 1.05.43 1.05 1.25s-.33 1.24-1.05 1.24h-11.77c-.72 0-1.1-.43-1.1-1.24s.38-1.25 1.1-1.25h4.32V12.24h-4.32c-.72 0-1.1-.43-1.1-1.25s.38-1.34 1.1-1.34h7.21V31.3zM208.65 3a1.12 1.12 0 0 1-1.05 1.16h-2.12a1.12 1.12 0 0 1-1-1.16V1a1.07 1.07 0 0 1 1-1.06h2.12A1.07 1.07 0 0 1 208.65 1z" fill="#ffffff" data-color="1"></path>
									<path d="M235.58 30.91c.77 0 1.15.48 1.15 1.49s-.38 1.39-1.15 1.39h-5.37c-4.47 0-7-2.35-7-7.29V12.39h-4.61c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39h4.61v-8.5c0-.77.53-1.15 1.53-1.15s1.35.38 1.35 1.15v8.5H232c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#ffffff" data-color="1"></path>
								</g>
							</g>
						</svg>
					</div>

					<h4>Welcome</h4>
					<div className="pages-detail mb-6 px-6">Please use the form to sign-in Cantest network</div>
					<div className="input-panel flex flex-column px-3">
						<div className="p-inputgroup">
							<span className="p-inputgroup-addon">
								<i className="pi pi-envelope"></i>
							</span>
							<span className="p-float-label">
								<InputText onChange={e => setUsername(e.target.value)} type="text" id="inputgroup1" />
								<label htmlFor="inputgroup1">Username</label>
							</span>
						</div>

						<div className="p-inputgroup mt-3 mb-6">
							<span className="p-inputgroup-addon">
								<i className="pi pi-lock"></i>
							</span>
							<span className="p-float-label">
								<InputText onChange={e => setPassword(e.target.value)} type="password" id="inputgroup2" />
								<label htmlFor="inputgroup2">Password</label>
							</span>
						</div>
					</div>
					<DynamicButton disabled={loading} onClick={login} className="login-button px-3" label="LOGIN"></DynamicButton>
				</div>
			</div>
		</div>
		</>
	)
}

export default Login;
