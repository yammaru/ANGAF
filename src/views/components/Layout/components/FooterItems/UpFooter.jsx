import React from "react";
import { Col, Row } from "antd";
import SocialMediaFooter from "./SocialMediaFooter";
import Contacte from "./Contacte";
import WhoWeAre from "./WhoWeAre";
import Help from "./Help";

const UpFooter = () => {
	return (
		<Row justify="space-between" align="top" style={{ marginLeft: "5%" }}>
			<Col style={{ width: "25%" }}>
				<Contacte />
			</Col>
			<Col style={{ width: "25%" }}>
				<WhoWeAre />
			</Col>
			<Col style={{ width: "25%" }}>
				<Help />
			</Col>
			<Col style={{ width: "25%" }}>
				<SocialMediaFooter />
			</Col>
		</Row>
	);
};
export default UpFooter;
