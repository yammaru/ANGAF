import {
	Button,
	Col,
	Divider,
	Form,
	Radio,
	Row,
	Select,
	Space,
	Tabs,
	Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useWindowWidth } from "../../handle/size/size";
import { warning } from "../../handle/Notification/Notification";
import InicialOpcion from "./Opcions/InicialOpcion";
import PropuestaOpcion from "./Opcions/PropuestaOpcion";
import SugerenciaOpcion from "./Opcions/SugerenciaOpcion";
import PqrOpcion from "./Opcions/PqrOpcion";
import FacturaOpcion from "./Opcions/FacturaOpcion";
import SeguimientoPqrOpcion from "./Opcions/SeguimientoPqrOpcion";
import TrabajaAqui from "./Opcions/TrabajaAqui";
import EstadosPedidoOpcion from "./Opcions/EstadosPedidoOpcion";
import FinalButton from "./Opcions/FinalButton";
const { Title, Text } = Typography;

const WriteToUsSection = () => {
	const [position, setPosition] = useState(0);
	const [whatChange, setWhatChange] = useState();
	const [form] = Form.useForm();
	const anchoPagina = useWindowWidth(useState, useEffect);
	const handleSubmit = async () => {
		const values = await form.validateFields();
		if (values["whatWant"]) {
			setPosition(values["whatWant"]);
		}

		console.log(
			values["whatWant"] ? values["whatWant"] : "hola",
			position,
			selectedComponentObj
		);
	};
	const selectedComponentObj = [
		{
			value: 0,
			componet: (
				<InicialOpcion
					whatChange={whatChange}
					setWhatChange={setWhatChange}
				/>
			),
		},
		{
			value: 1,
			componet: <PropuestaOpcion form={form} setPosition={position} />,
		},
		{
			value: 2,
			componet: <SugerenciaOpcion form={form} setPosition={position} />,
		},
		{
			value: 3,
			componet: <PqrOpcion form={form} setPosition={position} />,
		},
		{
			value: 4,
			componet: <FacturaOpcion form={form} setPosition={position} />,
		},
		{
			value: 5,
			componet: (
				<SeguimientoPqrOpcion form={form} setPosition={position} />
			),
		},
		{
			value: 6,
			componet: <TrabajaAqui form={form} setPosition={position} />,
		},
		{
			value: 7,
			componet: (
				<EstadosPedidoOpcion form={form} setPosition={position} />
			),
		},
	].filter((x) => x.value === position)[0];

	return (
		<Row
			style={{
				width: "100%",
			}}
		>
			<Divider
				style={{ paddingBottom: anchoPagina > 766 ? "5%" : "10%" }}
			/>
			<Row
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Form
				className="formContacto"
					onFinish={handleSubmit}
					layout="vertical"
					style={{
						width: anchoPagina<766?"90%":"70%",
					}}
					form={form}
				>
					<Title
						level={1}
						style={{
							textAlign: "center",
						}}
					>
						{position == 7 ? "Cambios y devoluciones" : "Contacto"}
					</Title>
					<Divider />
					{selectedComponentObj && selectedComponentObj.componet}
					{whatChange == 5 ? (
						<></>
					) : (
						<Text>*Campos obligatorios</Text>
					)}
					{whatChange == 5 ? (
						<Title level={5}>
							Para hacer seguimiento a tu PQR's comunícate por
							whatsapp al número: 3013095065, opción 6 o haz clic
							en el siguiente enlace{" "}
							<a
								target="_blanck"
								href="https://api.whatsapp.com/send/?phone=573013095065"
							>
								https://wa.link/anga.
							</a>
						</Title>
					) : (
						<FinalButton
							position={position}
							setPosition={setPosition}
							anchoPagina={anchoPagina}
						/>
					)}
				</Form>
			</Row>
			<Divider style={{ paddingBottom: "2%", visibility: "hidden" }} />
		</Row>
	);
};
export default WriteToUsSection;
