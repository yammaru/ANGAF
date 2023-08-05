import {connect} from 'react-redux';
import React, {useState} from "react";
import {PlusOutlined} from '@ant-design/icons';
import * as constants from "../../../../../redux/constants";
import {Form, Input, Button, Checkbox, Modal, notification} from 'antd';
import {validatePermission} from "../../../../handle/PermissionMethods/PermissionMethods";
import {createOccupation, fetchAllOccupation} from '../../../../../redux/actions/Configuration/OccupationAction';

const RegisterType = ({dispatchCreateOccupationAction, dispatchFetchAllOccupationAction}) => {

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
	};

	const [form] = Form.useForm();
	const [name, setName] = useState("");
	const [state, setState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const errors = [];

	const showModal = () => {
		setIsModalVisible(true);
	}

	const onClose = () => {
		setIsModalVisible(false);
	}

	const occupation = {
		name, state
	}

	const onReset = () => {
		form.resetFields();
	};

	const sendData = () => {
		dispatchCreateOccupationAction(occupation, (response) => {
			if (response.error) {
				error(response.message);
			} else {
				success('Ocupación registrada');
			}
		});
		dispatchFetchAllOccupationAction();
	}

	const success = (response) => {
		openNotificationWithIcon('success', response);
		onClose();
		onReset();
		dispatchFetchAllOccupationAction();
	}

	const error = (response) => {
		for (let key in response) {
			errors.push(`${response[key][0]}`);
		}
		openNotificationWithIcon('error', errors);
		onClose();
		onReset();
	}

	const openNotificationWithIcon = (type, message) => {
		notification[type]({
			message: `${type}:`,
			description:
				`${message.toString()}`
		});
	};

	if (!validatePermission(constants.CREATE_OCCUPATION_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button
				type="primary" onClick={showModal} icon={<PlusOutlined/>}
			>
				Nuevo
			</Button>
			<Modal
				title="Nuevo ocupación"
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
						label="Nombre"
						name="name"
						rules={[
							{
								required: true,
								min: 3,
								max: 100,
								validator: async (_, value) => {
									let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
									let spaces = /^(?!\s)/;
									setName(value);
									if (name !== '') {
										if (name.length < 3) {
											return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
										} else if (!chars.test(name)) {
											return Promise.reject(new Error('El nombre no puede contener caracteres especiales.'));
										} else if (!spaces.test(name)) {
											return Promise.reject(new Error('Nombre no válido'));
										} else {
											setName(name);
										}
									} else {
										return Promise.reject(new Error('Nombre vacío.'));
									}

								}
							}
						]}>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Item>
					<Form.Item>
						<Checkbox
							name="state"
							onChange={(e) => setState(e.target.checked)}
						>Activo</Checkbox>
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

const mapDispatchToProps = dispatch => ({
	dispatchCreateOccupationAction: (occupation, onSuccess, onError) =>
		dispatch(createOccupation(occupation, onSuccess, onError)),
	dispatchFetchAllOccupationAction: () => dispatch(fetchAllOccupation())
})
export default connect(null, mapDispatchToProps)(RegisterType);