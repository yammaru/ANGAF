import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const WebRedes = ({ elements }) => {
	return (
		<>
			{elements?.map((element) => (
				<Col>
					<a
						className="footer-anga"
						href={element.path}
						target="_blank"
						style={{
							display: "flex",
							alignItems: "center",
							fontSize: "15px",
							padding: "15px",
						}}
					>
						{element.icon !== "" ? element.icon : <></>}
					</a>
				</Col>
			))}
		</>
	);
};
export default WebRedes;
