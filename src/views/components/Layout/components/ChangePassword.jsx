import React, {useState} from 'react';
import { Button, Form, Row, Col, Input, Modal } from "antd";
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../../redux/actions/Configuration/usersAction';
import { errorGlobal, success } from '../../../handle/Notification/Notification';

const validateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "${label} es requerido",
	types: {
		// eslint-disable-next-line no-template-curly-in-string
		email: "${label} debe ser un correo válido",
		// eslint-disable-next-line no-template-curly-in-string
		number: "${label} no puede contener letras.",
	},
	number: {
		// eslint-disable-next-line no-template-curly-in-string
		range: "${label} debe estar entre ${min} y ${max}",
	},
	
};
const ChangePassword = () => {
	const dispatch = useDispatch();
		const [isModalVisible, setIsModalVisible] = useState(false);

		const [form] = Form.useForm();

		const [password, setPassword] = useState('')
		const [newPassword, setNewPassword] = useState('')
		const userId=(JSON.parse(localStorage.getItem('USER_INFO'))).id
		
		const values = {password,newPassword,userId};

		const showModal = () => {
				setIsModalVisible(true);
			};
		const handleCancel = () => {
			onClose()
			onReset()
		};
		const onClose = () => {
			setIsModalVisible(false);
		};
		const onReset = () => {
			form.resetFields();
		};
		const handleSubmit = async () => {
			dispatch(changePassword(values,  (response)=>{
				if(!response.error){
					success("Contraseña cambiada correctamente")
					onReset();
					handleCancel();
				}
			}))
	
		
		}
    return (
    <>
			<Button onClick={showModal} type="dashed">Cambiar Contraseña</Button>
			<Modal
				title={'Cambio de contraseña'} 
				centered
				visible={isModalVisible} 
				footer={false} 
				onCancel={() => setIsModalVisible(false)} 
				width={500}
				form={form}
			>
				<Form 
					layout="vertical" 
					onFinish={handleSubmit}
					size='middle'
					validateMessages={validateMessages}
					form={form}
				>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item 
								name="password-actually" 
								label="Contraseña Actual"
								rules={[{ required : true, message : "Contraseña actual es requerida"}]}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							>
								<Input.Password style={{width: '100%'}}/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
									name="password"
									label="Password"
									rules={[
										{
											min: 7,
											max: 11,
											required: true,
										},
									]}
									hasFeedback
								>
									<Input.Password placeholder="Contraseña" 
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										/>
								</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="confirmPassword"
								label="Confirm password"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Por favor confirme su contraseña',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('Las dos contraseñas deben ser iguales'));
										},
									}),
								]}
							>
								<Input.Password placeholder="Repita contraseña" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col >
							<Form.Item>
								<Button style={{marginTop : '10px'}} type="primary" htmlType="submit">
									Guardar
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>	
			</Modal>
		</>
    );
}

export default ChangePassword;