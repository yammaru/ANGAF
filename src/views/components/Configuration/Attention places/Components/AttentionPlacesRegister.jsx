import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal, notification } from "antd";
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { createAttentionPlaces, fetchAllAttentionPlaces } from "../../../../../redux/actions/Configuration/AttentionPlacesAction";

const AttentionPlacesRegister = () => {

	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [state, setState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const showModal = () => setIsModalVisible(true);

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label} es requerido",
	};
	const attentionPlaces = {
		name,
		state,
	};
	const errors = [];

	const onReset = () => form.resetFields();

	const handleCancel = () => setIsModalVisible(false);

	const onClose = () => setIsModalVisible(false);

	const sendData = () => {
		dispatch(
			createAttentionPlaces(attentionPlaces, (response) => {
				if (response.error) {
					error(response.message);
				} else {
					success("Lugar de atencion registrado");
				}
				dispatch(fetchAllAttentionPlaces());
			})
		);
	};

	const success = (response) => {
		openNotificationWithIcon("success", response);
		onClose();
		onReset();
	};

	const error = (response) => {
		for (let key in response) {
			errors.push(`${response[key][0]}`);
		}
		openNotificationWithIcon("error", errors);
		onClose();
		onReset();
	};

	const openNotificationWithIcon = (type, message) => {
		notification[type]({
			message: `${type}:`,
			description: `${message.toString()}`,
		});
	};
	if (!validatePermission(constants.CREATE_ATTENTION_PLACE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button
				onClick={showModal}
				style={{
					backgroundColor: "#1890ff",
					borderColor: "#1890ff",
					color: "#ffffff",
				}}
				icon={<PlusOutlined/>}
			>
				Nuevo
			</Button>
			<Modal
				footer={false}
				title="Agregar luegares de atención"
				visible={isModalVisible}
				onCancel={handleCancel}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{height: "100%", width: "100%"}}
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
											return Promise.reject(new Error('El nombre no puede contener números.'));
										} else if (!spaces.test(name)) {
											return Promise.reject(new Error('Nombre no válido'));
										} else {
											setName(name);
										}
									} else {
										return Promise.reject(new Error('Nombre vacío'));
									}

								}

							},
						]}
					>
						<Input value={name} onChange={(e) => setName(e.target.value)}/>
					</Form.Item>
					<Form.Item>
						<Checkbox name="state" onChange={(e) => setState(e.target.checked)}>
							Activo
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{position: "absolute", right: 1, top: 20}}
						>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AttentionPlacesRegister;
