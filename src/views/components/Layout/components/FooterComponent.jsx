import React from "react";
import { Divider, Layout } from "antd";
import Contacte from "./FooterItems/Contacte";
import SocialMediaFooter from "./FooterItems/SocialMediaFooter";

const { Footer } = Layout;

const FooterComponent = () => {
	let today = new Date(Date.now());

	return (
		<Footer
			style={{
				textAlign: "center",
				color: "#fff",
				backgroundColor: "#212529",
				width: "100%",
				height: "auto",
				position: "fixed",
				bottom: 0,
				zIndex: 99,
			}}
		>
			<Contacte/>
            <SocialMediaFooter/>
            <Divider/>
			© {today.getFullYear().toString()} Anga Col. CREATING STYLES THAT
			DEFY GRAVITY.
		</Footer>
	);
};
export default FooterComponent;
