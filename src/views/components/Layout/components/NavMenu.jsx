import "./../css/layout.scss";
import { Link } from "react-router-dom";
import { Menu, Layout, Image, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../includes/images/logo.png";
import { fetchAllGeneralSetting } from "../../../../redux/actions/Configuration/GeneralSettingAction";
import {
	getModulesUserById,
	savePermissionsLocalStorage,
} from "../../../../redux/actions/Configuration/usersAction";
import {
	SettingOutlined,
	DashboardOutlined,
	BarChartOutlined,
	DollarCircleOutlined,
	UserOutlined,
	ProjectOutlined,
	CreditCardOutlined,
	CodepenCircleOutlined,
} from "@ant-design/icons";

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const NavMenu = () => {
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
	const [logoMenu, setLogoMenu] = useState(logo);
	const [colorStateMenu, setColorStateMenu] = useState(
		generalSetting?.menu_bar_color || colorMenu
	);
	const [colorStateIcon, setColorStateIcon] = useState(
		generalSetting?.icon_color || colorIcon
	);

	const onCollapse = () => {
		setCollapsed(!collapsed);
	};
	/*	useEffect(() => {
		dispatch(fetchAllGeneralSetting());
	}, []);

	useEffect(() => {
		if (generalSetting?.logo_app) {
			setLogoMenu(generalSetting?.logo_app);
		}
		if (generalSetting?.menu_bar_color) {
			setColorStateMenu(generalSetting?.menu_bar_color);
		}
		if (generalSetting?.icon_color) {
			setColorStateIcon(generalSetting?.icon_color);
		}
	}, [generalSetting]);

	useEffect(() => {
		setLoading(true);
		dispatch(
			getModulesUserById(userId, async (response) => {
				let _modules = await response;
				setLoading(false);
				if (!_modules.error) {
					setModules(_modules._payload);
				}
			})
		);
		dispatch(savePermissionsLocalStorage(userId));
	}, []);

	function getIcon(type) {
		switch (type) {
			case "dashboard":
				return (
					<DashboardOutlined style={{ color: `${colorStateIcon}` }} />
				);
			case "setting":
				return (
					<SettingOutlined style={{ color: `${colorStateIcon}` }} />
				);
			case "project":
				return (
					<ProjectOutlined style={{ color: `${colorStateIcon}` }} />
				);
			case "user":
				return <UserOutlined style={{ color: `${colorStateIcon}` }} />;
			case "creditCard":
				return (
					<CreditCardOutlined
						style={{ color: `${colorStateIcon}` }}
					/>
				);
			case "dollarCircle":
				return (
					<DollarCircleOutlined
						style={{ color: `${colorStateIcon}` }}
					/>
				);
			case "barChart":
				return (
					<BarChartOutlined style={{ color: `${colorStateIcon}` }} />
				);
			default:
				return (
					<CodepenCircleOutlined
						style={{ color: `${colorStateIcon}` }}
					/>
				);
		}
	}
	const MenuItemWithIcon = ({ icon, title }) => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: 25,
				justifyContent: "space-evenly",
				color: `${colorStateIcon}`,
			}}
		>
			{icon}
			<br />
			<span style={{ fontSize: 9, zIndex: 1 }}>{title}</span>
		</div>
	);
	const listModules = modules?.map((module, index) => {
		if (module?.sub_modules?.length === 0) {
			let route_front = module.route_front ?? "";
			return collapsed === false ? (
				<Menu.Item key={index} icon={getIcon(module.icon)}>
					<Link
						to={route_front}
						style={{ color: `${colorStateIcon}` }}
					>
						{module.name}
					</Link>
				</Menu.Item>
			) : (
				<>
					<MenuItemWithIcon
						icon={
							<DashboardOutlined
								style={{
									color: `${colorStateIcon}`,
									zIndex: 1,
								}}
							/>
						}
						title="Dashboard"
					/>

					<div style={{ position: "relative", top: -30 }}>
						<Menu.Item key={index}>
							<Link to={route_front}></Link>
						</Menu.Item>
					</div>
				</>
			);
		} else {
			let sub_modules = [];
			module.sub_modules?.map((sub_module, sub_index) => {
				let route_front = sub_module?.route_front ?? "";
				sub_modules.push(
					<Menu.Item key={sub_index + "-" + index}>
						<Link to={route_front}>{sub_module.name}</Link>
					</Menu.Item>
				);
			});
			return collapsed === false ? (
				<SubMenu
					style={{
						background: `${colorStateMenu}`,
						color: `${colorStateIcon}`,
					}}
					key={index}
					icon={getIcon(module.icon)}
					title={module.name}
				>
					{sub_modules}
				</SubMenu>
			) : (
				<>
					<SubMenu
						style={{
							color: `${colorStateIcon}`,
							position: "relative",
							zIndex: 1,
						}}
						key={index}
					>
						{sub_modules}
					</SubMenu>

					<div style={{ position: "relative", top: -40, zIndex: 0 }}>
						<MenuItemWithIcon
							icon={getIcon(module.icon)}
							title={module.name}
						/>
					</div>
				</>
			);
		}
	});
*/
	return (
		<>
			<Header className="transparent-header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["2"]}
					items={new Array(15).fill(null).map((_, index) => {
						const key = index + 1;
						return {
							key,
							label: `nav ${key}`,
						};
					})}
				/>
			</Header>
			{/*
			<Sider
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					paddingTop: 2,
					zIndex: 202,
					background: `${colorStateMenu}`,
					fontFamily: "sans-serif"
				}}
				collapsible
				collapsed={collapsed}
				onCollapse={onCollapse}
				className="menu"
			>
				<div className="logo">
					<Image
						width='100%'
						src={logoMenu}
						preview={false}
					/>
				</div>
				{loading ? <Spin style={{ paddingLeft: '30%' }} spinning={true} size="large" /> :
					<Menu style={{ background: `${colorStateMenu}`, fontFamily: "Segoe UI" }} theme="dark" mode="inline">
						{listModules}
					</Menu>
				}
			</Sider>*/}
		</>
	);
};
export default NavMenu;
