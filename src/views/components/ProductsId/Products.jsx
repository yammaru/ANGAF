import { Button, Carousel, Col, Divider, Image, Radio, Row } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BestSelling from "../Ventas/BestSelling";
import { FORMATTER_PESO } from "../../../redux/constants";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useWindowWidth } from "../../handle/size/size";
import { Collapse } from "antd";

const { Panel } = Collapse;
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
					<Collapse accordion>
						<Panel header="Detalle del producto" key="1">
							<Row>

							   <Col style={{width:"50%"}}>

							   </Col>
							</Row>
							
						</Panel>
						<Panel header="Composición y cuidados" key="2">
						<div class="b2cmattelsa-store-theme-0-x-specification_layout"><ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/lavadora-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>Usa lavadora en ciclo delicado y agua fria</p>
      </li> 
    </ul>
<ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/secadora-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>No uses secadora</p>
      </li> 
    </ul>
<ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/blamqueador-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>No uses blanqueador </p>
      </li> 
    </ul>
<ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/si-pancha-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>Plancha a temperatura baja No planches el estampado </p>
      </li> 
    </ul>

    <ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/retorcer-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>No la retuerzas</p>
      </li> 
    </ul>
    <ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/seco-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>No laves en seco</p>
      </li> 
    </ul>
    <ul classname="b2cmattelsa-store-theme-0-x-specification_item_pdp">
      <li>
        <img src="/arquivos/sombra-icon.png" alt="icon-wash"/>
      </li>
      <li> 
        <p>Seca a la sombra</p>
      </li> 
    </ul></div>
						</Panel>
						<Panel header="Envíos y devoluciones" key="3">
							<p>
								Tu envío es
								<span>gratis</span>
								si tu lugar de envío es
								<span>
									Medellín y área metropolitana, Bogotá, Cali,
									Barranquilla o Bucaramanga
								</span>{" "}
								(no aplica para productos de cosas y ropa de
								SALE).
								<br /> <br /> Si es ropa del SALE, el costo
								depende de tu ubicación y es a partir de
								<span>$7.200.</span>
								<br /> <br />
								<a href="/calcula-tu-envio/p" target="_blank">
									Más información
								</a>
							</p>
						</Panel>
						<Panel header="Cambios y garantías" key="4">
							<p >
								Tu envío es{" "}
								<span >
									gratis
								</span>{" "}
								si tu lugar de envío es{" "}
								<span >
									Medellín y área metropolitana, Bogotá, Cali,
									Barranquilla o Bucaramanga
								</span>{" "}
								(no aplica para productos de cosas y ropa de
								SALE). <br /> <br /> Si es ropa del SALE, el
								costo depende de tu ubicación y es a partir de{" "}
								<span >
									$7.200.
								</span>{" "}
								<br /> <br />{" "}
								<a
									
									href="/calcula-tu-envio/p"
									target="_blank"
								>
									Más información
								</a>
							</p>
						</Panel>
					</Collapse>
				</Col>
			</Row>
			<Row>
				<BestSelling anchoPagina={anchoPagina} />
			</Row>
		</>
	);
};
export default ProductsId;
