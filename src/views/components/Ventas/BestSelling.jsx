import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FORMATTER_PESO } from "../../../redux/constants";
import Title from "antd/lib/typography/Title";
const { Meta } = Card;
const BestSelling = ({ anchoPagina }) => {
	console.log(anchoPagina, anchoPagina > 1025);
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
			<Row style={{ width: "100vw" }}>
				<Title style={{ paddingLeft: "4%", width: "100%" }}>
					Otrxs han comprado
				</Title>
			</Row>
			<Row justify={"center"} style={{ width: "100%" }}>
				<Col
					style={{
						width: anchoPagina>766?"10%":"5%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handlePrevPage}
						icon={<CaretLeftOutlined />}
					/>
				</Col>
				<Col
					style={{
						width: anchoPagina>766?"80%":"90%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					{noVisibleElements.map((element, index) => (
						<Link to={`/producto/${element.name}`}>
							<Card
								hoverable
								style={{
									height: 400,
									width: anchoPagina>563?250: (anchoPagina-(anchoPagina*0.1))/2,
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
						</Link>
					))}
				</Col>
				<Col
					style={{
						width:anchoPagina>766?"10%":"5%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handleNextPage}
						icon={<CaretRightOutlined />}
					/>
				</Col>
			</Row>
		</>
	);
};
export default BestSelling;
