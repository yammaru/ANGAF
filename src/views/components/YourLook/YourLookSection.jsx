import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FORMATTER_PESO } from "../../../redux/constants";
import Title from "antd/lib/typography/Title";
import { useWindowWidth } from "../../handle/size/size";
import yourLookLogo from "../../../includes/images/yourLook.jpeg";
const { Meta } = Card;
const YourLookSection = () => {
	const anchoPagina = useWindowWidth(useState, useEffect);
	const elements = [
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
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
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
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
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
	];
	const mayoA1025 = () => {
		return anchoPagina > 1025 ?? false;
	};
	useEffect(() => {
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
	}, [anchoPagina]);
	const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
	const [visibleElements, setVisibleElements] = useState(elements);
	const [noVisibleElements, setNoVisibleElements] = useState(
		visibleElements.slice(0, mayoA1025() ? 4 : 2)
	);
	const handlePrevPage = () => {
		const lastElement = visibleElements.pop();
		visibleElements.unshift(lastElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
	};

	const handleNextPage = () => {
		const firstElement = visibleElements.shift();
		visibleElements.push(firstElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
	};
	return (
		<>
			<Divider style={{ paddingBottom: "4%" }} />
			<Row justify={"center"} style={{ width: "100%" }}>
				<Image width={200} src={yourLookLogo} />
				<Title level={4} style={{ width: "100%", textAlign: "center" }}>
					Inspírate con nuestra galería y comparte tus looks en redes
					sociales con #Angastyle y @anga.
				</Title>
			</Row>
			<Row justify={"center"} style={{ width: "100%" }}>
				<Col
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					{noVisibleElements.map((element, index) => (
						<Card
							hoverable
							style={{
								height: "auto",
								width: "90%",
								overflow: "hidden", paddingBottom:"2%"
							}}
							cover={
								<Link to={`/producto/${element.name}`}>
									<img
										style={{
											height: "100%",
											width: "100%",
											overflow: "hidden",
										}}
										alt="example"
										src={
											index == hoveredCardIndex
												? element.path[0]
												: element.path[1]
										}
									/>
								</Link>
							}
							onMouseEnter={() => setHoveredCardIndex(index)} // Establecer el índice de la tarjeta al hacer hover
							onMouseLeave={() => setHoveredCardIndex(null)} // Reiniciar el índice al dejar de hacer hover
						>
							<Meta
                             avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
								title={element.name}
								
							/>
						</Card>
					))}
				</Col>
			</Row>
		</>
	);
};
export default YourLookSection;
