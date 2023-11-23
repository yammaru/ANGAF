import React, { useState } from "react";
import {
	Modal,
	Tabs,
	Table,
	Descriptions,
	Avatar,
	Image,
	Row,
	Col,
	Typography,
	Radio,
} from "antd";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SizeGuideModal = ({ visible, onCancel }) => {
	const columns = [
		{
			title: "size",
			dataIndex: "size",
			key: "size",
		},
		{
			title: "height",
			dataIndex: "height",
			key: "height",
		},
		{
			title: "chest",
			dataIndex: "chest",
			key: "chest",
		},
		{
			title: "waist",
			dataIndex: "waist",
			key: "waist",
		},
		{
			title: "hips",
			dataIndex: "hips",
			key: "hips",
		},
	];

	const dataCm = [
		{
			key: "1",
			size: "S",
			height: "160 - 165",
			chest: "82 - 86",
			waist: "64 - 68",
			hips: "100 - 100",
		},
		{
			key: "2",
			size: "M",
			height: "166 - 170",
			chest: "87 - 91",
			waist: "69 - 73",
			hips: "100 - 100",
		},
		{
			key: "3",
			size: "L",
			height: "171 - 175",
			chest: "92 - 96",
			waist: "74 - 78",
			hips: "100 - 100",
		},
		{
			key: "4",
			size: "XL",
			height: "176 - 179",
			chest: "97 - 101",
			waist: "79 - 84",
			hips: "104 - 110",
		},
	];

	const dataIn = [
		{
			key: "1",
			size: "S",
			height: "63 - 65",
			chest: "32 - 34",
			waist: "26 - 26.5",
			hips: "35.5 - 35.5",
		},
		{
			key: "2",
			size: "M",
			height: "65 - 67",
			chest: "34 - 36",
			waist: "27 - 28.5",
			hips: "37.5 - 39.5",
		},
		{
			key: "3",
			size: "L",
			height: "67 - 69",
			chest: "36 - 38",
			waist: "29 - 30.5",
			hips: "39.5 - 41",
		},
		{
			key: "4",
			size: "XL",
			height: "69 - 71",
			chest: "38 - 40",
			waist: "30.5 - 33",
			hips: "41 - 43",
		},
	];
	const [mode, setMode] = useState("cm");
	const handleModeChange = (e) => {
		setMode(e.target.value);
	};
	const dataSource = mode === "cm" ? dataCm : dataIn;
	const measurementData = [
		{
			title: "Estatura",
			description:
				"De pie y con postura recta, toma la medida desde el piso hasta la parte superior de tu cabeza.",
		},
		{
			title: "Pecho",
			description:
				"Mide la circunferencia total de tu pecho en la parte de mayor volumen, por debajo de las axilas.",
		},
		{
			title: "Cintura",
			description:
				"Mide la circunferencia de tu cintura en su punto más estrecho. Más o menos 4 o 5 centímetros por encima del ombligo.",
		},
		{
			title: "Cadera",
			description:
				"Mide la circunferencia total de tu cadera en su parte más ancha a la altura de los glúteos.",
		},
	];

	return (
		<Modal
			visible={visible}
			title="Guía de tallas"
			onCancel={onCancel}
			footer={null}
			width={"80%"}
			bodyStyle={{ background: "#f5f5f5" }}
		>
			<Row justify={"space-between"}>
				<Title level={5}>
					{`Superior mujer (${
						mode === "cm" ? "Centímetros" : "Pulgadas"
					})`}
				</Title>
				<Radio.Group
					onChange={handleModeChange}
					value={mode}
					style={{
						marginBottom: 8,
					}}
				>
					<Radio.Button value="cm">cm</Radio.Button>
					<Radio.Button value="in">in</Radio.Button>
				</Radio.Group>
			</Row>
			<Table
				dataSource={dataSource}
				columns={columns}
				bordered
				pagination={false}
			/>{" "}
			<Row style={{ width: "100%" }}>
				<Text level={1}>
					*Las medidas de la tabla son aproximadas y pueden variar
					entre prendas.
				</Text>
			</Row>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "60%" }}>
					<br />
					<Row style={{ width: "100%" }}>
						<Title level={4}>Cómo tomar tus medidas</Title>
					</Row>

					<Row style={{ width: "100%", padding: "2%" }}>
						{measurementData.map((item, index) => (
							<div key={index}>
								<Title level={5}>{`${index + 1}. ${
									item.title
								}`}</Title>
								<Text>{item.description}</Text>
								<br />
							</div>
						))}
					</Row>
				</Col>
				<Col style={{ width: "30%" }}>
					<Image
						height={400}
						src="https://b2cmattelsa.vtexassets.com/arquivos/superiorMujerCM_Desk.jpg"
						alt="avatar talla"
					/>
				</Col>
			</Row>
		</Modal>
	);
};

export default SizeGuideModal;
