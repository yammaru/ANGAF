import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { CustomerContext } from "./CustomerProvider";
import { useUpdateCustomers } from "./Hooks/UseUpdateCustomers";
import { success, errorGlobal } from "../../../handle/Notification/Notification";
import OccupationRegister from "../../Configuration/Occupation/components/OccupationRegister";
import TypeRegistration from "../../Configuration/RegisterType/components/RegisterTypeRegister";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, InputNumber, Checkbox } from "antd";
import { updateCustomerById, fetchAllCustomer } from "../../../../redux/actions/Customer/CustomerAction";
import { captureDateBirth, validateAgeCustomer, getAgeOfDate } from "../../../handle/HandleDatePicker/HandleDate";

import { useDispatch } from "react-redux";

const CustomersUpdate = () => {
	const { request } = useContext(CustomerContext);

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label} es requerido",
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			email: "${label} no es un correo válido",
			// eslint-disable-next-line no-template-curly-in-string
			number: "${label} debe ser un número",
		},
		number: {
			range: "Teléfono debe tener entre 7 caracteres y 15 caracteres",
		},
	};
	const dispatch = useDispatch();
	const dateFormat = "YYYY/MM/DD";
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
		onReset()
	};
	const onReset = () => {
		form.resetFields();
	}

	const {
		identification_type,
		setIdentificationType,
		identification,
		setIdentification,
		gender,
		setGender,
		name,
		setName,
		lastName,
		setLastName,
		birthday,
		setDateBirth,
		address,
		setDirection,
		children_number,
		setSons,
		email,
		setEmail,
		phone_number,
		setPhone,
		occupation,
		setOccupation,
		register_type,
		setTypeRegister,
		state,
		setState,
		has_habeas_data,
		setData,
	} = useUpdateCustomers(request.customer);

	const updatedCustomer = {
		identification_type: parseInt(identification_type),
		identification,
		gender,
		name,
		lastName,
		birthday,
		address,
		children_number,
		email,
		phone_number,
		occupation,
		register_type,
		state,
		has_habeas_data,
	};

	const fillFields = () => {
		form.setFieldsValue({
			name: name,
			surname: lastName,
			email: email,
			identification: identification,
			phone: parseInt(phone_number),
			occupation: parseInt(occupation),
			typeRegister: parseInt(register_type),
			age: getAgeOfDate(birthday),
			sons: children_number,
			direction: address,
			identificationType: identification_type
				? identification_type.toString()
				: null,
			gender: gender,
		});
	};

	const sendData = () => {
		dispatch(
			updateCustomerById(
				request.customer.id,
				updatedCustomer,
				async (response) => {
					const res = await response;

					if (res.error) {
						errorGlobal("¡UPS! Ocurió un error mientras se actualizaba!");
					} else {
						success("Se ha actualizado correctamente.");
						onClose();
						onReset()
						dispatch(fetchAllCustomer());
					}
				}
			)
		);
	};

	return (
		<>
			<Button
	onClick={ () => {fillFields(); showDrawer()}}
	type="primary"
	style={{backgroundColor: "#ffa247", borderColor: "#ffa247"}}
	size={"small"}
	icon={<EditOutlined/>}
	/>
			<Drawer
				title="Editar Clientes"
				width="800"
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					layout="vertical"
					size="middle"
					form={form}
					onFinish={sendData}
					validateMessages={validateMessages}
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="name"
								label="Nombres"
								rules={[
									{
										required: true,
										validator: async (_, name) => {
											let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
											let spaces = /^(?!\s)/;
											if (name.length < 3) {
												return Promise.reject(
													new Error(
														"El nombre debe tener al menos 3 caracteres."
													)
												);
											} else if (!chars.test(name)) {
												return Promise.reject(
													new Error(
														"El nombre no puede contener caracteres especiales."
													)
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
								<Input
									placeholder="Por Favor Ingresar su Nombre"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="surname"
								label="Apellidos"
								rules={[{ required: true }]}
							>
								<Input
									placeholder="Ingrese sus Apellidos"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="identificationType"
								label="Tipo de Indentificacion"
								rules={[{ required: true }]}
							>
								<Select
									onChange={setIdentificationType}
									placeholder="Elija tipo de identificacion"
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
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
								label="Identificacion"
								rules={[
									{
										required: true,
										message: "Identificacion es Requerida",
									},
									() => ({
										validator(_, value) {
											if (!isNaN(value || value === "")) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error("La Identificacion Debe Ser Numerica")
											);
										},
									}),
									() => ({
										validator(_, value) {
											if (value > 999999) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error("Numero de identificacion demasiado corto")
											);
										},
									}),
								]}
							>
								<Input
									placeholder="Ingrese su Identificacion"
									value={identification}
									onChange={(e) => setIdentification(e.target.value)}
									disabled
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="email"
								label="Email"
								rules={[{ required: true, type: "email" }]}
							>
								<Input
									placeholder="Por Favor Ingresar su Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="gender"
								label="Genero"
								rules={[{ required: true }]}
							>
								<Select
									onChange={setGender}
									placeholder="Genero"
									style={{ width: "100%" }}
									showSearch
									defaultValue={gender.toString()}
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
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
								rules={[{ type: "number", min: 999999, max: 999999999999999 }]}
							>
								<InputNumber
									style={{ width: "100%" }}
									value={phone_number}
									onChange={(value) => setPhone(value)}
									placeholder="Por Favor Ingresar su Teléfono"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item name="direction" label="Direccion">
								<Input
									value={address}
									onChange={(e) => setDirection(e.target.value)}
									placeholder="Ingrese su Direccion"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Input.Group compact>
								<Form.Item
									label="Ocupacion"
									name="occupation"
									style={{ width: "70%" }}
								>
									<Select
										onChange={setOccupation}
										placeholder="Elija Ocupacion"
										style={{ width: "100%" }}
										showSearch
										defaultValue={occupation ? occupation.toString() : ""}
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										<Select.Option value="">Seleccione...</Select.Option>
										{request.selectOccupationOptions.map((item) => (
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
									label="Tipo de Registro"
									name="typeRegister"
									style={{ width: "70%" }}
								>
									<Select
										placeholder="Elija Tipo de Registro"
										onChange={setTypeRegister}
										style={{ width: "100%" }}
										showSearch
										defaultValue={register_type ? register_type.toString() : ""}
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										<Select.Option value="">Seleccione...</Select.Option>
										{request.selectRegisterTypesOptions.map((item) => (
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
								initialValue={moment(birthday, dateFormat)}
								rules={[
									{ required: true },
									() => ({
										validator(_, value) {
											return validateAgeCustomer(value);
										},
									}),
								]}
							>
								<DatePicker
									value={birthday}
									defaultValue={moment(birthday, dateFormat)}
									format={dateFormat}
									onChange={(value) =>
										captureDateBirth(form, value, setDateBirth)
									}
									style={{ width: "100%" }}
									placeholder="Ingrese su Fecha"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item name="age" label="Edad">
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
							<Form.Item
								name="sons"
								label="Numero de Hijos"
								rules={[{ type: "number" }]}
							>
								<InputNumber
									value={children_number}
									onChange={(value) => setSons(value)}
									style={{ width: "100%" }}
									placeholder="Cantidad de Hijos"
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item label="Activo" name="state">
								<Checkbox
									checked={state}
									onChange={(e) => setState(e.target.checked)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={6} lg={64} xl={6}>
							<Form.Item label="Habeas Data" name="data">
								<Checkbox
									checked={has_habeas_data}
									onChange={(e) => setData(e.target.checked)}
								/>
							</Form.Item>
						</Col>
					</Row>

					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Guardar
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	);
};

export default CustomersUpdate;
