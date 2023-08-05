import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../../redux/constants";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import {validatePermission} from "../../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllProfile } from "../../../../../redux/actions/Configuration/ProfileAction";
import { Upload, Form, Modal, Button, Input, Col, Row, Checkbox, Select, InputNumber } from "antd";
import { createUser, fetchAllUsers } from "../../../../../redux/actions/Configuration/usersAction";
import { fetchAllAfiliatedCompany } from "../../../../../redux/actions/Configuration/AfiliatedCompanyAction";




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
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}
const UserForm = () => {
	const dispatch = useDispatch();
	useEffect(() => dispatch(fetchAllAfiliatedCompany()), [dispatch]);
	const [imageUrl, setImageUrl] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => dispatch(fetchAllProfile()), [dispatch]);

	const profiles = useSelector((state) => state?.profile);
	const afiliatedsCompanys = useSelector((state) => state?.afiliatedCompany);

	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};
	const onClose = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		onClose()
		onReset()
	};

	const onReset = () => {
		form.resetFields();
	};

	function getPasswordValidationPromise(getFieldValue, password) {
		if (!password || getFieldValue("password") === password)
			return Promise.resolve();
		return Promise.reject(new Error("Las dos Contraseñas Deben ser Iguales"));
	}

	function calculateLengthNumber(number) {
		return number.toString().split("").length;
	}

	function getTelephoneValidationPromise(phoneNumber) {
		let spaces = /^(?!\s)/;
		if (phoneNumber != null) {
			if (calculateLengthNumber(phoneNumber) < 7) {
				return Promise.reject(
					new Error("El teléfono debe tener al menos 7 dígitos")
				);
			} else if (calculateLengthNumber(phoneNumber) >= 11) {
				if (!spaces.test(phoneNumber)) {
					return Promise.reject(new Error("Teléfono no válido"));
				}
				return Promise.reject(
					new Error("El teléfono debe tener maxímo 11 dígitos")
				);
			}
		}
		return Promise.resolve();
	}

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) => {
				setLoading(false);
				setImageUrl(imageUrl);
			});
		}
	};
	
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const sendData = async () => {
		const values = await form.validateFields();
		let fData = new FormData();
		fData.append("email", values["email"]);
		fData.append("password", values["password"]);
		fData.append(
			"state",
			values["state"] === undefined ? 0 : values["state"] ? 1 : 0
		);
		fData.append("affiliated_company", values["affiliated_company"]);
		fData.append("profile", values["profile"]);
		fData.append("phone_number", values["phone_number"]);
		fData.append("name", values["name"]);
		if (values["image"] !== undefined) {
			for (let i = 0; i < values["image"].length; i++) {
				fData.append(
					`image`,
					values["image"][i].originFileObj,
					values["image"][i].name
				);
			}
		}
		
		dispatch(createUser(fData, async function (response){
			if(response.error){
				errorGlobal(response.message);
			} else{
				success("Usuario editado correctamente")
				dispatch(fetchAllUsers());
				onReset();
				handleCancel();
			}
		}));
	};
	

	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	return (
		<>
			{validatePermission(constants.CREATE_USER_PERMISSION) ? (
				<Button type="primary" onClick={showModal}>
					<PlusOutlined /> Nuevo usuario
				</Button>
			) : null}
			<Modal
				title="Nuevo usuario"
				visible={isModalVisible}
				width={900}
				footer={null}
				onCancel={handleCancel}
			>
				<Form
					layout="vertical"
					size="middle"
					onFinish={sendData}
					validateMessages={validateMessages}
					initialValues={{ state: true }}
					form={form}
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item
								name="image"
								label="Foto usuario"
								valuePropName="fileList"
								getValueFromEvent={normFile}
							>
								<Upload
									action={constants.RUTA_API + "/api/try"}
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									accept="image/*"
									maxCount={1}
									name={"image"}
									onChange={handleChange}
								>
									{imageUrl ? (
										<img
											src={imageUrl}
											alt="avatar"
											style={{ width: "100%" }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={18} lg={18} xl={18}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="name"
										label="Nombre"
										rules={[
											{
												trigger: 'onBlur',
												required: true,
												min: 3,
												max: 100,
												pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
												message: "Texto invalido"
											},
										]}
									>
										<Input placeholder="Por favor ingresar su nombre" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="email"
										label="Email"
										rules={[
											{
												required: true,
												type: "email",
											},
										]}
									>
										<Input placeholder="Por favor ingresar su email" />
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="password"
								label="Contraseña"
								rules={[
									{
										min: 7,
										max: 11,
										required: true,
									},
								]}
								hasFeedback
							>
								<Input.Password placeholder="Contraseña" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="confirm"
								label="Confirmar contraseña"
								dependencies={["password"]}
								hasFeedback
								rules={[
									{
										required: true,
										message: "Por favor confirme su contraseña",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											return  getPasswordValidationPromise(getFieldValue, value)
										},
									}),
								]}
							>
								<Input.Password placeholder="Repita contraseña" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="profile"
								label="Perfil"
								rules={[
									{
										required: true,
									},
								]}
							>
								<Select
									showSearch
									placeholder="Por favor elegir el perfil"
									optionFilterProp="children"
									defaultValue="-"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									<Select.Option value="-">Seleccione...</Select.Option>
									{!Array.isArray(profiles) && profiles._payload &&
										profiles._payload.filter( x => {return x.id !== 2 && x.state === 1}).map((item) => (
											<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="affiliated_company"
								label="Compañía asociada"
								
							>
								<Select
									showSearch
									placeholder="Por favor elegir la compañía asociada"
									optionFilterProp="children"
									defaultValue="-"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									<Select.Option value={0}>Seleccione...</Select.Option>
									{!Array.isArray(afiliatedsCompanys) &&
										afiliatedsCompanys._payload.filter(x => x.state !== false).map((item) => (
											<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="phone_number"
								label="Teléfono"
								rules={[
									{
										type: "number",
										validator: async (_, value) => {
											return  getTelephoneValidationPromise(value);
										},
									},
								]}
							>
								<InputNumber
									style={{ width: "100%" }}
									placeholder="Por favor ingresar su teléfono"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item name="state" label="Estado" valuePropName="checked">
								<Checkbox>Activo</Checkbox>
							</Form.Item>
						</Col>
					</Row>
					<Row xs={24} sm={24} md={12} lg={12} xl={12}>
						<div
							style={{
								textAlign: "right",
								float: "left",
							}}
						>
							<Button onClick={handleCancel} style={{ marginRight: 8 }}>
								Cancel
							</Button>
							<Button type="primary" htmlType="submit">
								Registrar usuario
							</Button>
						</div>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default UserForm;
