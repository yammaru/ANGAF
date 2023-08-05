import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useContext } from "react";
import { RegisterTypeContext } from "./RegisterTypeProvider";
import { Form, Input, Button, Checkbox, Tooltip, Modal } from 'antd';
import {errorGlobal, success} from "../../../../handle/Notification/Notification";
import { updateRegisterTypeById, fetchAllRegisterType } from '../../../../../redux/actions/Configuration/RegisterTypeAction';

const RegisterTypeUpdate = () => {

	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const {registerType} = useContext(RegisterTypeContext);
	const [name, setName] = useState(registerType.name)
	const [state, setState] = useState(registerType.state)
	const [id, setId] = useState(registerType.id);
	const [isModalVisible, setIsModalVisible] = useState(false);
	// eslint-disable-next-line no-template-curly-in-string
	const validateMessages = {required: '${label} es requerido',};

	const textEditar = <span style={{color: '#6A6963'}}>Editar</span>

	const onReset = () => form.resetFields();

	const onClose = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	const showModal = () => {
		setIsModalVisible(true);
		updateStateActivityType();
	};

	const updateStateActivityType = () => {
		setState(registerType.state);
		setName(registerType.name);
		setId(registerType.id);
	}

	const fillFields = () => {
		form.setFieldsValue({
			name: name,
			state: state
		});
	}

	const onFinish = async () => {
		const data = await form.validateFields();
		dispatch( updateRegisterTypeById(id,data,async (response)=>{
			const res =await response
			if (res.error){
				errorGlobal(response.message)
			}else {
				success(response.message)
				dispatch(fetchAllRegisterType());
				onReset()
				onClose()
			}
		}))
	};

	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textEditar}>
				<Button
					type="primary"
					style={{backgroundColor: '#ffa247', borderColor: '#ffa247'}}
					size={'small'}
					onClick={() => {showModal(); fillFields()}}
					icon={<EditOutlined/>}
				/>
			</Tooltip>
			<Modal
				title={'Editar tipo de registro'}
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={onClose}
				width={500}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					onFinish={onFinish}
					form={form}
					style={{height: '100%', width: "100%"}}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre:"
						name="name"
						rules={[{
							required: true,
							validator: async (_, name) => {
								let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
								let spaces = /^(?!\s)/;
								if (name.length < 3) {
									return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
								} else if (!chars.test(name)) {
									return Promise.reject(new Error('El nombre no puede contener números.'));
								} else if (!spaces.test(name)) {
									return Promise.reject(new Error('Nombre no válido'));
								} else {
									setName(name);
								}
							}
						}]}
					>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Item>
					<Form.Item 
						label="" 
						name="state">
						<Checkbox
							checked={state}
							onChange={(e) => setState(e.target.checked)}
						>Activo</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit"
								style={{position: 'absolute', right: 1, top: 20}}>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default RegisterTypeUpdate