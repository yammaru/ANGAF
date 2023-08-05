import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { success, errorGlobal } from '../../../../handle/Notification/Notification';
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { creatAfiliatedCompany, fetchAllAfiliatedCompany } from '../../../../../redux/actions/Configuration/AfiliatedCompanyAction';

const RegisterFormComponent = () => {

	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onClose = () => {
		setIsModalVisible(false);
		onReset();
	}

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
	};

	const sendData = async () => {
		let values = await form.validateFields();
		values.state = (values.state === undefined) ? false : values.state;
		try {
			dispatch(
				creatAfiliatedCompany(values, async (response) => {
					const res = await response;
					if (res.error) {
 
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Se ha registrado con éxito");
					}
					onClose();
					dispatch(fetchAllAfiliatedCompany());
				}),
			);
		} catch (e) {
		}
	}
	if (!validatePermission(constants.CREATE_AFFILIATE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button type="primary" onClick={showModal} icon={<PlusOutlined/>}>
				Nuevo
			</Button>
			<Modal
				title="Nueva empresa asociada"
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={() => setIsModalVisible(false)}
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
						rules={[
							{
								required: true,
								validator: async (_, value) => {
									let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
									let spaces = /^(?!\s)/;
									if (value !== '') {
										if (value.length < 3) {
											return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
										} else if (!chars.test(value)) {
											return Promise.reject(new Error('El nombre no puede contener números.'));
										} else if (!spaces.test(value)) {
											return Promise.reject(new Error('Nombre no válido'));
										}
									} else {
										return Promise.reject(new Error('Nombre vacío.'));
									}
								}
							},
						]}
					>
						<Input
							placeholder="nombre"
						/>
					</Form.Item>
					<Form.Item name="state" valuePropName="checked">
						<Checkbox>Activo</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{position: 'absolute', right: 1, top: 20}}>
							Registrar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default RegisterFormComponent;