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
	Slider,
	InputNumber,
} from "antd";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const FindYourSize = ({ visible, onCancel, element }) => {
	const [mode, setMode] = useState("cm");
	const handleModeChange = (e) => {
		setMode(e.target.value);
	};

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
	const [inputValue, setInputValue] = useState(1);
	const onChange = (newValue) => {
		setInputValue(newValue);
	};
	return (
		<Modal
			centered
			visible={visible}
			title="Encuentra tu talla"
			onCancel={onCancel}
			footer={null}
			width={"80%"}
			bodyStyle={{ background: "#f5f5f5", height: "80%" }}
		>
			<Row justify={"space-between"} style={{ width: "100%" }}>
				<Col style={{ width: "20%" }}>
					<Image
						width={"100%"}
						src={element.path[0]}
						alt="avatar talla"
					/>
					<Title level={5}>{element.name}</Title>
				</Col>
				<Col style={{ width: "75%" }}>
					<Row justify={"space-between"}>
						<Row
							style={{
								display: "flex",
								flexDirection: "column",
								width: "80%",
								padding: 0,
							}}
						>
							<Title level={5}>Tus medidas</Title>
							<Text>
								Encuentra tu talla en base a personas con tus
								mismas medidas:
							</Text>
						</Row>

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

					<Row justify={"space-between"} style={{ width: "100%" }}>
						<Col style={{ width: "35%" }}>
							{measurementData.map((item, index) => (
								<div key={index}>
									<Text>
										<b>
											{`${index + 1}.`}
											{item.title}:
										</b>
									</Text>
									<br />
									<Row>
										<Col style={{ width: "80%" }}>
											<Slider
												min={1}
												max={200}
												onChange={onChange}
												value={
													typeof inputValue ===
													"number"
														? inputValue
														: 0
												}
											/>
										</Col>
										<Col >
											<Text>
												<b
													
												>
													{inputValue}{" "}{mode}
												</b>
											</Text>
										</Col>
									</Row>

									<br />
								</div>
							))}
						</Col>
						<Col
							style={{
								width: "30%",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Image
								src="https://b2cmattelsa.vtexassets.com/arquivos/superiorMujerCM_Desk.jpg"
								alt="avatar talla"
							/>
						</Col>
						<Col style={{ width: "35%" }}>
							<br />
							<Row style={{ width: "100%" }}>
								<Title level={5}>Cómo tomar tus medidas</Title>
							</Row>

							<Row
								style={{
									width: "100%",
									padding: "2%",
									overflow: "hidden",
								}}
							>
								{measurementData.map((item, index) => (
									<div key={index}>
										<Text>
											<b>
												{`${index + 1}.`}
												{item.title}:
											</b>
										</Text>
										<br />
										<Text>{item.description}</Text>
										<br />
									</div>
								))}
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Modal>
	);
};

export default FindYourSize;
