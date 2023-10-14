import React from "react";
import { Collapse, Row, Typography } from "antd";
import WebRedes from "./WebRedes";

const { Text, Link, Title } = Typography;
const { Panel } = Collapse;

const SocialMediaFooter = ({ anchoPagina }) => {
	return (
		<div style={{ paddingTop: anchoPagina < 766 ? "3%" : 0 }}>
			<Row color="#787878" justify={anchoPagina < 766 ? "center" : ""}>
				<Text style={{ color: "#484848" }} strong>
					SÍGUENOS
				</Text>
			</Row>

			<WebRedes anchoPagina={anchoPagina} />
		</div>
	);
};

export default SocialMediaFooter;
