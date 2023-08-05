import { useState } from "react";
import { useDispatch } from "react-redux";
import React, { useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { ProfileContext } from "./ProfileProvider";
import { Form, Input, Button, Modal, Tooltip, Checkbox } from "antd";
import { success, errorGlobal } from "../../../../handle/Notification/Notification";
import { updateProfileById, fetchAllProfile } from "../../../../../redux/actions/Configuration/ProfileAction";

const ProfileUpdate = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { profile } = useContext(ProfileContext);
	const [name, setName] = useState(profile.name);
	const [state, setState] = useState(profile.state);
	const [id, setId] = useState(profile.id);
	const [isModalVisible, setIsModalVisible] = useState();

	// eslint-disable-next-line no-template-curly-in-string
	const validateMessages = { required: "${label} es requerido" };

	const onFinish = async () => {
		let values = await form.validateFields();
		values.state = state;
		try {
			dispatch(
				updateProfileById(id, values, async (response) => {
					const res = await response;
					if (res.error) {
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Perfil actualizado");
					}
					onClose();
					dispatch(fetchAllProfile());
				})
			);
		} catch (e) {}
	};

	const onClose = () => {
		setIsModalVisible(false);
		onReset();
	};

	const updateStateProfile = () => {
		setState(profile.state);
		setName(profile.name);
		setId(profile.id);
	};

	const showModal = () => {
		setIsModalVisible(true);
		updateStateProfile();
	};

	const onReset = () => form.resetFields();

	const fillFields = () => {
		form.setFieldsValue({
			name: name,
		});
	};

	const textEditar = <span style={{ color: "#6A6963" }}> Editar </span>;
	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textEditar}>
				<Button
	onClick={() => {fillFields();showModal()}}
	type="primary"
	style={{backgroundColor: "#ffa247", borderColor: "#ffa247"}}
	size="small"
	icon={<EditOutlined/>}
	/>
			</Tooltip>

			<Modal
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={onClose}
				title="Actualizar Perfil"
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{ height: "100%", width: "100%" }}
					form={form}
					onFinish={onFinish}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre:"
						name="name"
						rules={[
							{
								required: true,
								min: 5,
								max: 40,
								validator: async (_, name) => {
									let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
									let spaces = /^(?!\s)/;
									if (name.length < 5) {
										return Promise.reject(
											new Error("El nombre debe tener al menos 5 caracteres.")
										);
									} else if (!chars.test(name)) {
										return Promise.reject(
											new Error("El nombre no puede contener números.")
										);
									} else if (!spaces.test(name)) {
										return Promise.reject(new Error("Nombre no válido"));
									} else {
										setName(name);
									}
								},
							},
						]}
					>
						<Input value={name} />
					</Form.Item>
					<Form.Item name="state">
						<Checkbox
							checked={state}
							onChange={(e) => setState(e.target.checked)}
						>
							Activo
						</Checkbox>
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

export default ProfileUpdate;
