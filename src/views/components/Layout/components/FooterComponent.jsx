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
		<Footer
		className="footer-anga"
			style={{
				textAlign: "center",
				
				
			
				width: "100%",
				height: "auto",
				position: "fixed",
				bottom: 0,
				//zIndex: 99,
			}}
		>
			
				<UpFooter/>
		
		
            <Divider style={{width: "100vw",marginLeft:"-4%"}}/>
            <DownFooter/>
		</Footer>
	);
};
export default FooterComponent;
