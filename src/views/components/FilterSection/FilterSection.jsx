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
import ColumnFilter from "./FilterItems/ColumFilter";
import { useWindowWidth  } from "../../handle/size/size";
import { useEffect } from "react";

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
	const colorArray = [
		{ name: "rojo", color: "#FF5733" },
		{ name: "azul", color: "#3366CC" },
		{ name: "verde", color: "#33CC33" },
		{ name: "naranja", color: "#FF9900" },
	]; // Array de colores
	const tallaArray = [
		{ name: "S", color: "#FF5733" },
		{ name: "M", color: "#3366CC" },
		{ name: "L", color: "#33CC33" },
		{ name: "XL", color: "#FF9900" },
	];
	const categoryArray = [
		{ name: "c1", color: "#FF5733" },
		{ name: "c2", color: "#3366CC" },
		{ name: "c3", color: "#33CC33" },
		{ name: "c4", color: "#FF9900" },
		{ name: "c1", color: "#FF5733" },
		{ name: "c2", color: "#3366CC" },
		{ name: "c3", color: "#33CC33" },
		{ name: "c4", color: "#FF9900" },
		{ name: "c1", color: "#FF5733" },
		{ name: "c2", color: "#3366CC" },
		{ name: "c3", color: "#33CC33" },
		{ name: "c4", color: "#FF9900" },
		{ name: "c1", color: "#FF5733" },
		{ name: "c2", color: "#3366CC" },
		{ name: "c3", color: "#33CC33" },
		{ name: "c4", color: "#FF9900" },
	];
	const url = window.location.pathname;

	// Dividir la URL en partes utilizando "/" como separador
	const parts = url.split("/");

	// Obtener la última palabra (último elemento del array)
	const lastWord = parts[parts.length - 1];

	const [selectedColors, setSelectedColors] = useState([]);
	const anchoPagina = useWindowWidth(useState, useEffect);
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
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
				<ColumnFilter
					categoryArray={categoryArray}
					tallaArray={tallaArray}
					colorArray={colorArray}
					anchoPagina={anchoPagina}
				/>

				<Col style={{ width: anchoPagina>766?"80%":"100%" }}>
					<Row justify={"space-around"} style={{ width: "100%" }}>
						{elements.map((element, index) => (
							<Link to={`/producto/${element.name}`}>
								<Card
									hoverable
									style={{
										height: 500,
										width: 300,
										overflow: "hidden",
										padding: "5px",
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
									onMouseEnter={() =>
										setHoveredCardIndex(index)
									} // Establecer el índice de la tarjeta al hacer hover
									onMouseLeave={() =>
										setHoveredCardIndex(null)
									} // Reiniciar el índice al dejar de hacer hover
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
