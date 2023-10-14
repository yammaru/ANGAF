import React from "react";
import { Col, Row } from "antd";
import SocialMediaFooter from "./SocialMediaFooter";
import Contacte from "./Contacte";
import WhoWeAre from "./WhoWeAre";
import Help from "./Help";
import Mark from "./Mark";
import { isCheckoutPage } from "../../../../handle/Path/path";
import imagePath from "../../../../../includes/images/NuestroMundoAnga.png";
import WebRedes from "./WebRedes";
const UpFooter = ({ anchoPagina }) => {
	return isCheckoutPage() ? (
		<Row
			justify="space-between"
			align="bottom"
			style={{
				marginLeft: anchoPagina >= 766 ? "5%" : "0%",
				width: "100%",
			}}
		>
			<Col style={{ width: anchoPagina >= 766 ? "25%" : "100%" }}>
				<img
					style={{ width: "50%", height: "auto" }}
					src={imagePath}
					alt={`nuestro mundo anga`}
				/>
			</Col>
			<Col style={{ width: anchoPagina >= 766 ? "25%" : "100%" }}>
				<a href={"/"}>
					<h3>TIENDA</h3>
				</a>
			</Col>
			<Col style={{ width: anchoPagina >= 766 ? "25%" : "100%" }}>
				<a href={"/escribenos"}>
					<h3>CONTACTANOS</h3>
				</a>
			</Col>
			<Col style={{ width: anchoPagina >= 766 ? "25%" : "100%" }}>
				<WebRedes anchoPagina={anchoPagina} />
			</Col>
		</Row>
	) : (
		<Row
			justify="space-between"
			align="top"
			style={{
				marginLeft: anchoPagina >= 766 ? "5%" : "0%",
				width: "100%",
			}}
		>
			{[
				{ Component: Contacte },
				{ Component: WhoWeAre },
				{ Component: Help },
				{ Component: Mark },
				{ Component: SocialMediaFooter },
			].map(({ Component }, index) => (
				<Col
					key={index}
					style={{ width: anchoPagina >= 766 ? "20%" : "100%" }}
				>
					<Component anchoPagina={anchoPagina} />
				</Col>
			))}
		</Row>
	);
};
export default UpFooter;
