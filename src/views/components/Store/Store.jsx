import React, { Fragment, useState } from "react";
import ProductsId from "../../components/ProductsId/Products";
import { Col, Collapse, Divider, Image, Row, Select, Typography } from "antd";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
	CaretRightOutlined,
	CheckCircleTwoTone,
	CloseCircleTwoTone,
} from "@ant-design/icons";
const { Option } = Select;
const { Panel } = Collapse;
const { Text, Link, Title } = Typography;
const Store = () => {
	const [activePanel, setActivePanel] = useState(null);

	const togglePanel = (panelKey) => {
		setActivePanel(panelKey === activePanel ? null : panelKey);
	};
	const logoMenu =
		"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";
	const mapStyles = {
		height: "100vh",
		width: "100%",
	};

	const municipios = [
		{
			id: 1,
			name: "Armenia",
			lat: 4.5339,
			lng: -75.6811,
			tiendas: [
				{
					nameTienda: "Tienda 1",
					schedule: [
						{
							day: "l",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "m",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "x",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "j",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "v",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "s",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "d",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
					],
					adress: "Calle 23 Norte # 15 - 21 Ed. Oasis",
				},
				{
					nameTienda: "Tienda 2",
					schedule: [
						{
							day: "l",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "x",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "v",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "d",
							openingHours: "8 : 11",
							closingHours: "20 : 16",
						},
					],
					adress: "Calle 23 Norte # 15 - 21 Ed. Oasis",
				},
			],
		},
		{
			id: 2,
			name: "Barranquilla",
			lat: 10.9639,
			lng: -74.7967,
			tiendas: [
				{
					nameTienda: "Tienda 1",
					schedule: [
						{
							day: "l",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "m",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "x",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "j",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "v",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "s",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "d",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
					],
					adress: "Calle 23 Norte # 15 - 21 Ed. Oasis",
				},
				{
					nameTienda: "Tienda 5",
					schedule: [
						{
							day: "l",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "x",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "v",
							openingHours: "8 : 16",
							closingHours: "20 : 16",
						},
						{
							day: "d",
							openingHours: "8 : 11",
							closingHours: "20 : 16",
						},
					],
					adress: "taCalle 23 Norte # 15 - 21 Ed. Oasistata",
				},
			],
		},
		{ id: 3, name: "Bogotá", lat: 4.60971, lng: -74.08175, tiendas: [] },
		{ id: 4, name: "Bucaramanga", lat: 7.1216, lng: -73.1227 },
		{ id: 5, name: "Cali", lat: 3.4516, lng: -76.532 },
		{ id: 6, name: "Cartagena", lat: 10.391, lng: -75.4794 },
		{ id: 7, name: "Cúcuta", lat: 7.8939, lng: -72.5078 },
		{ id: 8, name: "Florencia", lat: 1.6144, lng: -75.6062 },
		{ id: 9, name: "Ibagué", lat: 4.4389, lng: -75.2322 },
		{ id: 10, name: "Leticia", lat: -4.2159, lng: -69.9406 },
		{ id: 11, name: "Manizales", lat: 5.0687, lng: -75.5188 },
		{ id: 12, name: "Medellín", lat: 6.2442, lng: -75.5812 },
		{ id: 13, name: "Mocoa", lat: 1.1495, lng: -76.6439 },
		{ id: 14, name: "Montería", lat: 8.7575, lng: -75.8874 },
		{ id: 15, name: "Neiva", lat: 2.9273, lng: -75.2819 },
		{ id: 16, name: "Pasto", lat: 1.2136, lng: -77.2811 },
		{ id: 17, name: "Pereira", lat: 4.8133, lng: -75.6961 },
		{ id: 18, name: "Popayán", lat: 2.4442, lng: -76.6142 },
		{ id: 19, name: "Puerto Carreño", lat: 6.1851, lng: -67.4932 },
		{ id: 20, name: "Quibdó", lat: 5.6949, lng: -76.6582 },
		{ id: 21, name: "Riohacha", lat: 11.5449, lng: -72.9069 },
		{ id: 22, name: "San Andrés", lat: 12.5567, lng: -81.7188 },
		{ id: 23, name: "San José del Guaviare", lat: 2.5734, lng: -72.6414 },
		{ id: 24, name: "Santa Marta", lat: 11.2404, lng: -74.211 },
		{ id: 25, name: "Sincelejo", lat: 9.3025, lng: -75.396 },
		{ id: 26, name: "Tunja", lat: 5.5351, lng: -73.3671 },
		{ id: 27, name: "Valledupar", lat: 10.4633, lng: -73.2532 },
		{ id: 28, name: "Villavicencio", lat: 4.1496, lng: -73.6376 },
		{ id: 29, name: "Yopal", lat: 5.3425, lng: -72.3959 },
		{ id: 33, name: "Y", lat: 4.70457, lng: -72.552611 },
	];
	const [location, setlocation] = useState(
		municipios.filter((x) => x.id == 3)[0]
	);

	const handleSelectChange = (value) => {
		setlocation(municipios.filter((x) => x.id == value)[0]);
	};
	function formatHour(hour) {
		const date = new Date();
		const [hourStr, minuteStr] = hour.split(":");

		date.setHours(parseInt(hourStr, 10), parseInt(minuteStr, 10));

		const formattedHour = date.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});

		return formattedHour;
	}
	function getCurrentDay() {
		const days = ["d", "l", "m", "x", "j", "v", "s"];
		const currentDate = new Date();
		const currentDayIndex = currentDate.getDay();
		return days[currentDayIndex];
	}

	const currentDay = getCurrentDay();

	function getDayName(day) {
		const days = {
			d: "Domingo",
			l: "Lunes",
			m: "Martes",
			x: "Miércoles",
			j: "Jueves",
			v: "Viernes",
			s: "Sábado",
		};
		return days[day];
	}

	const openClose = (schedule) => {
		const currentHour = new Date().getHours();
		const currentMinute = new Date().getMinutes();
		const currentDaySchedule = schedule?.find(
			(item) => item.day === currentDay
		);

		if (currentDaySchedule) {
			const [openingHour, openingMinute] =
				currentDaySchedule.openingHours.split(" : ");
			const [closingHour, closingMinute] =
				currentDaySchedule.closingHours.split(" : ");

			if (
				currentHour > parseInt(openingHour) ||
				(currentHour === parseInt(openingHour) &&
					currentMinute >= parseInt(openingMinute))
			) {
				if (
					currentHour < parseInt(closingHour) ||
					(currentHour === parseInt(closingHour) &&
						currentMinute <= parseInt(closingMinute))
				) {
					return (
						<div style={{display:"flex", alignItems:"center", gap:"5px"}}>
							
							<CheckCircleTwoTone twoToneColor={"lime"} /> 
							<h5><b>Abierto</b></h5>  | <h6>cerramos a las {currentDaySchedule.closingHours}</h6>
						</div>
					);
				} else {
					return (
                        <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
							<CloseCircleTwoTone twoToneColor={"red"} />
                            <h5><b>cerrado</b></h5> | <h6>Hoy, ya cerramos</h6> 
						</div>
					);
				}
			} else {
				return (
                    <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
						<CloseCircleTwoTone twoToneColor={"red"} />
						<h5><b>cerrado</b></h5>| <h6>Abrimos a las {currentDaySchedule.openingHours}</h6>
						
					</div>
				);
			}
		} else {
			return (
                <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
					<CloseCircleTwoTone twoToneColor={"red"} />
					<h5><b>cerrado</b></h5> | <h6>Hoy la tienda está cerrada.</h6>
				</div>
			);
		}
	};
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<div
				style={{
					width: "100%",
					background: `url(${logoMenu})`,
					height: "25%",
					backgroundSize: "cover", // La imagen se ajusta para cubrir el contenedor
					backgroundPosition: "center", // Centramos la imagen

					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1
					style={{
						mixBlendMode: "difference",
						color: "white",
					}}
				>
					<b>Tiendas</b>
				</h1>
			</div>
			<Row>
				<Col
					style={{
						width: "35%",
						display: "flex",
						justifyContent: "center",
						paddingTop: "2%",
					}}
				>
					<Row style={{ flexDirection: "column", width: "80%" }}>
						<Col>
							<Select
								placeholder="Ciudad"
								onChange={handleSelectChange}
								style={{ height: "30px", width: "100%" }}
							>
								{municipios.map((municipio) => (
									<Option
										key={municipio.id}
										value={municipio.id}
									>
										{municipio.name}
									</Option>
								))}
							</Select>
						</Col>
						<Divider />
						{!location?.tiendas ||
						location?.tiendas.length === 0 ? (
							<>no tien tinda</>
						) : (
							location?.tiendas.map((x, index) => (
								<Collapse
									style={{ borderColor: "transparent" }}
									accordion
									expandIcon={({ isActive }) => (
										<CaretRightOutlined
											rotate={isActive ? 90 : 0}
										/>
									)}
									activeKey={activePanel}
									onChange={togglePanel}
								>
									<Panel
										header={
											<h5>
												<b>{x?.nameTienda}</b>
											</h5>
										}
										key={index}
									>
										<h5 style={{ color: "#787878" }}>
											{" "}
											{x?.adress}
										</h5>
										{openClose(x?.schedule)}

										{x?.schedule?.map((element) => (
											<Row
												style={{
													width: "100%",
													color:
														element?.day !==
														currentDay
															? "#bcbcbc"
															: "#484848",
												}}
											>
												<Col style={{ width: "50%" }}>
													{" "}
													<b>
														{getDayName(
															element?.day
														)}
														:
													</b>
												</Col>
												<Col style={{ width: "50%" }}>
													<b>{`${formatHour(
														element?.openingHours
													)}`}</b>
												</Col>
											</Row>
										))}
									</Panel>
								</Collapse>
							))
						)}
					</Row>
				</Col>
				<Col style={{ width: "65%" }}>
					<LoadScript googleMapsApiKey="">
						<GoogleMap
							mapContainerStyle={mapStyles}
							zoom={12}
							center={location}
						/>
					</LoadScript>
				</Col>
			</Row>
		</>
	);
};

export default Store;
