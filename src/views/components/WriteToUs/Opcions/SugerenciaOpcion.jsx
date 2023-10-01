import { Button, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

const SugerenciaOpcion = ({ form }) => {
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
	const details = [
		{ value: 1, name: "Infraestructura" },
		{ value: 2, name: "Servicio" },
		{ value: 3, name: "Ropa" },
		{ value: 4, name: "otro" },
	];
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
						label={"Detalle"}
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
							{details.map((x) => (
								<Select.Option value={x.value}>
									{x.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row style={{ width: "100%" }}>
				<Col style={{ width: "100%" }}>
					<Form.Item
						label={"¿Cuál es tu sugerencia?"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
						<TextArea style={{ width: "100%" }}></TextArea>
					</Form.Item>
				</Col>
			</Row>
			<Row style={{ width: "100%" }}>
				<Form.Item
					style={{ width: "100%" }}
					label={
						<span>
							Adjunto
							<br />
							<p
								style={{
									fontSize: "0.8em",
									fontFamily: '"Source Sans Pro", sans-serif',
								}}
							>
								(.jpg, .doc, .xls hasta 15 MB)
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
							<Input
								
								placeholder="Abjunto"
							></Input>
						</Col>
						<Col style={{ width: "20%" }}>
							<Button style={{ height: "100%" }} block>Adjuntar</Button>
						</Col>
					</Row>
				</Form.Item>
			</Row>
		</>
	);
};
export default SugerenciaOpcion;
