import React from "react";
import { Divider, Layout } from "antd";
import Contacte from "./FooterItems/Contacte";
import SocialMediaFooter from "./FooterItems/SocialMediaFooter";
import DownFooter from "./FooterItems/DownFooter";
import UpFooter from "./FooterItems/UpFooter";

const { Footer } = Layout;

const FooterComponent = () => {
	let today = new Date(Date.now());

	return (
		<div
			className="footer-anga"
			style={{
				textAlign: "center",
				backgroundColor: "white",
				width: "100%",
				height: "auto",
			
			
				
				//zIndex: 99,
			}}
		>
			<Divider style={{ width: "100%" , visibility:"hidden"}} />
			<UpFooter />

			<Divider style={{ width: "100%" }} />
			<DownFooter />
			<Divider style={{ width: "100%" , visibility:"hidden"}} />
		</div>
	);
};
export default FooterComponent;
