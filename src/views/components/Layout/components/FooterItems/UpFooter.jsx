import React from "react";
import { Col, Row } from "antd";
import SocialMediaFooter from "./SocialMediaFooter";
import Contacte from "./Contacte";
import WhoWeAre from "./WhoWeAre";
import Help from "./Help";
import Mark from "./Mark";

const UpFooter = ({ anchoPagina }) => {
	return (
		<Row justify="space-between" align="top" style={{ marginLeft: anchoPagina>=766?"5%":"0%",width: "100%" }}>
			{[
				{ Component: Contacte },
				{ Component: WhoWeAre },
				{ Component: Help },
				{ Component: Mark },
				{ Component: SocialMediaFooter },
			].map(({ Component }, index) => (
				<Col key={index} style={{ width:anchoPagina>=766?"20%": "100%" }}>
					<Component anchoPagina={anchoPagina} />
				</Col>
			))}
		</Row>
	);
};
export default UpFooter;
