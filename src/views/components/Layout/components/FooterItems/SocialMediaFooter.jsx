import React from "react";
import {
	GithubOutlined,
	TwitterOutlined,
	InstagramOutlined,
	WhatsAppOutlined,
	FacebookOutlined,
	YoutubeOutlined,
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
			path: "https://www.facebook.com/people/ANGA/100066881491116/?mibextid=ZbWKwL",
			icon: <FacebookOutlined className="social-icon" />,
		},
		{
			path: "https://www.instagram.com/anga.col/",
			icon: <InstagramOutlined  className="social-icon" />,
		},
		{
			path: "https://twitter.com/Anga_col",
			icon: <TwitterOutlined className="social-icon" />,
		}
		,
		{
			path: "https://www.youtube.com/user/anga_col",
			icon: <YoutubeOutlined className="social-icon" />,
		}
		,
		{
			path: "https://www.tiktok.com/@anga.col",
			icon: <i class="fab fa-tiktok social-icon"/>
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
