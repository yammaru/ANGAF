import React, { useEffect, useState } from "react";

import {
	Affix,
	Badge,
	Button,
	Col,
	Divider,
	Image,
	Row,
	Table,
	Typography,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { FORMATTER_INPUT_NUMBER } from "../../../redux/constants";
const { Text, Link } = Typography;
const ShippingSection = () => {
	const [notificationCount, setNotificationCount] = useState({});
	
	const [dataSource, setDataSource] = useState(
		JSON.parse(localStorage.getItem("elements")) || []
	);
	const [subTotal, setSubtotal] = useState(dataSource.length>0?dataSource.reduce((acc, item) => {
		const itemSum = item.cantidad * item.value;
		return acc + itemSum;
	  }, 0):0);

	const [top, setTop] = useState(10);
	const [sedValue, setSedValue] = useState(
		JSON.parse(localStorage.getItem("sedValue"))
	);
	const [total, setTotal] = useState(
		sedValue ? sedValue + subTotal : subTotal
	);
	useEffect(() => {
		setDataSource(JSON.parse(localStorage.getItem("elements")) || []);
	}, [notificationCount]);
	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY;

			const distanceToBottom =
				documentHeight - (scrollTop + windowHeight);

			if (distanceToBottom <= 10) {
				setTop(-140);
			} else {
				setTop(10);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [window.scrollY]);
	const columns = [
		{
			title: "Producto",
			dataIndex: "name",
			key: "name",
			width: "60%",
			render: (_, record) => (
				<a href={`/producto/${record.name}`}>
					<Row style={{ gap: "5%" }}>
						<Col>
							<Badge count={record.cantidad}>
								<Image
									style={{ height: "100px", width: "auto" }}
									src={record.imagen}
									preview={false}
								/>
							</Badge>
						</Col>
						<Col style={{ display: "flex", alignItems: "center" }}>
							<h5>
								{record.name} Talla {record.talla}
							</h5>
						</Col>
					</Row>
				</a>
			),
		},
		{
			title: "Total",
			dataIndex: "address",
			key: "address",
			width: "25%",
			align: "Right",
			render: (_, record) => {
				return FORMATTER_INPUT_NUMBER.formatter(
					record.value * record.cantidad
				);
			},
		},
	];

	return (
		<Row>
			<Col style={{ width: "60%", height: "2000px" }}></Col>
			<Col
				style={{
					width: "40%",
					backgroundColor: "#f2f2f2",
					padding: "2%",
				}}
			>
				<Affix offsetTop={top}>
					<Row justify={"space-between"} style={{}}>
						<Col>
							<h4 style={{ color: "#484848" }}>
								Resumen de la compra
							</h4>
						</Col>
						<Col>
							<a href="/checkout">
								<Text
									style={{
										color: "#787878",
									}}
									underline
								>
									ir a bolsa
								</Text>
							</a>
						</Col>
					</Row>
					<Divider />
					<Row
						style={{
							height: "50vh",
							overflow: "hidden",
						}}
					>
						<Table
							style={{ width: "100%" }}
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							showHeader={false}
							scroll={{ y: "50vh", x: "100%" }}
						/>
					</Row>
					<Divider />
					<Row justify={"space-between"}>
						<Col
							style={{
								width: "60%",
								fontWeight: "bold",
							}}
						>
							Subtotal
						</Col>
						<Col>{FORMATTER_INPUT_NUMBER.formatter(subTotal)}</Col>
					</Row>
					{sedValue ? (
						<Row justify={"space-between"}>
							<Col
								style={{
									width: "60%",
									fontWeight: "bold",
								}}
							>
								Gastos del envío
							</Col>
							<Col>{FORMATTER_INPUT_NUMBER.formatter(sedValue)}</Col>
						</Row>
					) : null}
					<Divider />
					<Row
						justify={"space-between"}
						style={{
							paddingBottom: "3%",
							display: "",
						}}
					>
						<Col
							style={{
								width: "60%",
								fontWeight: "bold",
							}}
						>
							Total
						</Col>
						<Col>{FORMATTER_INPUT_NUMBER.formatter(total)}</Col>
					</Row>

					<Button
						style={{
							backgroundColor: "#484848",
							color: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "8%",
							borderColor: "#484848",
							marginTop: "auto",
						}}
						icon={<LockOutlined />}
						type="primary"
						onClick={() => setTop(top + 10)}
						block
					>
						COMPRAR AHORA
					</Button>
				</Affix>
			</Col>
		</Row>
	);
};

export default ShippingSection;
