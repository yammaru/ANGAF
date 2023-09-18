import { Button, Carousel, Col, Divider, Image, Radio, Row } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BestSelling from "../Ventas/BestSelling";
import { FORMATTER_PESO } from "../../../redux/constants";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useWindowWidth } from "../../handle/size/size";

const ProductsId = () => {
	const { id } = useParams();
	const anchoPagina = useWindowWidth(useState, useEffect);
	const [selectedSizeMessage, setSelectedSizeMessage] = useState(
		"Selecciona una talla"
	);

	const elements = {
		name: "lobo1",
		value: 5524,
		path: [
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			"https://static.wikia.nocookie.net/overlordmaruyama/images/3/3a/Lupusregina_Beta.png",
		],
		tienda: "Anga",
		id: 2,
		role_model: "La modelo mide 1.60m y tiene una talla S",
		available_sizes: ["M", "S", "XL"],
	};
	const handleSizeButtonClick = (size) => {
		setSelectedSizeMessage(`Agregar a la bolsa`);
	};

	const [selectedSize, setSelectedSize] = useState(null);

	const handleSizeButtonClicks = (size) => {
		setSelectedSize(size);
	};

	const go = (size) => {
		const storedElements =
			JSON.parse(localStorage.getItem("elements")) || [];
		const existingElementIndex = storedElements.findIndex(
			(item) => item.id === elements.id && item.talla === selectedSize
		);
		if (existingElementIndex !== -1) {
			storedElements[existingElementIndex].cantidad++;
		} else {
			elements.talla = selectedSize;
			elements.imagen = elements.path[0];
			elements.cantidad = 1;
			storedElements.push(elements);
		}
		localStorage.setItem("elements", JSON.stringify(storedElements));
		window.location.reload();
	};

	console.log(selectedSize);
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<Divider />
			{anchoPagina < 766 ? (
				<Row>
					<Col>
						<Carousel autoplay>
							{elements.path.map((imagePath, imgIndex) => (
								<Image
									width="100%"
									height={"100vh"}
									src={imagePath}
									alt={`Image ${imgIndex}`}
								/>
							))}
						</Carousel>
					</Col>
				</Row>
			) : null}
			<Row>
				{anchoPagina > 766 ? (
					<Col style={{ width: "65%", paddingLeft: "1%" }}>
						{!Array.isArray(elements?.path) &&
							elements.path.map((imagePath, imgIndex) => (
								<img
									key={imgIndex}
									style={{ width: "50%", height: "50%" }}
									src={imagePath}
									alt={`Image ${imgIndex}`}
								/>
							))}
					</Col>
				) : (
					<br />
				)}
				<Col
					style={{
						width: anchoPagina < 766 ? "95%" : "35%",
						paddingLeft: "5%",
						color: "#484848",
					}}
				>
					<Row
						style={{
							display: "flex",
							flexDirection: "column",
							paddingBottom: "5%",
						}}
					>
						<Col>{elements.tienda}</Col>
						<Col>
							<h5>
								<b style={{ color: "#484848" }}>
									{elements.name}
								</b>
							</h5>
						</Col>

						<Col>Item: {elements.id}</Col>
					</Row>
					<Row
						style={{
							display: "flex",
							flexDirection: "column",
							paddingBottom: "5%",
						}}
					>
						<Col>
							<h6>
								<b style={{ color: "#484848" }}>
									{FORMATTER_PESO.format(elements.value)}
								</b>
							</h6>
						</Col>

						<Col>{elements.role_model}</Col>
					</Row>
					<Row
						style={{
							display: "flex",
							flexDirection: "column",
							paddingBottom: "4%",
						}}
					>
						<Col>
							<h6>
								<b style={{ color: "#484848" }}>Talla</b>
							</h6>
						</Col>

						<Col>
							<Radio.Group
								defaultValue={selectedSize}
								value={selectedSize}
								onChange={(e) =>
									handleSizeButtonClicks(e.target.value)
								}
								buttonStyle="solid"
							>
								{elements.available_sizes.map((x) => (
									<>
										<Radio.Button
											key={x}
											onClick={() =>
												handleSizeButtonClick(x)
											}
											value={x}
											style={{
												backgroundColor:
													selectedSize === x
														? "#484848"
														: "",
											}}
										>
											{x}
										</Radio.Button>
									</>
								))}
							</Radio.Group>
						</Col>
					</Row>
					<Row
						style={{
							paddingBottom: "2%",
						}}
					>
						<Button
							style={{
								height: "50px",
								backgroundColor:
									selectedSizeMessage ===
									"Selecciona una talla"
										? ""
										: "#484848",
							}}
							type={
								selectedSizeMessage === "Selecciona una talla"
									? "ghost"
									: "primary"
							}
							block
							disabled={
								selectedSizeMessage === "Selecciona una talla"
							}
							onClick={go}
						>
							<h6>
								<b
									style={{
										color:
											selectedSizeMessage ===
											"Selecciona una talla"
												? "#b4b4b4"
												: "white",
									}}
								>
									{selectedSizeMessage}
								</b>
							</h6>
						</Button>
					</Row>
					<Row
						style={{
							paddingBottom: "2%",
						}}
					>
						<Button style={{ height: "50px" }} type="ghost" block>
							<h6>
								<b>Ver disponibilidad en tienda</b>
							</h6>
						</Button>
					</Row>
					<Row
						justify={"space-between"}
						style={{
							paddingBottom: "2%",
						}}
					>
						<Col>
							<CheckOutlined style={{ color: "#52c41a" }} />{" "}
							<b style={{ color: "#484848" }}>Pago en efectivo</b>
						</Col>
						<Col>
							<CheckOutlined style={{ color: "#52c41a" }} />{" "}
							<b style={{ color: "#484848" }}>Cambios gratis</b>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<BestSelling anchoPagina={anchoPagina} />
			</Row>
		</>
	);
};
export default ProductsId;
