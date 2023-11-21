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
import { useWindowWidth } from "../../handle/size/size";
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
	const elements = Array.from({
		length: 13,
	}).map((_, i) => ({
		name: `lobo ${i}`,
		value: i % 0 ? 5000 : 54129,
		value: 85,
		categoria: i % 0 ? "pantalones" : "camisetas",
		path: [
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
		],
		color: i % 0 ? "rojo" : "verde",
		talla: i % 0 ? "S" : "M",
	}));
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
			{lastWord != "cosas" ? (
				lastWord != "sale" ? (
					<HeaderFilterProduct
						elements={elements}
						lastWord={lastWord}
					/>
				) : null
			) : null}
			<Row
				justify={anchoPagina > 766 ? "end" : "space-around"}
				align={"middle"}
				style={{ gap: "1%", paddingBottom: "1%" }}
			>	{anchoPagina <= 766 ? (
					<ColumnFilter
						categoryArray={categoryArray}
						tallaArray={tallaArray}
						colorArray={colorArray}
						anchoPagina={anchoPagina}
					/>
				) : null}
				<Col style={{ width: anchoPagina > 766 ? "80%" : "" }}>
					Ordenar por: <br />
					<Select defaultValue={1}>
						<Select.Option value={1}>Nuevo</Select.Option>
						<Select.Option value={2}>Mayor Precio</Select.Option>
						<Select.Option value={3}>Menor Precio</Select.Option>
					</Select>
				</Col>
			
			</Row>
			<Row style={{ width: "100%" }}>
				{anchoPagina > 766 ? (
					<ColumnFilter
						categoryArray={categoryArray}
						tallaArray={tallaArray}
						colorArray={colorArray}
						anchoPagina={anchoPagina}
					/>
				) : null}
				<Col style={{ width: anchoPagina > 766 ? "80%" : "100%" }}>
					<Row justify={"space-around"} style={{ width: "100%" }}>
						{elements.map((element, index) => (
							<Link to={`/producto/${element.name}`}>
								<Card
									hoverable
									style={{
										height: anchoPagina > 766 ? 500 : 300,
										width: anchoPagina > 766 ? 300 : 180,
										overflow: "hidden",
										padding: "5px",
									}}
									cover={
										<img
											style={{
												height:
													anchoPagina > 766
														? 420
														: 220,
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
