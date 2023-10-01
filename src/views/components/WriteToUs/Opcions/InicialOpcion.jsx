import { Button, Col, Divider, Form, Row, Select, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const InicialOpcion = ({ whatChange, setWhatChange }) => {
	
	const handleChange = (data) => {
		
		setWhatChange(data);
	};
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
							onChange={(e) => handleChange(e)}
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
							<Select.Option value={1}>
								Propuesta o solicitud
							</Select.Option>
							<Select.Option value={2}>Sugerencia</Select.Option>
							<Select.Option value={3}>
								Queja y reclamo
							</Select.Option>
							<Select.Option value={4}>
								Solicitud de factura electrónica
							</Select.Option>
							<Select.Option value={5}>
								Seguimiento PQR's
							</Select.Option>
							<Select.Option value={6}>
								Trabaja aquí
							</Select.Option>
							<Select.Option value={7}>
								Cambio, garantía o novedad en pedido
							</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
      
			{whatChange == 2 || whatChange == 3 ? (
				<Row style={{ width: "100%" }}>
					<Col style={{ width: "100%" }}>
						<Form.Item
							label={"¿Sobre? "}
							name="About"
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
								<Select.Option value={1}>Tienda</Select.Option>
								<Select.Option value={2}>
									Sitio web
								</Select.Option>
								<Select.Option value={3}>Ropa</Select.Option>
								<Select.Option value={4}>
									Canales de atencion
								</Select.Option>
								<Select.Option value={5}>
									Contenido en Redes
								</Select.Option>
								<Select.Option value={6}>Otros</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			) : (
				<></>
			)}
		</>
	);
};
export default InicialOpcion;
