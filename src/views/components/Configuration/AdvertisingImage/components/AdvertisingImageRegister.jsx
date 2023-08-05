import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Upload, Modal, message } from "antd";
import { RUTA_API_MULTIMEDIA } from "../../../../../redux/constants";
import {
	errorGlobal,
	success,
} from "../../../../handle/Notification/Notification";
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import {
	createAdvertisingImage,
	fetchAllAdvertisingImage,
} from "../../../../../redux/actions/Configuration/AdvertisingImageAction";

const { TextArea } = Input;

const RegisterFormComponent = () => {
	const dispatch = useDispatch();

	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onClose = () => {
		setIsModalVisible(false);
		onReset();
	};

	const onReset = () => {
		form.resetFields();
	};

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const handleSubmit = async () => {
		const values = await form.validateFields();
		if (values.state === undefined) {
			values.state = false;
		}
		if (
			values.image.fileList[0].originFileObj.type !== "image/png" &&
			values.image.fileList[0].originFileObj.type !== "image/jpeg" &&
			values.image.fileList[0].originFileObj.type !== "image/jpg"
		) {
			message.error(
				"El archivo que intenta subir no corresponde a una imagen"
			);
		} else {
			try {
				const dto = {
					...values,
					image: await toBase64(
						values["image"].fileList[0].originFileObj
					),
				};
				dispatch(
					createAdvertisingImage(dto, async (response) => {
						const res = await response;
						if (res.error) {
							errorGlobal("¡UPS!, Ha ocurrido un error");
						} else {
							success("Se ha registrado con éxito");
						}
						onClose();
						dispatch(fetchAllAdvertisingImage());
					})
				);
			} catch (errorInfo) {}
		}
	};
	if (!validatePermission(constants.CREATE_ADVERSITING_IMAGE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button type="primary" onClick={showModal}>
				<PlusOutlined /> Nueva Imagen
			</Button>

			<Modal
				title="Registrar imágenes publicitarias"
				visible={isModalVisible}
				footer={false}
				onCancel={handleCancel}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{ height: "100%", width: "100%" }}
					form={form}
					onFinish={handleSubmit}
				>
					<Form.Item name="image" label="Imágen publicitaria">
						<Upload
							action={RUTA_API_MULTIMEDIA}
							listType="picture-card"
							maxCount={1}
							accept="image/*"
						>
							+ subir
						</Upload>
					</Form.Item>
					<Form.Item name="description" label="Descripción:">
						<TextArea rows={6} />
					</Form.Item>
					<Form.Item
						name="state"
						label="Estado"
						valuePropName="checked"
					>
						<Checkbox>Activo </Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							tmlType="submit"
							style={{ position: "absolute", right: 1, top: 10 }}
						>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default RegisterFormComponent;
