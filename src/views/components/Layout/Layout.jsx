import { Image, Layout, Row } from "antd";
import { connect } from "react-redux";
import React, { Fragment, useState } from "react";
import Routes from "../../config/router/Routes";
import NavMenu from "../Layout/components/NavMenu";
import FooterComponent from "../Layout/components/FooterComponent";
import HeaderComponent from "../Layout/components/HeaderComponent";
import { logoutUser } from "../../../redux/actions/Configuration/authAction";
import logo from "../../../includes/images/nubeHover.png";
import logoHover from "../../../includes/images/nube.png";
const { Content } = Layout;

const LayoutComponent = ({ user, dispatchLogoutAction }) => {
	const [logoMenu, setLogoMenu] = useState(logo);
	const handleChange = () => {
		setLogoMenu(logoHover);
	};
	const handleChangeLeave = () => {
		setLogoMenu(logo);
	};

	return (
		<Fragment>
			<NavMenu />

			{/* RUTAS */}
			<Routes />
			{/* END RUTAS */}

			<FooterComponent />
			{window.location.pathname.includes("checkout") ? null : (
				<div style={{ position: "fixed", right: "2%", bottom: "6%" }}>
					<a
						href="https://api.whatsapp.com/send/?phone=573013095065"
						target="_blank"
					>
						<Image
							className="custom-image"
							style={{ height: "150px", width: "auto" }}
							src={logoMenu}
							preview={false}
							onMouseOver={handleChange}
							onMouseLeave={handleChangeLeave}
						/>
					</a>
				</div>
			)}
		</Fragment>
	);
};

export default LayoutComponent;
