import { Badge, Button, Col, Drawer, Image, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import {
	DeleteOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { FORMATTER_PESO } from "../../../../../redux/constants";
import { formatterMoney } from "../../../../handle/FormatterMoney/FormatterMoney";
import { handleDeleteElement } from "../../../../handle/LocalStorage/handleLocalStorage";
import zIndex from "@material-ui/core/styles/zIndex";
import bolsa from "../../../../../includes/images/bolsaAnga.png";
import bolsaG from "../../../../../includes/images/bolsaAngaDorada.png";
import bolsaAnimada from "../../../../../includes/images/BolsaAnimada.png";
import bolsaAnimada2 from "../../../../../includes/images/bolsaAnimadapose2.png";
const ShoppingItem = ({ anchoPagina }) => {
	const [visibleDrawer, setVisibleDrawer] = useState(false);

	const [notificationCount, setNotificationCount] = useState({});
	const [elements, setElements] = useState(
		JSON.parse(localStorage.getItem("elements")) || []
	);
	useEffect(() => {
		setElements(JSON.parse(localStorage.getItem("elements")) || []);
	}, [notificationCount]);
	const showDrawer = () => {
		setVisibleDrawer(true);
	};

	const closeDrawer = () => {
		setVisibleDrawer(false);
	};

	const subtotal = elements.reduce((sum, element) => sum + element.value, 0);
	const send = 0;
	const total = subtotal + send;

	const handleDelete = (id, talla) => {
		setNotificationCount(handleDeleteElement(id, talla));
	};
	const [logoMenu, setLogoMenu] = useState(bolsa);
	const handleChange = () => {
		setLogoMenu(bolsaG);
	};
	const handleChangeLeave = () => {
		setLogoMenu(bolsa);
	};
	return (
		<>
			<Button
				style={{
					backgroundColor: "transparent",
					borderRadius: "50%",
					border: "2px solid transparent",
					display: "flex",
					justifyContent: "center",
					padding: 0,
				}}
				onClick={showDrawer}
			>
				<Badge count={elements.length}>
					<img
						style={{ color: "#484848", height: "4.2vh" }}
						src={logoMenu}
						alt="BolsaAnga"
						onMouseOver={handleChange}
						onMouseLeave={handleChangeLeave}
					/>
				</Badge>
			</Button>
			<Drawer
				title={
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							justifyItems: "center",
						}}
					>
						<b>Bolsa de Compra</b>
					</div>
				}
				style={{ zIndex: 5001 }}
				width={anchoPagina < 500 ? "85vw" : "35vw"}
				placement="right"
				closable={true}
				onClose={closeDrawer}
				visible={visibleDrawer}
				footer={
					elements.length > 0 ? (
						<>
							<br />
							<Row
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									color: "#484848",
								}}
							>
								<Col>SubToal</Col>
								<Col>{FORMATTER_PESO.format(subtotal)}</Col>
							</Row>
							<Row
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									color: "#484848",
								}}
							>
								<Col>Envío</Col>
								<Col>
									{send == 0
										? "Por calcular"
										: FORMATTER_PESO.format(
												FORMATTER_PESO.format(send)
										  )}
								</Col>
							</Row>
							<Row
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									color: "#484848",
								}}
							>
								<Col>
									<b>Total</b>
								</Col>
								<Col>
									<b>{FORMATTER_PESO.format(total)}</b>
								</Col>
							</Row>
							<br />
							<Row
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<a href="/checkout">
									<Button
										block
										style={{
											backgroundColor: "#484848",
											color: "white",
											height: "40px",
										}}
									>
										IR A PAGAR
									</Button>
								</a>
							</Row>
						</>
					) : null
				}
			>
				{elements.length > 0 ? (
					elements?.map((element) => (
						<>
							<Row
								style={{
									width: "100%",
									height: "100px",
									overflow: "hidden",
								}}
								justify={"space-between"}
							>
								<Col style={{ width: "20%" }}>
									<Image
										preview={false}
										height={"100%"}
										width={"100%"}
										src={element.imagen}
									/>
								</Col>
								<Col
									style={{
										width: "50%",
										flexDirection: "column",
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<div>
										<h6>
											<b>{element.name}</b>
										</h6>
										Talla: {element.talla}
									</div>

									<div
										style={{
											position: "relative",
											bottom: 0,
										}}
									>
										cantidad: {element.cantidad}
									</div>
								</Col>
								<Col
									style={{
										width: "20%",
										flexDirection: "column",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-end",
									}}
								>
									<div style={{ padding: "2%" }}>
										<DeleteOutlined
											style={{
												color: "rgb(114, 114, 115)",
												fontSize: "20px",
											}}
											onClick={() =>
												handleDelete(
													element.id,
													element.talla
												)
											}
										/>
									</div>
									<div>
										{FORMATTER_PESO.format(element?.value)}
									</div>
								</Col>
							</Row>
							<br />
						</>
					))
				) : (
					<Row
						justify={"center"}
						align={"middle"}
						style={{
							height: "100%",
							flexDirection: "column",
							fontSize: "20px",
						}}
					>
						<Col>
						<Image
											width={150}
											preview={false}
											src={bolsaAnimada2}
										/>
							
						</Col>
						<Col style={{ visibility: "hidden" }}>
							<ShoppingOutlined />
						</Col>
						<Col>No hay productos en tu bolsa</Col>
					</Row>
				)}
			</Drawer>
		</>
	);
};

export default ShoppingItem;
