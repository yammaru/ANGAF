import { Col, Form, Row, Select } from "antd";

const EstadosPedidoOpcion = () => {
	
	const handleChange = (data) => {
		console.log(data);
	};
	const handleSubmit = async () => {

		
		console.log( "2");
	};
    const stores = [
		{ value: 1, name: "Cambio" },
		{ value: 2, name: "Garantia" },
		{ value: 3, name: "Reportar una novedad con mi pedido" },
		{ value: 4, name: "Quiero que la devolucion de mi dinero" },
	];
	return (
		<>
			<Row style={{ width: "100%" }}>
				<Col style={{ width: "100%" }}>
					<Form.Item
						label={"¿Qué quieres hacer? "}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Select
							defaultValue=""
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Select.Option value="">
								Seleccione...
							</Select.Option>
							{stores.map((x) => (
								<Select.Option value={x.value}>
									{x.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};
export default EstadosPedidoOpcion;
