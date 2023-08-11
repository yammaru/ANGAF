import { Col, Divider, Image, Row } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BestSelling from "../Ventas/BestSelling";

const ProductsId = () => {
	const { id } = useParams();
	console.log(id);
	const elements = 
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
				"https://static.wikia.nocookie.net/overlordmaruyama/images/3/3a/Lupusregina_Beta.png",
			],
		}
	;
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
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
				<Col>ss</Col>
			</Row>
			<Row>
				<BestSelling />
			</Row>
		</>
	);
};
export default ProductsId;
