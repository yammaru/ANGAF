import { Badge, Button, Col, Drawer, Image, Row } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import {
	DeleteOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { FORMATTER_PESO } from "../../../../../redux/constants";
import { formatterMoney } from "../../../../handle/FormatterMoney/FormatterMoney";

const ShoppingItem = () => {
	const [visibleDrawer, setVisibleDrawer] = useState(false);

	const [notificationCount, setNotificationCount] = useState({});
	useEffect(() => {
	console.log(notificationCount);
	}, [notificationCount]);
	const showDrawer = () => {
		setVisibleDrawer(true);
	};

	const closeDrawer = () => {
		setVisibleDrawer(false);
	};

	const elements = JSON.parse(localStorage.getItem("elements")) || [];
	const subtotal = elements.reduce((sum, element) => sum + element.value, 0);
	const send = 0;
	const total = subtotal + send;

	const handleDelete = (id, talla) => {
	
		const storedElements =
			JSON.parse(localStorage.getItem("elements")) || [];
		const elementIndex = storedElements.findIndex(
			(item) => item.id === id && item.talla === talla
		);
		if (elementIndex !== -1) {
			storedElements.splice(elementIndex, 1);
			localStorage.setItem("elements", JSON.stringify(storedElements));
			console.log(`Elemento con id ${id} y talla ${talla} eliminado.`);
		} else {
			console.log(
				`No se encontró ningún elemento con id ${id} y talla ${talla}.`
			);
		}
		setNotificationCount({id,talla});
	};
	return (
		<>
			<Button
				style={{
					backgroundColor: "transparent",
					borderRadius: "50%",
					border: "2px solid transparent",
				}}
				icon={
					<Badge count={elements.length}>
						<ShoppingOutlined
							className="gold-hover-icon"
							style={{ color: "#484848", fontSize: "25px" }}
						/>
					</Badge>
				}
				onClick={showDrawer}
			/>
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
							<ShoppingOutlined
								style={{ color: "#787878", fontSize: "55px" }}
							/>
						</Col>{" "}
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
