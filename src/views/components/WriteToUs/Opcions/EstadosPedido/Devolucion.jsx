import { Col, Form, Row, Select } from "antd";
import { useState } from "react";

const EstadosPedidoOpcion = () => {
	const handleChange = (data) => {
		console.log(data);
	};
	const handleSubmit = async () => {
		console.log("2");
	};
    const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
	const stores = [
		{ value: 1, name: "Cambio" },
		{ value: 2, name: "Garantia" },
		{ value: 3, name: "Reportar una novedad con mi pedido" },
		{ value: 4, name: "Quiero que la devolucion de mi dinero" },
	];
	return (
		<>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Nombres y apellidos"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Tipo de documento"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Número de documento"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"¿La compra aparece a tu nombre?"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Radio.Group onChange={onChange} value={value}>
							<Radio value={1}>Si</Radio>
							<Radio value={2}>No</Radio>
						</Radio.Group>
					</Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Correo"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Teléfono celular"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Teléfono Whatsapp"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Dirección"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Detalles de tu dirección"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Barrio"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Departamento"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Ciudad"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					></Form.Item>
				</Col>
			</Row>
		</>
	);
};
export default EstadosPedidoOpcion;
