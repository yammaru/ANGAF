import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import IdentificationField from "./IdentificationField";
import {Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import {fetchAllOccupation} from "../../../../../redux/actions/Configuration/OccupationAction";
import OccupationRegister from "../../../Configuration/Occupation/components/OccupationRegister";
import {fetchAllRegisterType} from "../../../../../redux/actions/Configuration/RegisterTypeAction";
import RegisterTypeRegister from "../../../Configuration/RegisterType/components/RegisterTypeRegister";


const styles = {
	ItemFormStyle: {
		width: "100%",
	},
	button: {
		width: "100%",
	},
};

const Forms = ({detectAge,disable}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllOccupation())
		dispatch(fetchAllRegisterType())
	}, [])
	
	const occupationDatabase = useSelector((state) => state?.occupation);
	const registerType = useSelector((state) => state?.registerType);
	const Validator = (value) => {
		let chars =/^[a-zA-Z\u00C0-\u017F\s]+$/
		if (!chars.test(value)){
			return Promise.reject(
				new Error("El nombre no puede contener números.")
			)
		}
	}
	return (
		<>
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
							},{
								validator: async (_,value) =>{
									return Validator(value)
								}
							},
							{
								required: true,
								message: "El campo es requerido.",
							}
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
								min: 3,
								max: 100,
								message: "Debe tener al menos 3 letras.",
							},{
								validator: async (_,value) =>{
									return Validator(value)
								}
							},
							{
								required: true,
								message: "El campo es requerido.",
							}
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
							showSearch
							disabled={disable}
							optionFilterProp="children"
							style={styles.ItemFormStyle}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							<Select.Option value="">Seleccione...</Select.Option>
							<Select.Option value={1}>Cedula de Ciudadania</Select.Option>
							<Select.Option value={2}>Cedula de Extranjeria</Select.Option>
							<Select.Option value={3}>Nit</Select.Option>
							<Select.Option value={4}>Tarjeta de Identidad</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<IdentificationField disable={disable} styles={styles} />
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: false, message: "El campo es requerido." },
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
						rules={[{ required: false, message: "El campo es requerido." }]}
					>
						<Select
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
							
						]}
					>
						<Input style={{ width: "100%" }} placeholder="Teléfono" />
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
							style={{ width: "70%" }}
						>
							<Select
								style={styles.ItemFormStyle}
								showSearch
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
								loading={Array.isArray(occupationDatabase)}
							>
								<Select.Option value="">Seleccione...</Select.Option>
								{!Array.isArray(occupationDatabase) &&
								occupationDatabase._payload?.filter(x=>x.state===1)?.map((item) => (
									<Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="add" label="  ">
							<OccupationRegister/>
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
							<RegisterTypeRegister/>
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
						]}
					>
						<DatePicker
							onChange={detectAge}
							style={styles.ItemFormStyle}
							placeholder="Ingrese la fecha"
						/>
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Form.Item
						name="age" 
						label="Edad"
					>
						<Input style={styles.ItemFormStyle} placeholder="Edad" disabled={true}/>
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
						<InputNumber style={styles.ItemFormStyle} placeholder="Cantidad de Hijos"/>
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<Form.Item valuePropName="checked" label="Activo" name="state">
						<Checkbox />
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={6} lg={64} xl={6}>
					<Form.Item valuePropName="checked" label="Habeas Data" name="habeasData">
						<Checkbox />
					</Form.Item>
				</Col>
			</Row>
		</>
	)
}

export default Forms