import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";

const FacturaOpcion = () => {
	const handleChange = (data) => {
		console.log(data);
	};
	const handleSubmit = async () => {
		console.log("2");
	};
	const stores = [
		{ value: 1, name: "ecomes" },
		{ value: 2, name: "ecomes2" },
		{ value: 3, name: "ecome3" },
		{ value: 4, name: "ecome4" },
	];
	const onChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	return (
		<>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Tienda "}
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
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Cédula/NIT"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Input
							defaultValue=""
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Nombre completo o razón social"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Input
							defaultValue=""
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
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
					>
						<Input
							defaultValue=""
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Correo electrónico"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Input
							defaultValue=""
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
				</Col>
				<Col style={{ width: "49%" }}>
					<Form.Item
						label={"Teléfono / Celular"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<Input
							defaultValue=""
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row style={{ width: "100%" }}>
				<Form.Item
					style={{ width: "100%" }}
					label={
						<span>
							Factura POS
							<br />
							<p
								style={{
									fontSize: "0.8em",
									fontFamily: '"Source Sans Pro", sans-serif',
								}}
							>
								Recuerda que la fecha de generación debe ser de
								los últimos 3 meses, debe ser la página 1 del
								RUT y preferiblemente no debe tener clave para
								acceder al documento
							</p>
						</span>
					}
					name="whatWant"
					rules={[
						{
							required: true,
							message: "Debes seleccionar una de las opciones.",
						},
					]}
				>
					<Row justify={"space-between"} style={{ width: "100%" }}>
						<Col style={{ width: "78%" }}>
							<Input placeholder="Factura POS"></Input>
						</Col>
						<Col style={{ width: "20%" }}>
							<Button style={{ height: "100%" }} block>
								Adjuntar
							</Button>
						</Col>
					</Row>
				</Form.Item>
			</Row>{" "}
			<Row style={{ width: "100%" }}>
				<Form.Item
					style={{ width: "100%" }}
					label={
						<span>
							RUT
							<br />
							<p
								style={{
									fontSize: "0.8em",
									fontFamily: '"Source Sans Pro", sans-serif',
								}}
							>
								Recuerda que la fecha de generación debe ser de
								los últimos 3 meses, debe ser la página 1 del
								RUT y preferiblemente no debe tener clave para
								acceder al documento
							</p>
						</span>
					}
					name="whatWant"
					rules={[
						{
							required: true,
							message: "Debes seleccionar una de las opciones.",
						},
					]}
				>
					<Row justify={"space-between"} style={{ width: "100%" }}>
						<Col style={{ width: "78%" }}>
							<Input placeholder="RUT"></Input>
						</Col>
						<Col style={{ width: "20%" }}>
							<Button style={{ height: "100%" }} block>
								Adjuntar
							</Button>
						</Col>
					</Row>
				</Form.Item>
			</Row>
			<Row >
				<Form.Item
					
					name="whatWant"
					rules={[
						{
							required: true,
							message: "Debes seleccionar una de las opciones.",
						},
					]}
				>
					
					<Checkbox style={{ width: "100%",display:"flex" }} onChange={onChange}>
						Acepto términos y condiciones
					</Checkbox>
				</Form.Item>
			</Row>
		</>
	);
};
export default FacturaOpcion;
