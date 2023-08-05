import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import * as constants from "../../../../redux/constants";
import { RUTA_API_MULTIMEDIA } from "../../../../redux/constants";
import { errorGlobal, success } from "../../../handle/Notification/Notification";
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllProfile } from "../../../../redux/actions/Configuration/ProfileAction";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Checkbox, Upload } from "antd";
import { creatAssessor, fetchAllAssessor, } from "../../../../redux/actions/Configuration/AssesorAction";
import { fetchAllAfiliatedCompany } from "../../../../redux/actions/Configuration/AfiliatedCompanyAction";

const validateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "${label} es requerido",
	// eslint-disable-next-line no-template-curly-in-string
	number: "El ${label} no puede ser menor a 0",
	types: {
		number: "No es un número válido!",
	},
};

const Adviser = () => {

	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const companies = useSelector((state) => state?.afiliatedCompany);


	const [fileList, setFileList] = useState([]);
	const [visible, setVisible] = useState(false);


	useEffect(() => {
		dispatch(fetchAllAfiliatedCompany());
		dispatch(fetchAllProfile());
	}, [dispatch]);

	const showDrawer = () => setVisible(true);
	const onClose = () => setVisible(false);

	const onAgeChange = (value) => {
		let age = value.diff(moment(), "years");
		form.setFieldsValue({
			age: age * -1,
		});
	};
	const onReset = () => {
		form.resetFields();
		setFileList([])
	};

	const handleSubmit = async () => {
		const values = await form.validateFields();
		const dto = {
			...values,
			birthday: values["birthday"].format("YYYY-MM-DD"),
			image: values["image"]?.fileList[0]?.thumbUrl,
		};
		delete dto["age"];


		dispatch(
			creatAssessor(dto, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success("Se ha registrado con éxito");
					onReset();
					onClose();
					dispatch(fetchAllAssessor());
				}
			}, async (error) => {
				errorGlobal(error);
			})
		);

	};
	const onRemove = async () => {
		return await new Promise((resolve) => {
			resolve(true)
		})
	}
	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		if (newFileList.length !== 0) {
			if (fileList[0] !== undefined) {
				if (fileList[0].thumbUrl !== undefined) {

				}
			}
		}
	};
	const onPreview = async file => {
		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	if (!validatePermission(constants.CREATE_ADVISOR_PERMISSION)) {
		return null;
	}

	return (
		<>
			<Button type="primary" onClick={showDrawer}>
				<PlusOutlined /> Nuevo Asesor
			</Button>
			<Drawer
				title="Nuevo Asesor"
				width="55vw"
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					layout="vertical"
					size="middle"
					form={form}
					onFinish={handleSubmit}
					validateMessages={validateMessages}
					name="formAdviser"
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item name="image" label="Foto Asesor">
								<Upload
									action={RUTA_API_MULTIMEDIA}
									listType="picture-card"
									className="avatar-uploader"
									fileList={fileList}
									onChange={onChange}
									onPreview={onPreview}
									onRemove={onRemove}
									maxCount={1}
								>
									{(fileList.length < 1) ? '+ Upload' : ''}
								</Upload>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={18} lg={18} xl={18}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="identification"
										label="Identificación"
										rules={[
											{
												min: 7,
												max: 11,
												required: true,
											},
											{
												validator: async (_, value) => {
													if (value === undefined) {
														return Promise.reject(new Error(" "));
													} else {
														let numbers = /^[0-9\s]+$/;
														let spaces = /^(?!\s)/;
														if (value !== "") {
															if (value.length < 6) {
																return Promise.reject(
																	new Error(
																		"La identificación debe tener al menos 7 dígitos."
																	)
																);
															}
															if (value.length >= 11) {
																if (!spaces.test(value)) {
																	return Promise.reject(
																		new Error("Identificación no válida.")
																	);
																}
																return Promise.reject(
																	new Error(
																		"La identificación debe tener máxímo 11 dígitos."
																	)
																);
															}
															if (!numbers.test(value)) {
																return Promise.reject(
																	new Error(
																		"La identificación no puede contener letras."
																	)
																);
															}
															if (!spaces.test(value)) {
																return Promise.reject(
																	new Error("Identificiación no válida.")
																);
															}
														} else {
															return Promise.reject(
																new Error("Identificiación vacía.")
															);
														}
													}
												},
											},
										]}
									>
										<Input placeholder="Por favor ingresar su identificación" />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="name"
										label="Nombre"
										rules={[
											{
												required: true,
												min: 5,
												max: 100,
												validator: async (_, value) => {
													if (value === undefined) {
														return Promise.reject(new Error("Nombre es requerido"));
													} else {
													let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
													let spaces = /^(?!\s)/;
													if (value !== "") {
														if (value.length < 3) {
															return Promise.reject(
																new Error(
																	"El nombre debe tener al menos 3 caracteres."
																)
															);
														}

														if (!chars.test(value)) {
															return Promise.reject(
																new Error(
																	"El nombre no puede contener números."
																)
															);
														}
														if (!spaces.test(value)) {
															return Promise.reject(
																new Error("Nombre no válido")
															);
														}
													} else {
														return Promise.reject(new Error("Nombre vacío."));
													}}
												},
											},
										]}
									>
										<Input placeholder="Por favor ingresar su nombre" />
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="email"
								label="Email"
								rules={[
									{
										required: true,
										type: "email",
										message: "El email debe ser un correo válido",
									},
								]}
							>
								<Input placeholder="Por favor ingresar su email" defaultValue={" "} />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="password"
								label="Contraseña"
								rules={[
									{
										required: true,
										validator: async (_, value) => {
											if (value === undefined) {
												return Promise.reject(new Error("La contraseña es requerida."));
											} else {
												if (value !== "") {
													if (value.length < 7) {
														return Promise.reject(
															new Error(
																"La contraseña debe tener al menos 7 dígitos."
															)
														);
													}
												} else {
													return Promise.reject(
														new Error("La contraseña está vacía.")
													);
												}
											}
										},
									},
								]}
								hasFeedback
							>
								<Input.Password placeholder="Contraseña" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
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

											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error("Las dos contraseñas deben ser iguales")
											);
										},
									}),
								]}
							>
								<Input.Password placeholder="Repita contraseña" />
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
										min: 7,
										max: 11,
										required: true,
										validator: async (_, value) => {
											if (value === undefined) {
												return Promise.reject(new Error("El teléfono es requerido."));
											}else{
											let numbers = /^[0-9\s]+$/;
											let spaces = /^(?!\s)/;
											if (value !== "") {
												if (value.length < 7) {
													return Promise.reject(
														new Error(
															"El teléfono debe tener al menos 7 dígitos."
														)
													);
												}
												if (value.length >= 11) {
													if (!spaces.test(value)) {
														return Promise.reject(
															new Error("Teléfono no válido.")
														);
													}
													return Promise.reject(
														new Error(
															"El teléfono debe tener máximo 11 dígitos."
														)
													);
												}
												if (!numbers.test(value)) {
													return Promise.reject(
														new Error("El teléfono no puede contener letras.")
													);
												}
												if (!spaces.test(value)) {
													return Promise.reject(
														new Error("Teléfono no válido")
													);
												}
											} else {
												return Promise.reject(new Error("Teléfono vacío."));
											}}
										},
									},
								]}
							>
								<Input
									style={{ width: "100%" }}
									placeholder="Por favor ingresar su teléfono"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="address"
								label="Dirección"
								rules={[
									{
										min: 5,
										max: 100,
										required: true,
										validator: async (_, value) => {
											if (value === undefined) {
												return Promise.reject(new Error("La dirección es requerida."));
											} else {
												if (value !== "") {
													if (value.length < 5) {
														return Promise.reject(
															new Error(
																"La dirección debe tener al menos 5 dígitos."
															)
														);
													}
												} else {
													return Promise.reject(new Error("vacío, La dirección es requerida."));
												}
											}
										}
									},
								]}
							>
								<Input placeholder="Por favor ingresar la dirección" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="area"
								label="Surcusal/Zona"
								rules={[
									{
										min: 5,
										max: 100,
										required: true,
										validator: async (_, value) => {
										
											if (value === undefined) {
												return Promise.reject(new Error("La sucursal es requerida."));
											} else {
												if (value !== "") {
													if (value.length < 5) {
														return Promise.reject(
															new Error(
																"La sucursal debe tener al menos 5 dígitos."
															)
														);
													}
												} else {
													return Promise.reject(new Error("vacío, La sucursal es requerida."));
												}
											}


										}
									},
								]}
							>
								<Input placeholder="Por favor ingresar una surcusal" />
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
									defaultValue=""
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{!Array.isArray(companies) &&
										companies._payload.filter(x => x.state !== false).map((item) => (
											<Select.Option key={item.id + item.name + item.id} value={item.id}>{item.name}</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="birthday"
								label="Fecha de nacimiento"
								rules={[
									{
										required: true,
									},
								]}
							>
								<DatePicker onChange={onAgeChange} style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="age"
								label="Edad"
								rules={[
									{
										validator: async (_, value) => {
											if (parseInt(value) < 18) {
												return Promise.reject(
													new Error("Debe ser mayor de edad.")
												);
											}
										},
									},
								]}
							>
								<Input
									style={{ width: "100%" }}
									placeholder="Edad"
									disabled={true}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item valuePropName="checked" name="state">
								<Checkbox>Activo</Checkbox>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} style={{ marginLeft: "70%" }}>
						<Form.Item>
							<Button onClick={onClose} style={{ marginRight: 8 }}>
								Cancel
							</Button>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Registrar asesor
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};

export default Adviser;
