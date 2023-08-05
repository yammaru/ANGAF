




// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from '@ant-design/icons';
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { createRegisterType, fetchAllRegisterType } from "../../../../../redux/actions/Configuration/RegisterTypeAction";


//CREAR VALIDACIONES PARA LOS CAMPOS DEL FORMULARIO

const RegisterTypeRegister = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [state, setState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState();
	const [form] = Form.useForm();
	const saveRecords = (registerType) => {
		
		dispatch(
			createRegisterType(registerType,(response)=> {
				if (response.error){
					errorGlobal('¡UPS! Ocurió un error mientras se registraba')
				} else {
					success('Tipo de registro, registrado')
				}
				dispatch(fetchAllRegisterType());
				onClose();
			})
		)
	}
	const onReset = () => {
		form.resetFields();
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onClose = () => {
		setIsModalVisible(false);
		form.resetFields();
		onReset();
	}

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
	};

	const registerType = {
		name,
		state
	}

	const sendData = () => {
		saveRecords(registerType);
		onClose();
	}

	if (!validatePermission(constants.CREATE_RECORD_TYPE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button
				type="primary"
				onClick={showModal}
			> <PlusOutlined/> Nuevo </Button>
			<Modal
				footer={false}
				title="Nuevo tipo de registro"
				centered
				visible={isModalVisible}
				onCancel={onClose}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{height: '100%', width: "100%"}}
					onFinish={sendData}
					form={form}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre:"
						name="name"
						rules={[{
							required: true,
							min: 3,
							max: 40,
							validator: async (_, value) => {
								let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
								let spaces = /^(?!\s)/;
								console.log(value.length)
								if (value !== "") {
									if (value.length < 3) {
										return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
									}else if (value.length > 25) {
										return Promise.reject(new Error('El nombre solo puede contener un máximo de 25 caracteres.'));
									} else if (!chars.test(value)) {
										return Promise.reject(new Error('El nombre no puede contener números.'));
									} else if (!spaces.test(value)) {
										return Promise.reject(new Error('Nombre no válido'));
									} else {

										setName(value);
									}
								} else {
									return Promise.reject(new Error('Nombre vacío.'));
								}

							}
						}]}
					>
						<Input name={name}/>
					</Form.Item>
					<Form.Item>
						<Checkbox
							name="state"
							onChange={(e) => setState(e.target.checked)}>Activo</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{position: 'absolute', right: 1, top: 20}}>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default RegisterTypeRegister;