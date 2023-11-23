import React from "react";
import { Divider, Layout, Row, Col, Image } from "antd";
import Contacte from "./FooterItems/Contacte";
import SocialMediaFooter from "./FooterItems/SocialMediaFooter";
import DownFooter from "./FooterItems/DownFooter";
import UpFooter from "./FooterItems/UpFooter";
import pingu from "../../../../includes/images/eL PIGUINO SABIO.png";
const { Footer } = Layout;

const FooterComponent = ({ anchoPagina }) => {
	let today = new Date(Date.now());

	return (
		<Row
			//className="footer-anga"
			style={{
				textAlign: "center",
				backgroundColor: "white",
				width: "100%",
				height: "auto",

				//zIndex: 99,
			}}
		>
			{window.location.pathname.includes("checkout") ? (
				<Row
					justify={"center"}
					style={{
						backgroundColor: "#f2f2f2",
						color: "1e1e1e",
						width: "100%",
					}}
				>
					<Row
						justify={"space-around"}
						style={{
							width: "100%",
							height: 80,
							display: "flex",
							
							alignItems: "center",
						}}
					>
						Medios de pago y sitio seguro
					</Row>

					<Row
						style={{
							width: "100%",
							backgroundColor: "#484848",
							color: "white",
							height: "40px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: "5px",
						}}
					>
						<Col>
							Todos los derechos reservados · Copyright ©
							{today.getFullYear().toString()} Anga Col ·
							Desarrollado por el pinguino sabio de YAMMCODEV{""}
						</Col>
						<Col
							style={{ filter: "grayscale(100%)", width: "30px" }}
						>
							<Image src={pingu} width={30}></Image>
						</Col>
					</Row>
				</Row>
			) : (
				<>
					<Divider style={{ width: "100%", visibility: "hidden" }} />
					<UpFooter anchoPagina={anchoPagina} />

					<Divider style={{ width: "100%" }} />
					<DownFooter />
					<Divider style={{ width: "100%", visibility: "hidden" }} />
				</>
			)}
		</Row>
	);
};
export default FooterComponent;
