import React from "react";
import { Col, Row } from "antd";
import SocialMediaFooter from "./SocialMediaFooter";
import Contacte from "./Contacte";
import WhoWeAre from "./WhoWeAre";
import Help from "./Help";
import Mark from "./Mark";

const UpFooter = () => {
	return (
		<Row justify="space-between" align="top" style={{ marginLeft: "5%" }}>
			<Col style={{ width: "20%" }}>
				<Contacte />
			</Col>
			<Col style={{ width: "20%" }}>
				<WhoWeAre />
			</Col>
			<Col style={{ width: "20%" }}>
				<Help />
			</Col>
			<Col style={{ width: "20%" }}>
				<Mark />
			</Col>
			<Col style={{ width: "20%" }}>
				<SocialMediaFooter />
			</Col>
		</Row>
	);
};
export default UpFooter;
