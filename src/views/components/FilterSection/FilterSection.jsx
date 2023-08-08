import { Button, Card, Carousel, Col, Divider, Row, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { FORMATTER_PESO } from "../../../redux/constants";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text, Title } = Typography;
const contentStyle = {
	margin: 0,
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

const FilterSection = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
	const elements = [
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo3",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo4",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo5",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo6",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo7",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo8",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
	];
	const url =  window.location.pathname;;

	// Dividir la URL en partes utilizando "/" como separador
	const parts = url.split("/");

	// Obtener la última palabra (último elemento del array)
	const lastWord = parts[parts.length - 1];

	const [visibleElements, setVisibleElements] = useState(elements);
	const [noVisibleElements, setNoVisibleElements] = useState(
		visibleElements.slice(0, 6)
	);
	const handlePrevPage = () => {
		const lastElement = visibleElements.pop();
		visibleElements.unshift(lastElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, 6));
	};

	const handleNextPage = () => {
		const firstElement = visibleElements.shift();
		visibleElements.push(firstElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, 6));
	};

	return (
		<>
			<Divider />
			<Row justify={"center"} style={{ width: "100%" }}>
				<Col
					style={{
						width: "10%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handlePrevPage}
						//	disabled={currentPage === 0}
						icon={<CaretLeftOutlined />}
					/>
				</Col>
				<Col style={{ width: "80%" ,display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							flexWrap: "wrap"}}>
				
						{noVisibleElements.map((element, index) => (
							<div
								
								style={{
									width: "16%",
									overflow: "hidden",
									height: "120px",
								}}
							>
								<div
									style={{
										width: "100%",
										background: `url(${element.path[1]})`,
										height: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										backgroundPosition: "center center",
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
									}}
									className="image ki"
								>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="transparent-background"
									>
										<h3
											style={{
												mixBlendMode: "difference",
												color: "white",
											}}
										>
											{element.name}
										</h3>
									</div>
								</div>
							</div>
						))}
			
				</Col>
				<Col
					style={{
						width: "10%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handleNextPage}
						//	disabled={currentPage === 0}
						icon={<CaretRightOutlined />}
					/>
				</Col>
			</Row>
			<Divider />
			<Row
				justify={"center"}
				style={{
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
					paddingBottom: "2%",
					color: "#787878",
				}}
			>
				<h2
					style={{
						color: "#484848",
					}}
				>
					Ropa para {lastWord}
				</h2>
				<h3
					style={{
						color: "#787878",
					}}
				>
					{lastWord=="hombre"?"Ropa de hombre en nuestro sitio web y tiendas del país":"Outfit onfire para mujer"}
				</h3>
			</Row>
			<Row style={{ width: "100%" }}>
				<Col style={{ width: "20%" }}></Col>
				<Col style={{ width: "80%" }}>
					<Row justify={"space-around"} style={{ width: "100%" }}>
						{elements.map((element, index) => (
							<Card
								hoverable
								style={{
									height: 400,
									width: 250,
									overflow: "hidden",
								}}
								cover={
									<img
										style={{
											height: 300,
											width: 250,
											overflow: "hidden",
										}}
										alt="example"
										src={
											index == hoveredCardIndex
												? element.path[0]
												: element.path[1]
										}
									/>
								}
								onMouseEnter={() => setHoveredCardIndex(index)} // Establecer el índice de la tarjeta al hacer hover
								onMouseLeave={() => setHoveredCardIndex(null)} // Reiniciar el índice al dejar de hacer hover
							>
								<Meta
									title={element.name}
									description={FORMATTER_PESO.format(
										element.value
									)}
								/>
							</Card>
						))}
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default FilterSection;
