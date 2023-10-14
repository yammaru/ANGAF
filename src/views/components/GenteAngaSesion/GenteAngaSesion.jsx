import { Avatar, Card, Carousel, Col, Image, Input, Row, Typography } from "antd";
import React, { Fragment } from "react";
const { Search } = Input;
const { Title } = Typography;
const { Meta } = Card;
const GenteAngaSesion = () => {
	const elements = {
		name: "lobo1",
		value: 5524,
		path: [
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			"https://static.wikia.nocookie.net/overlordmaruyama/images/3/3a/Lupusregina_Beta.png",
		],
		tienda: "Anga",
		id: 2,
		role_model: "La modelo mide 1.60m y tiene una talla S",
		available_sizes: ["M", "S", "XL"],
	};
	return (
		<Row justify={"center"} style={{ width: "100%" }}>
			<Col xl={8}>
				<Row justify={"center"} style={{ width: "100%" }}>
					<Col xl={9}>
						<Row justify={"end"} style={{ width: "90%" }}>
							<div
								style={{
									width: "auto",
									height: "90px",
									borderRadius: "5%",

									border: " 1px solid red",
								}}
							>
								<h1
									style={{
										fontSize: 70,
										textAlign: "center",
									}}
								>
									500
								</h1>
							</div>
						</Row>
					</Col>
					<Col xl={15}>
						<Title style={{ textAlign: 1 == 1 ? "center" : "" }}>
							VACANTES DISPONIBLES
						</Title>
					</Col>
				</Row>
				<Row justify={"center"} style={{ width: "100%" }}>
					<Col>
						<Input />
					</Col>
				</Row>
			</Col>
			<Col xl={16} lg={24}>
				<Row justify={"space-around"} style={{ width: "100%" }}>
					<Col
						style={{
							width: "410px",
							height: 200,
							paddingBottom: "2%",
						}}
					>
						<Card
                     
							style={{ height: "100%" }}
							actions={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						>
							<Meta
								avatar={
									<Avatar src="https://joeschmoe.io/api/v1/random" />
								}
								title="Card title"
								description="This is the description"
							/>
						</Card>
					</Col>
					<Col style={{ width: "410px" }}>
						<Card>hola</Card>
					</Col>
					<Col style={{ width: "410px" }}>
						<Card>hola</Card>
					</Col>
					<Col style={{ width: "410px" }}>
						<Card>hola</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default GenteAngaSesion;
