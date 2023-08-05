import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Spinner from "../../../handle/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { errorGlobal, success, warning } from "../../../handle/Notification/Notification";
import OccupationRegister from "../../Configuration/Occupation/components/OccupationRegister";
import { fetchAllOccupation } from "../../../../redux/actions/Configuration/OccupationAction";
import TypeRegistration from "../../Configuration/RegisterType/components/RegisterTypeRegister";
import { fetchAllRegisterType } from "../../../../redux/actions/Configuration/RegisterTypeAction";
import { createCustomer, fetchAllCustomer } from "../../../../redux/actions/Customer/CustomerAction";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Checkbox, InputNumber } from "antd";


const styles = {
	ItemFormStyle: {
		width: "100%",
	},
	button: {
		width: "100%",
	},
};

const CustomersRegistration = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (visible) {
			dispatch(fetchAllOccupation());
			dispatch(fetchAllRegisterType());
		}
	}, [visible,dispatch]);

	const occupationDatabse = useSelector((state) => state?.occupation);
	const registerType = useSelector((state) => state?.registerType);

	const onCloseDrawer = () => setVisible(false);
	const onShowDrawer = () => setVisible(true);
	const resetFields = () => form.resetFields();

	const getAgeOfDate = (date) => {
		let age = 0;
		if (date) {
			let actuallyDate = new Date();
			let dateBirth = new Date(date);
			age = actuallyDate.getFullYear() - dateBirth.getFullYear();
			let month = actuallyDate.getMonth() - dateBirth.getMonth();
			if (
				month < 0 ||
				(month === 0 && actuallyDate.getDate() < dateBirth.getDate())
			) {
				age--;
			}

			form.setFieldsValue({
				age,
			});
		} else {
			form.setFieldsValue({
				age: 0,
			});
		}

		return age;
	};

	const handleSubmit = async () => {
		setLoading(true);
		const values = await form.validateFields();
		console.log(values["dateBirth"])
		const dto = {
			name: values["name"],
			lastName: values["lastName"],
			gender: values["gender"],
			phone_number: values["phone"],
			address: values["direction"] || null,
			birthday: values["dateBirth"] !== undefined ? values["dateBirth"].format("YYYY-MM-DD") : null,
			identification: values["identification"] || null,
			email: values["email"],
			identification_type:
				values["identificationType"] === undefined ||
				values["identificationType"] === ""
					? null
					: values["identificationType"],
			occupation:
				values["occupation"] === undefined || values["occupation"] === ""
					? null
					: values["occupation"],
			register_type:
				values["typeRegister"] === undefined || values["typeRegister"] === ""
					? null
					: values["typeRegister"],
			children_number: values["sons"] || null,
			has_habeas_data: values["habeasData"] || false,
			state: values["state"],
			assesor_id: (JSON.parse(localStorage.getItem('USER_INFO'))).id
		};
		dispatch(
			createCustomer(dto, (response) => {
				const res = response;
				if (res.error) {
					for (const key in res.message) {
						if (res.message[key][0] === "validation.unique") {
							warning(
								`Los datos del campo ${
									key
								} ya se encuentran registrados.`
							);
						}
					}
					errorGlobal("¡UPS! Ocurió un error mientras se registraba!");
					setLoading(false);
				} else {
					success("Cliente resgistrado exitosamente");
					onCloseDrawer();
					resetFields();
					setLoading(false);
					dispatch(fetchAllCustomer());
				}
			})
		);
	};

	return (
		<>
			{validatePermission(constants.CREATE_CUSTOMER_PERMISSION) ? (
				<Button style={styles.button} type="primary" onClick={onShowDrawer}>
					<PlusOutlined style={{ fontSize: 20 }} /> {"Nuevo Cliente"}
				</Button>
			) : null}
			<Drawer
				title="Nuevo Cliente"
				width="800"
				onClose={onCloseDrawer}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					layout="vertical"
					onFinish={handleSubmit}
					size="middle"
					form={form}
					initialValues={{ state: true }}
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="name"
								label="Nombres"
								rules={[
									{
										min: 3,
										max: 100,
										message: "Debe tener al menos 3 letras.",
									},
									{
										validator: async (_, value) => {
											let chars =/^[a-zA-Z\u00C0-\u017F\s]+$/;
											if (!chars.test(value)) {
												return Promise.reject(
													new Error("El nombre no puede contener números.")
												);
											}
										},
									},
									{
										required: true,
										message: "El campo es requerido.",
									},
								]}
							>
								<Input placeholder="Nombres" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="lastName"
								label="Apellidos"
								rules={[
									{
										required: true,
										message: "El campo es requerido.",
									},
									{
										min: 3,
										max: 100,
										message: "Debe tener al menos 3 letras.",
									},
									{
										validator: async (_, value) => {
											let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
											if (!chars.test(value)) {
												return Promise.reject(
													new Error("El nombre no puede contener números.")
												);
											}
										},
									},
								]}
							>
								<Input placeholder="Apellidos" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="identificationType"
								label="Tipo de identificación"
							>
								<Select
									defaultValue=""
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={styles.ItemFormStyle}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									<Select.Option value="1">Cedula de Ciudadania</Select.Option>
									<Select.Option value="2">Cedula de Extranjeria</Select.Option>
									<Select.Option value="3">Nit</Select.Option>
									<Select.Option value="4">Tarjeta de Identidad</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="identification"
								label="Número de identificación"
								rules={[
									{   required:false,
										min: 7,
										max: 15,
										message: "Debe tener al menos 7 números y no más de 15.",
									},
								]}
							>
								<Input
									placeholder="Identificacion"
									style={styles.ItemFormStyle}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="email"
								label="Email"
								rules={[
									{ required: true, message: "El campo es requerido." },
									{ type: "email", message: "No es un email válido." },
								]}
							>
								<Input placeholder="Email" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="gender"
								label="Género"
								rules={[{ required: true, message: "El campo es requerido." }]}
							>
								<Select
									defaultValue=""
									style={{ width: "100%" }}
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccionar...</Select.Option>
									<Select.Option value="M">Masculino</Select.Option>
									<Select.Option value="F">Femenino</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="phone"
								label="Teléfono"
								rules={[
									{ required: true, message: "El Teléfono es requerido." },
									{
										type: "number",
										min: 999999,
										max: 999999999999999,
										message: "Debe tener al menos 7 números y no más de 15.",
									},
								]}
							>
								<InputNumber style={{ width: "100%" }} placeholder="Teléfono" />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="direction"
								label="Dirección"
								rules={[
									{
										min: 5,
										message: "Debe tener al menos 5 caracteres.",
									},
								]}
							>
								<Input placeholder="Dirección" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Input.Group compact>
								<Form.Item
									label="Ocupación"
									name="occupation"
									style={{ width: "73%" }}
								>
									<Select
										defaultValue=""
										style={styles.ItemFormStyle}
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										loading={Array.isArray(occupationDatabse)}
									>
										<Select.Option value="">Seleccione...</Select.Option>

										{!Array.isArray(occupationDatabse) &&
											occupationDatabse._payload?.map((item) => (
												<Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
											))}
									</Select>
								</Form.Item>
								<Form.Item name="add" label="  ">
									<OccupationRegister />
								</Form.Item>
							</Input.Group>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Input.Group compact>
								<Form.Item
									label="Tipo de registro"
									name="typeRegister"
									style={{ width: "70%" }}
								>
									<Select
										defaultValue=""
										style={styles.ItemFormStyle}
										showSearch
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										loading={Array.isArray(registerType)}
									>
										<Select.Option value="">Seleccione...</Select.Option>
										{!Array.isArray(registerType) &&
											registerType._payload?.map((item) => (
												<Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
											))}
									</Select>
								</Form.Item>
								<Form.Item name="add" label="  ">
									<TypeRegistration />
								</Form.Item>
							</Input.Group>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="dateBirth"
								label="Fecha de Nacimiento"
								rules={[
									{
										required: false,
									},
									// {
									// 	validator: async (_, value) => {
									// 		if (getAgeOfDate(value) < 18) {
									// 			return Promise.reject(
									// 				new Error("Debe ser mayor de edad.")
									// 			);
									// 		}
									// 	},
									// },
								]}
							>
								<DatePicker
									onChange={getAgeOfDate}
									style={styles.ItemFormStyle}
									placeholder="Ingrese la fecha"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item name="age" label="Edad">
								<Input
									style={styles.ItemFormStyle}
									placeholder="Edad"
									disabled={true}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="sons"
								label="Numero de Hijos"
								rules={[{ type: "number" }]}
							>
								<InputNumber
									style={styles.ItemFormStyle}
									placeholder="Cantidad de Hijos"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item valuePropName="checked" label="Activo" name="state">
								<Checkbox />
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={6} lg={64} xl={6}>
							<Form.Item
								valuePropName="checked"
								label="Habeas Data"
								name="habeasData"
							>
								<Checkbox />
							</Form.Item>
						</Col>
					</Row>

					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Registrar Cliente
						</Button>
					</div>
					{loading ? <Spinner /> : null}
				</Form>
			</Drawer>
		</>
	);
};
export default CustomersRegistration;
