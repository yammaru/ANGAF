import { Col, Form, Row, Select } from "antd";

const EstadosPedidoOpcion = () => {
	const handleChange = (data) => {
		console.log(data);
	};
	const handleSubmit = async () => {
        const values = await form.validateFields();
		console.log("2",values);
	};
    const [form] = Form.useForm();
	const stores = [
		{ value: "cambio", name: "Cambio" },
		{ value: "garantia", name: "Garantia" },
		{ value: "reporte", name: "Reportar una novedad con mi pedido" },
		{ value: "devolucion", name: "Quiero que la devolucion de mi dinero" },
	];
	return (
		<>
			<Form
				className="formContacto"
				onFinish={handleSubmit}
				layout="vertical"
				form={form}
			>
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
			</Form>
		</>
	);
};
export default EstadosPedidoOpcion;
