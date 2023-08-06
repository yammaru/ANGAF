import React from "react";
import {
	GithubOutlined,
	TwitterOutlined,
	InstagramOutlined,
	WhatsAppOutlined,
	FacebookOutlined,
} from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import WebRedes from "./WebRedes";
const { Text, Link, Title } = Typography;
const SocialMediaFooter = () => {
	const element = [
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: <WhatsAppOutlined className="social-icon" />,
		},
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: <FacebookOutlined className="social-icon" />,
		},
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: <InstagramOutlined  className="social-icon" />,
		},
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: <TwitterOutlined className="social-icon" />,
		}
	];
	return (
		<div>
			<Row color="#787878">
				<Text style={{color:"#787878"}} strong>SÍGUENOS</Text>
			</Row>
			<Row style={{marginLeft:"-4%"}} >
				<WebRedes elements={element} />
				
			</Row>
		</div>
	);
};

export default SocialMediaFooter;
