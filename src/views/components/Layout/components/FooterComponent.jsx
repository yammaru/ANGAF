import React from "react";
import { Divider, Layout, Row } from "antd";
import Contacte from "./FooterItems/Contacte";
import SocialMediaFooter from "./FooterItems/SocialMediaFooter";
import DownFooter from "./FooterItems/DownFooter";
import UpFooter from "./FooterItems/UpFooter";

const { Footer } = Layout;

const FooterComponent = () => {
	let today = new Date(Date.now());

	return (
		<>
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
				{window.location.pathname.includes("checkout") ? (
					<><Row justify={"center"} 	style={{
								backgroundColor: "#f2f2f2",
								color: "1e1e1e",
							}}>
							
							<Divider
								style={{ width: "100%", visibility: "hidden" }}
							/>
							Medios de pago y sitio seguro
							<Divider
								style={{ width: "100%", visibility: "hidden" }}
							/>
						
					</Row><Row style={{
								backgroundColor: "#484848",
								color: "white",
								height :"40px",
								display:"flex",
								justifyContent:"center",
								alignItems:"center"
							}}>
					
							Todos los derechos reservados. Copyright ©{today.getFullYear().toString()} Anga Col ·
						
						</Row>
					
					

						
					</>
				) : (
					<>
						<Divider
							style={{ width: "100%", visibility: "hidden" }}
						/>
						<UpFooter />

						<Divider style={{ width: "100%" }} />
						<DownFooter />
						<Divider
							style={{ width: "100%", visibility: "hidden" }}
						/>
					</>
				)}
			</div>
		</>
	);
};
export default FooterComponent;
