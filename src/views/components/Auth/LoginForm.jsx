import './css/index.scss';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Spinner from '../../handle/Spinner/Spinner';
import logo from '../../../includes/images/Logo_MATER_azul.png';
import { Card, Form, Input, Button, Image } from 'antd';
import { loginUser } from '../../../redux/actions/Configuration/authAction';
import { success, warning } from '../../handle/Notification/Notification';
import { auto } from '@popperjs/core';

const layout = {
	labelCol: {
		span: 5,
		offset: 2,
	},
	wrapperCol: {
		span: 5,
		offset: 2,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 2,
		span: 5,
	},
};

const LoginForm = () => {

	const [stateLogin, setStateLogin] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [ip, setIp] = useState("127.0.0.1");
	const dispatch = useDispatch();
	const [logoLogin] = useState(logo);

	const getData = async () => {
		const resp = await fetch(process.env.REACT_APP_API_URL_IP_GEOLOCATION + process.env.REACT_APP_API_KEY_IP_GEOLOCATION).then(x => x.json());
		if (resp) {
			setIp(resp?.ip_address);
			localStorage.IP = resp?.ip_address;
			localStorage.clientLocation = JSON.stringify(resp);
		}
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		/*	passing getData method to the lifecycle method	*/
		await getData()
	}, [])

	const handleOnSubmit = (event) => {

		setStateLogin(true);

		event.preventDefault();

		if (email !== '' || password.length !== '') {
			if (password.length >= 7) {
				dispatch(loginUser({ email, password, ip }, async (response) => {
					let res = await response;
					if (res.error) {
						setStateLogin(false);
						return;
					}
					success("Bienvenido")
					setStateLogin(false)
				}))
			} else {
				warning('¡UPS!,Ha cometido un error verifique contraseña');
				setStateLogin(false);
			}
		} else {
			warning('¡UPS!, están vacíos');
			setStateLogin(false);
		}

	};
	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${placeholder} es requerido',
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			email: '${placeholder} no es un correo válido',
			// eslint-disable-next-line no-template-curly-in-string
			password: '${placeholder} debe ser un número'

		}
	};
	return (
		<div className="contenedor-1" >
			<div className="divForm">
				<div className="logo"

				>

				</div>
				<Form
					onSubmitCapture={handleOnSubmit}
					validateMessages={validateMessages}
					className='form'
					{...layout}
					name="login"
					layout="vertical"
				> 	<Form.Item

				>
						<div style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "flex-start"
						}}>
							<Image
								height={100}
								width={auto}
								src={logoLogin}
								preview={false}
							/>
						</div>

					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true
							}]}
					>
						<Input
							defaultValue=''
							placeholder='Email'
							name="email"
							valuePropName={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Item>

					<Form.Item rules={[{ required: true }]}	>
						<Input.Password
							defaultValue=''
							placeholder='Contraseña'
							name="password"
							valuePropName={password}
							autocomplete="on"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Item>
					{/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
						<Checkbox size="small">Recordar Usuario</Checkbox>
					</Form.Item> */}
					{<Form.Item {...tailLayout}>
						<Button disabled={stateLogin} className='btnLogin' htmlType="submit">
							Ingresar
						</Button>
					</Form.Item>}
					<Form.Item>
						{stateLogin ?
							<Card bordered={false}>
								<Spinner />
							</Card>
							: <></>}
					</Form.Item>


				</Form>
			</div>
		</div>
	);
}

const mapDispachToProps = dispatch => ({
	dispatchLoginAction: (email, password, ip, onSuccess, onError) =>
		dispatch(loginUser({ email, password, ip }, onSuccess, onError))
})
export default connect(null, mapDispachToProps)(LoginForm);