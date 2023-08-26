import React, { Fragment, useEffect, useState } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import {
	Button,
	Col,
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

const CheckoutSection = () => {
	const [notificationCount, setNotificationCount] = useState({});
	const [dataSource, setDataSource] = useState(
		JSON.parse(localStorage.getItem("elements")) || []
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
						<Row>
							<Col style={{ width: "60%" }}>
								<Input
									style={{ height: 40 }}
									placeholder="codigo"
								/>
							</Col>
							<Col style={{ width: "40%" }}>
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
						<Row>Resumen de la compra</Row>
						<Row>
							<Col style={{ width: "60%" }}>
								Ítems sin descuento
							</Col>
							<Col style={{ width: "40%" }}></Col>
						</Row>
						<Row>
							<Col style={{ width: "60%" }}>Ropa SALE</Col>
							<Col style={{ width: "40%" }}></Col>
						</Row>
						<Divider />
						<Row>
							<Col style={{ width: "60%" }}>Subtotal</Col>
							<Col style={{ width: "40%" }}></Col>
						</Row>
						<Row>
							<Col style={{ width: "60%" }}>Envio(estimado)</Col>
							<Col style={{ width: "40%" }}></Col>
						</Row>
						<Divider style={{ visibility: "hidden" }} />
						<Row>
							<Col style={{ width: "60%" }}>Total</Col>
							<Col style={{ width: "40%" }}></Col>
						</Row>
						<Divider style={{ visibility: "hidden" }} />
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
