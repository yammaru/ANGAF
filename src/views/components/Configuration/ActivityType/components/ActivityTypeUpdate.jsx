import { useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Tooltip, Checkbox } from "antd";
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { updateActivityTypeById, fetchAllActivityType, } from "../../../../../redux/actions/Configuration/ActivityTypeAction";

const ActivityTypeUpdate = ({ activityType }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [visible,setVisible] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState();

	useEffect(() => {
		if (activityType.id === 1 || activityType.id === 2 ){
			setVisible(true)
		}
		form.setFieldsValue({ name: activityType.name, state: activityType.state });
	}, []);

	// eslint-disable-next-line no-template-curly-in-string
	const validateMessages = { required: "${label} es requerido" };
	const textEditar = <span style={{ color: "#6A6963" }}>Editar</span>;

	const onClose = () => {
		setIsModalVisible(false);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const onFinish = (values) => {
		dispatch(
			updateActivityTypeById(activityType.id, values, async (response) => {
				let res = await response;
				if (res.error) {
 
					errorGlobal("¡UPS! Ocurrió un error mientras se actualizaba");
					onClose();
				} else {
					success("Tipo de actividad actualizado");
					onClose();
					dispatch(fetchAllActivityType());
				}
			})
		);
	};

	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textEditar}>
				<Button
					type="primary"
					style={{ backgroundColor: "#ffa247", borderColor: "#ffa247" }}
					size={"small"}
					disabled={visible}
					onClick={showModal}
					icon={<EditOutlined />}
				/>
			</Tooltip>

			<Modal
				title={"Actualizar tipo de actividad"}
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={onClose}
				width={500}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{ height: "100%", width: "100%" }}
					form={form}
					onFinish={(values) => {
						onFinish(values);
					}}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre:"
						name="name"
						rules={[
							{
								required: true,
								validator: async (text, value) => {
									let spaces = /^(?!\s)/;
									if (value.length < 5) {
										return Promise.reject(
											new Error("El nombre debe tener al menos 5 caracteres.")
										);
									} else if (!spaces.test(value)) {
										return Promise.reject(new Error("Nombre no válido"));
									}
								},
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="state" valuePropName="checked">
						<Checkbox>Activo</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ position: "absolute", right: 1, top: 20 }}
							disabled={
								!!form.getFieldsError().filter(({ errors }) => errors.length)
									.length
							}
						>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ActivityTypeUpdate;
