import { Button, Col, Form, Input, Row } from "antd";
const {TextArea}=Input;
const PropuestaOpcion = () => {
	const handleChange = (data) => {
		console.log(data);
	};
	const handleSubmit = async () => {
		console.log("2");
	};
	return (
		<>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "100%" }}>
                <Form.Item
						label={"Asunto"}
						name="whatWant"
						rules={[
							{
								required: true,
								message:
									"Debes seleccionar una de las opciones.",
							},
						]}
					>
                        <Input placeholder="Asunto "/>
                    </Form.Item>
					
				</Col>
			</Row>
			<Row style={{ width: "100%" }}>
				<Col style={{ width: "100%" }}>
					<Form.Item
						label={"¿Cuál es tu pregunta, propuesta o solicitud?"}
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
							<Input placeholder="Abjunto"></Input>
						</Col>
						<Col style={{ width: "20%" }}>
							<Button style={{ height: "100%" }} block>
								Adjuntar
							</Button>
						</Col>
					</Row>
				</Form.Item>
			</Row>
		</>
	);
};
export default PropuestaOpcion;
