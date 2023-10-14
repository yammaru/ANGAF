import { Divider, Image, Layout, Row } from "antd";
import { connect } from "react-redux";
import React, { Fragment, useState } from "react";
import Routes from "../../config/router/Routes";
import NavMenu from "../Layout/components/NavMenu";
import FooterComponent from "../Layout/components/FooterComponent";
import HeaderComponent from "../Layout/components/HeaderComponent";
import { logoutUser } from "../../../redux/actions/Configuration/authAction";
import logo from "../../../includes/images/nubeHover.png";
import logoHover from "../../../includes/images/nube.png";
import chat from "../../../includes/images/CHATaNGA.png";
import { useWindowWidth  } from "../../handle/size/size";
import { useEffect } from "react";
const { Content } = Layout;

const LayoutComponent = ({ user, dispatchLogoutAction }) => {
	
	const anchoPagina = useWindowWidth(useState, useEffect);
	const [logoMenu, setLogoMenu] = useState(logo);
	const handleChange = () => {
		setLogoMenu(logoHover);
	};
	const handleChangeLeave = () => {
		setLogoMenu(logo);
	};

	return (
		<Fragment>
			<NavMenu anchoPagina={anchoPagina}/>
			{
				 window.location.pathname !== "/"?<Divider style={{ paddingBottom: anchoPagina<=766?"10%":"2%" }} />:<></>
			}
			
			{/* RUTAS */}
			<Routes />
			{/* END RUTAS */}

		
			{window.location.pathname.includes("checkout") ? null : (
				<div style={{ position: "fixed", right: "2%", bottom: "6%",zIndex:5000 }}>
					<a
						href="https://api.whatsapp.com/send/?phone=573013095065"
						target="_blank"
					>
						{anchoPagina >= 1074 ? (
							<Image
								className="custom-image"
								style={{ height: "150px", width: "auto" }}
								src={logoMenu}
								preview={false}
								onMouseOver={handleChange}
								onMouseLeave={handleChangeLeave}
							/>
						) : (
							<Image
								
								height={50}
								src={chat}
								preview={false}
							/>
						)}
					</a>
				</div>
			)}	
			<FooterComponent  anchoPagina={anchoPagina}/>
		</Fragment>
	);
};

export default LayoutComponent;
