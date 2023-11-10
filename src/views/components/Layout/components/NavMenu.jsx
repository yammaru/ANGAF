import "./../css/layout.scss";
import { Link } from "react-router-dom";
import { Menu, Layout, Image, Spin, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../includes/images/logoInicio.png";
import logoHover from "../../../../includes/images/logoIniciohover.png";
import logoCheck from "../../../../includes/images/logocheout.png";
import logoKids from "../../../../includes/images/angaKids.png";
import logoKidsHover from "../../../../includes/images/angaKidsColor.png";
import { fetchAllGeneralSetting } from "../../../../redux/actions/Configuration/GeneralSettingAction";
import {
	getModulesUserById,
	savePermissionsLocalStorage,
} from "../../../../redux/actions/Configuration/usersAction";
import { LockFilled, MenuOutlined } from "@ant-design/icons";
import { auto } from "@popperjs/core";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CenterItems from "./NavMenuItems/CenterItems";
import RightItems from "./NavMenuItems/RightItems";
import MarqueeMessage from "./NavMenuItems/letrero/MarqueeMessage";
import LeftItems from "./NavMenuItems/LeftItems";
import { useWindowWidth } from "../../../handle/size/size";
import BurgerMenu from "./NavMenuItems/BurgerMenu";
import { isCheckoutPage } from "../../../handle/Path/path";
import yourLookLogo from "../../../../includes/images/yourLook.jpeg";
import SearchItem from "./NavMenuItems/SearchItem";
const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const NavMenu = ({ anchoPagina }) => {
	const dispatch = useDispatch();
	const colorMenu = localStorage.getItem("colorMenu");
	const colorIcon = localStorage.getItem("colorIcon");
	//	const userId = JSON.parse(localStorage.getItem("USER_INFO")).id;
	const [collapsed, setCollapsed] = useState(true);
	const [modules, setModules] = useState([]);
	const [loading, setLoading] = useState(false);
	const generalSetting = useSelector(
		(state) => state?.generalSetting._payload
	);

	const [colorStateMenu, setColorStateMenu] = useState(
		generalSetting?.menu_bar_color || colorMenu
	);
	const [colorStateIcon, setColorStateIcon] = useState(
		generalSetting?.icon_color || colorIcon
	);

	const onCollapse = () => {
		setCollapsed(!collapsed);
	};
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const [marqueeVisible, setMarqueeVisible] = useState(true);

	const handleHover = () => {
		setMarqueeVisible(false);
	};

	const handleMouseLeave = () => {
		setMarqueeVisible(true);
	};
	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		const isVisible = prevScrollPos > currentScrollPos;

		setPrevScrollPos(currentScrollPos);
		setVisible(isVisible || currentScrollPos === 0);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [prevScrollPos]);

	const navActivation = () => {
		return window.location.pathname !== "/" || anchoPagina <= 766
			? "transparent-header"
			: "transparent-header-index";
	};

	console.log(isCheckoutPage());
	return (
		<>
			{window.location.pathname.includes("checkout") ? (
				<Header style={{ backgroundColor: "#484848" }}>
					<Row justify="space-between" align="middle">
						<Col>
							<LeftItems useState={useState} />
						</Col>
						<Col style={{ color: "white" }}>
							<LockFilled /> Compra 100% segura
						</Col>
					</Row>
				</Header>
			) : (
				<>
					{marqueeVisible &&
					navActivation() == "transparent-header-index" ? (
						<MarqueeMessage />
					) : null}
					<Header
						className={navActivation()}
						style={
							visible == true
								? { padding: "0 10px" }
								: { display: "none" }
						}
						onMouseEnter={handleHover}
						onMouseLeave={handleMouseLeave}
					>
						{navActivation() == "transparent-header-index"
							? marqueeVisible && (
									<Row style={{ visibility: "hidden" }}>
										<MarqueeMessage />
									</Row>
							  )
							: null}

						<Row justify="space-between" align="middle">
							<Col>
								{anchoPagina >= 768 ? (
									<LeftItems
										useState={useState}
										WhoWeAre={!isCheckoutPage()}
									/>
								) : window.location.pathname.includes(
										"yourlook"
								  ) ? (
									<a href="yourlook">
										<Image
											width={200}
											preview={false}
											src={yourLookLogo}
										/>
									</a>
								) : (
									<BurgerMenu />
								)}
							</Col>
							<Col>
								{anchoPagina >= 768 ? (
									<CenterItems WhoWeAre={!isCheckoutPage()} />
								) : window.location.pathname.includes(
										"yourlook"
								  ) ? (
									<SearchItem anchoPagina={anchoPagina} />
								) : (
									<LeftItems useState={useState} 	WhoWeAre={!isCheckoutPage()}/>
								)}
							</Col>
							{isCheckoutPage() ? (
								<></>
							) : (
								<Col style={{ width: "10%" }}>
									<RightItems anchoPagina={anchoPagina} />
								</Col>
							)}
						</Row>
					</Header>
				</>
			)}
		</>
	);
};
export default NavMenu;
