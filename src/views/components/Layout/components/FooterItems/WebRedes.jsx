import React, { useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined, YoutubeOutlined } from "@ant-design/icons";
import x from "../../../../../includes/images/xTwiter.png";
import xD from "../../../../../includes/images/xTwiterDorado.png";
import spoty from "../../../../../includes/images/spotylogo.png";
import spotyDorado from "../../../../../includes/images/spotyLogoDorado.png";
const WebRedes = ({ anchoPagina }) => {
	const [twitter, setTwitter] = useState(x);
	const [spotify, setSpotify] = useState(spoty);
	const handleChange = () => {
		setSpotify(spotyDorado);
	};
	const handleChangeLeave = () => {
		setSpotify(spoty);
	};
	const handleChangex = () => {
		setTwitter(xD);
	};
	const handleChangeLeavex = () => {
		setTwitter(x);
	};
	const elements = [
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
			icon: <InstagramOutlined className="social-icon" />,
		},
		{
			path: "https://twitter.com/Anga_col",
			icon: (
				<img
				style={{ color: "#484848", height: "2.4vh" }}
					src={twitter}
					onMouseOver={handleChangex}
					onMouseLeave={handleChangeLeavex}
				/>
			),
		},
		{
			path: "https://www.youtube.com/user/anga_col",
			icon: <YoutubeOutlined className="social-icon" />,
		},
		{
			path: "https://www.tiktok.com/@anga.col",
			icon: <i className="fab fa-tiktok social-icon" />,
		},
		{
			path: "https://spotify.link/APLGM3U9kDb",
			icon: (
				
				<img style={{ color: "#484848", height: "2.8vh" }}
					src={spotify}
					onMouseOver={handleChange}
					onMouseLeave={handleChangeLeave}
				/>
			),
		},
	];
	return (
		<Row
			style={{ marginLeft: "-4%" }}
			justify={anchoPagina < 766 ? "space-evenly" : ""}
		>
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
		</Row>
	);
};
export default WebRedes;
