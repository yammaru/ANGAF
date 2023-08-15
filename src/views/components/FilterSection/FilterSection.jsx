import {
	Button,
	Card,
	Carousel,
	Checkbox,
	Col,
	Collapse,
	Divider,
	List,
	Row,
	Select,
	TreeSelect,
	Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { FORMATTER_PESO } from "../../../redux/constants";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import HeaderFilterProduct from "./FilterItems/HeaderFilterProduct";
import { Link } from "react-router-dom/cjs/react-router-dom";
import BestSelling from "../Ventas/BestSelling";

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
const { Panel } = Collapse;
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
	const url = window.location.pathname;

	// Dividir la URL en partes utilizando "/" como separador
	const parts = url.split("/");

	// Obtener la última palabra (último elemento del array)
	const lastWord = parts[parts.length - 1];

	const colorArray = ["#FF5733", "#3366CC", "#33CC33", "#FF9900"]; // Array de colores
	const [selectedColors, setSelectedColors] = useState([]);

	const handleColorClick = (color) => {
		if (selectedColors.includes(color)) {
			setSelectedColors(selectedColors.filter((c) => c !== color));
		} else {
			setSelectedColors([...selectedColors, color]);
		}
	};
	const treeData = colorArray.map((color) => ({
		title: color,
		key: color,
	}));

	return (
		<><Divider style={{paddingBottom:"2%"}}/>
			{lastWord != "cosas" ? (
				lastWord != "sale" ? (
					<HeaderFilterProduct
						elements={elements}
						lastWord={lastWord}
					/>
				) : null
			) : null}
			<Row
				justify={"end"}
				align={"middle"}
				style={{ gap: "1%", paddingBottom: "1%" }}
			>
				Ordenar por:{" "}
				<Select value={1} style={{ width: "10%" }}>
					<Select.Option value={1}>Nuevo</Select.Option>
					<Select.Option value={2}>Mayor Precio</Select.Option>
					<Select.Option value={3}>Menor Precio</Select.Option>
				</Select>
			</Row>
			<Row style={{ width: "100%" }}>
				<Col style={{ width: "20%" }}>
					{selectedColors.length != 0 ? (
						<>
							<Row justify={"center"}>
								<b>Filtrado Por:</b>
							</Row>
							<TreeSelect
								showSearch
								style={{ width: "100%" }}
								value={selectedColors}
								treeData={treeData}
								treeCheckable={true}
								onChange={setSelectedColors}
							/>
						</>
					) : null}
					<Collapse accordion>
						<Panel header={<b>Categoria</b>} key="1">
							lupues
						</Panel>
						<Panel header={<b>Color</b>} key="2">
							<div style={{ display: "flex" }}>
								{colorArray.map((color) => (
									<div
										key={color}
										style={{
											backgroundColor: color,
											width: "20px",
											height: "20px",
											margin: "5px",
											position: "relative",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											alignContent: "center",
										}}
										onClick={() => handleColorClick(color)}
									>
										{selectedColors.includes(color) && (
											<Checkbox
												style={{
													backgroundColor:
														"transparent",
												}}
												checked={true}
											/>
										)}
									</div>
								))}
							</div>
						</Panel>
						<Panel header={<b>Talla</b>} key="3">
							Contenido del Panel 2
						</Panel>
						{/* Agrega más paneles según sea necesario */}
					</Collapse>
				</Col>
				<Col style={{ width: "80%" }}>
					<Row justify={"space-around"} style={{ width: "100%" }}>
						{elements.map((element, index) => (
							  <Link to={`/producto/${element.name}`}>
									<Card
								hoverable
								style={{
									height: 500,
									width: 300,
									overflow: "hidden",
									padding:"5px"
								}}
								cover={
									<img
										style={{
											height: 420,
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
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default FilterSection;
