import React, { Fragment, useEffect, useState } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import {
	Button,
	Col,
	Descriptions,
	Divider,
	Image,
	Input,
	InputNumber,
	Row,
	Table,
} from "antd";
import {
	LockOutlined,
	MinusCircleOutlined,
	MinusOutlined,
	PlusCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { FORMATTER_INPUT_NUMBER } from "../../../redux/constants";
import {
	handleDecreaseElement,
	handleDeleteElement,
	handleIncreaseElement,
} from "../../handle/LocalStorage/handleLocalStorage";
import TextArea from "antd/lib/input/TextArea";

const CheckoutSection = () => {
	const [notificationCount, setNotificationCount] = useState({});
	const [dataSource, setDataSource] = useState(
		JSON.parse(localStorage.getItem("elements")) || []
	);
	const [sedValue, setSedValue] = useState(
		JSON.parse(localStorage.getItem("sedValue"))
	);
	useEffect(() => {
		setDataSource(JSON.parse(localStorage.getItem("elements")) || []);
	}, [notificationCount]);

	const handleDelete = (id, talla) => {
		setNotificationCount(handleDeleteElement(id, talla));
	};
	const handleIncrease = (record) => {
		setDataSource(handleIncreaseElement(record, dataSource));
	};

	const handleDecrease = (record) => {
		setDataSource(handleDecreaseElement(record, dataSource));
	};
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
							<Image
								style={{ height: "150px", width: "auto" }}
								src={record.imagen}
								preview={false}
							/>
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
			title: "Precio",
			dataIndex: "value",
			key: "value",
			width: "10%",
			align: "center",
			render: (_, record) => {
				return FORMATTER_INPUT_NUMBER.formatter(_);
			},
		},
		{
			title: "Cantidad",
			dataIndex: "cantidad",
			key: "cantidad",
			width: "20%",
			align: "center",
			render: (_, record) => (
				<>
					<Row justify={"center"}>
						<Col style={{ width: "20%" }}>
							<Button
								icon={<MinusOutlined />}
								onClick={() => handleDecrease(record)}
							/>
						</Col>
						<Col style={{ width: "40%" }}>
							<Input
								style={{
									textAlign: "center",
								}}
								value={record.cantidad}
							/>
						</Col>
						<Col style={{ width: "20%" }}>
							<Button
								icon={<PlusOutlined />}
								onClick={() => handleIncrease(record)}
							/>
						</Col>
					</Row>
					<Row justify={"center"} style={{ padding: "2%" }}>
						<Button
							onClick={() =>
								handleDelete(record.id, record.talla)
							}
							type="dashed"
						>
							eliminar
						</Button>
					</Row>
				</>
			),
		},
		{
			title: "Total",
			dataIndex: "address",
			key: "address",
			width: "10%",
			align: "center",
			render: (_, record) => {
				return FORMATTER_INPUT_NUMBER.formatter(
					record.value * record.cantidad
				);
			},
		},
	];
	const SaleResumen = [
		{ title: "Resumen de la compra", style: "title" },
		{
			title: "Ítems sin descuento",
			value: 0,
		},
		{
			title: "Ropa SALE",
			value: 0,
			style: "preDivider",
		},
		{
			style: "divider",
		},
		{
			title: "Subtotal",
			value: 0,
			style: "SubTitle",
		},
		{
			title: "Envio(estimado)",
			value: sedValue,
			style: sedValue ? "" : "nono",
		},
		{
			title: "Total",
			value: 0,
			style: "total",
		},
	];
	const handleDiscountCodeChange = (value) => {
		// Aquí puedes manejar el cambio en el código de descuento
		console.log("Código de descuento cambiado:", value);
	};

	return (
		<Row style={{ backgroundColor: "#f2f2f2" }}>
			<Col style={{ width: "10%" }} />

			<Col style={{ width: "80%" }}>
				<Row>
					<Divider style={{ width: "100%", visibility: "hidden" }} />
					Medios de pago y sitio seguro
					<Divider style={{ width: "100%", visibility: "hidden" }} />
				</Row>
				<Row>
					{" "}
					<Table
						style={{ width: "100%" }}
						dataSource={dataSource}
						columns={columns}
						pagination={false}
					/>
				</Row>
				<Divider />
				<Row justify={"space-between"}>
					<Col style={{ width: "40%" }}>
						<Descriptions
							title={
								<div style={{ color: "#484848" }}>
									Tienes un código de descuento?
								</div>
							}
						/>

						<Row justify={"space-between"}>
							<Col style={{ width: "60%" }}>
								<Input
									style={{ height: 40 }}
									placeholder="codigo"
								/>
							</Col>
							<Col style={{ width: "35%" }}>
								<Button
									style={{
										backgroundColor: "#484848",
										height: "40px",
									}}
									type="primary"
									block
								>
									Aplicar
								</Button>
							</Col>
						</Row>
					</Col>
					<Col style={{ width: "35%" }}>
						{SaleResumen.map((x) =>
							x.style == "divider" ? (
								<Divider />
							) : (
								<Row
									justify={"space-between"}
									style={{
										paddingBottom:
											x.style == "total"
												? "10%"
												: x.style == "preDivider"
												? "0%"
												: "3%",
										display:
											x.style == "nono" ? "none" : "",
									}}
								>
									<Col
										style={{
											width: "60%",
											fontWeight:
												x.style == "title" ||
												x.style == "SubTitle"
													? "bold"
													: "",
										}}
									>
										{x.style == "total" ? (
											<h5>
												<b style={{ color: "#484848" }}>{x.title}</b>
											</h5>
										) : x.style == "SubTitle" ||
										  x.style == "title" ? (
											<h6>
												<b style={{ color: "#484848" }}>
													{x.title}
												</b>
											</h6>
										) : (
											x.title
										)}
									</Col>
									{x.style != "title" ? (
										<Col>
											<b style={{ color: "#787878" }}>
												{x.style == "total" ? (
													<h5>
														<b style={{ color: "#484848" }}>
															{FORMATTER_INPUT_NUMBER.formatter(
																x.value
															)}
														</b>
													</h5>
												) : (
													FORMATTER_INPUT_NUMBER.formatter(
														x.value
													)
												)}
											</b>
										</Col>
									) : null}
								</Row>
							)
						)}

						<a href="/checkout/shipping">
							<Button
								style={{
									backgroundColor: "#484848",
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: "50px",
								}}
								icon={<LockOutlined />}
								block
							>
								PAGO SEGURO
							</Button>
						</a>
					</Col>
				</Row>
			</Col>
			<Col style={{ width: "10%" }} />
		</Row>
	);
};

export default CheckoutSection;
