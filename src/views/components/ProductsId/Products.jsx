import { Button, Col, Divider, Image, Row } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BestSelling from "../Ventas/BestSelling";
import { FORMATTER_PESO } from "../../../redux/constants";
import { CheckOutlined } from "@ant-design/icons";

const ProductsId = () => {
	const { id } = useParams();
	console.log(id);
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
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<Divider />
			<Row>
				<Col style={{ width: "65%", paddingLeft: "1%" }}>
					{elements.path.map((imagePath, imgIndex) => (
						<img
							key={imgIndex}
							style={{ width: "50%", height: "50%" }}
							src={imagePath}
							alt={`Image ${imgIndex}`}
						/>
					))}
				</Col>
				<Col
					style={{
						width: "35%",
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
							{elements.available_sizes.map((x) => (
								<>
									<Button type="ghost">{x}</Button>
								</>
							))}
						</Col>
					</Row>
					<Row
						style={{
							paddingBottom: "2%",
						}}
					>
						<Button
							style={{ height: "50px" }}
							disabled={true}
							type="ghost"
							block
						>
							<h6>
								<b style={{ color: "#b4b4b4" }}>
									Selecciona una talla
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
						<Col >
						
                        <CheckOutlined style={{ color: "#52c41a" }}/>	<b style={{ color: "#484848" }}>Pago en efectivo</b>
						
						</Col>
						<Col >
						
                        <CheckOutlined style={{ color: "#52c41a" }}/> <b style={{ color: "#484848" }}>Cambios gratis</b>
						
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<BestSelling />
			</Row>
		</>
	);
};
export default ProductsId;
