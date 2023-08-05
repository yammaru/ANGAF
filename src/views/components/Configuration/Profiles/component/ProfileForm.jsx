import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { success, errorGlobal } from "../../../../handle/Notification/Notification";
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { createAllProfile, fetchAllProfile } from "../../../../../redux/actions/Configuration/ProfileAction";

const ProfileForm = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onReset = () => {
		form.resetFields();
	};

	const onClose = () => {
		setIsModalVisible(false);
		onReset();
	};

	const sendData = async () => {
		let values = await form.validateFields();
		values.state = values.state === undefined ? false : values.state;
		try {
			dispatch(
				createAllProfile(values, async (response) => {
					const res = await response;
					if (res.error) {
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Se ha registrado con éxito");
					}
					onClose();
					dispatch(fetchAllProfile());
				})
			);
		} catch (e) {}
	};

	return (
		<>
			{validatePermission(constants.CREATE_PROFILE_PERMISSION) ? (
				<Button type="primary" onClick={showModal}>
					Nuevo Perfil
				</Button>
			) : null}
			<Modal
				title={"Crear perfil"}
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={() => setIsModalVisible(false)}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{ height: "100%", width: "100%" }}
					onFinish={sendData}
					form={form}
				>
					<Form.Item
						label="Nombre:"
						name="name"
						rules={[
							{
								min: 5,
								max: 40,
								required: true,
								validator: async (_, value) => {
									let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
									let spaces = /^(?!\s)/;
									if (value !== "") {
										if (value.length < 5) {
											return Promise.reject(
												new Error("El nombre debe tener al menos 5 caracteres.")
											);
										} else if (!chars.test(value)) {
											return Promise.reject(
												new Error("El nombre no puede contener números.")
											);
										} else if (!spaces.test(value)) {
											return Promise.reject(new Error("Nombre no válido"));
										}
									} else {
										return Promise.reject(
											new Error("No se puede registrar un pefil vacío.")
										);
									}
								},
							},
						]}
					>
						<Input placeholder="nombre" />
					</Form.Item>
					<Form.Item name="state" valuePropName="checked">
						<Checkbox>Activo</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ position: "absolute", right: 1, top: 20 }}
						>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ProfileForm;
