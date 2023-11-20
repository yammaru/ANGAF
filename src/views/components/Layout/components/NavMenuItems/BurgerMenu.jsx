import { LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Space } from "antd";
import React, { useState } from "react";
import kisd from "../../../../../includes/images/kids.png";
const BurgerMenu = () => {
	const [open, setOpen] = useState(false);
	const [saleBottonState, setSaleBottonState] = useState("");
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const saleBotton = (data) => {
		setSaleBottonState(data);
	};
	const KidsMenu = (
		<ul
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: "30px",
			}}
		>
			<Button
				style={{
					padding: 0,
					border: "1px solid transparent",
					boxShadow: "transparent",
					display: "flex",
					
					alignItems: "center",
				}}
				onClick={() => saleBotton("")}
				block
			>
				<h3>
					<b>
						<LeftOutlined />
					</b>
				</h3>
				<img src={kisd} alt="" />
			</Button>

			<li data-url="/all">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/all"
					target="_self"
				>
					<h3>
						<b>todos</b>
					</h3>
				</a>
			</li>
			<li data-url="/mujer">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/mujer"
					target="_self"
				>
					<h3>
						<b>niñas</b>
					</h3>
				</a>
			</li>
			<li data-url="/hombre">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/hombre"
					target="_self"
				>
					<h3>
						<b>niños</b>
					</h3>
				</a>
			</li>
		</ul>
	);
	const SaleMenu = (
		<ul
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: "30px",
			}}
		>
			<Button
				style={{
					padding: 0,
					backgroundColor: "gold",
					display: "flex",
					gap: "10px",
					alignItems: "center",
				}}
				onClick={() => saleBotton("")}
				block
			>
				<h3>
					<b>
						<LeftOutlined />
					</b>
				</h3>
				<h3>
					<b>SALE</b>
				</h3>
			</Button>

			<li data-url="/all">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/all"
					target="_self"
				>
					<h3>
						<b>todo</b>
					</h3>
				</a>
			</li>
			<li data-url="/mujer">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/mujer"
					target="_self"
				>
					<h3>
						<b>damas</b>
					</h3>
				</a>
			</li>
			<li data-url="/hombre">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/hombre"
					target="_self"
				>
					<h3>
						<b>caballeros</b>
					</h3>
				</a>
			</li>
		</ul>
	);
	const InitialMenu = (
		<ul
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: "30px",
			}}
		>
			<li data-url="/mujer">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/mujer"
					target="_self"
				>
					<h3>
						<b>damas</b>
					</h3>
				</a>
			</li>
			<li data-url="/hombre">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/hombre"
					target="_self"
				>
					<h3>
						<b>caballeros</b>
					</h3>
				</a>
			</li>
			<Button
				style={{
					padding: 0,
					border: "1px solid transparent",
					boxShadow: "transparent",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				onClick={() => saleBotton("k")}
				block
			>
				<img src={kisd} alt="" />
				<h3>
					<b>
						<RightOutlined />
					</b>
				</h3>
			</Button>

			<li data-url="/cosas">
				<a
					className="b2canga-header-0-x-menu--link"
					href="/cosas"
					target="_self"
				>
					<h3>
						<b>accesorio</b>
					</h3>
				</a>
			</li>
			<Button
				style={{
					padding: 0,
					backgroundColor: "gold",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				onClick={() => saleBotton("s")}
				block
			>
				<h3>
					<b>SALE</b>
				</h3>
				<h3>
					<b>
						<RightOutlined />
					</b>
				</h3>
			</Button>
		</ul>
	);
	return (
		<>
			<Space>
				<Button
					className="footer-anga"
					type="ghost"
					style={{ borderColor: "transparent" }}
					icon={
						<MenuOutlined
							style={{
								fontSize: window.location.pathname.includes(
									"yourlook"
								)
									? "30px"
									: "",
							}}
						/>
					}
					onClick={showDrawer}
				/>
			</Space>
			<Drawer
				style={{ zIndex: 5001 }}
				title={false}
				placement={"left"}
				onClose={onClose}
				open={open}
				width="70vw"
				footer={
					<ul
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							gap: "30px",
						}}
					>
						<li data-url="/tiendas">
							<a
								className="b2canga-header-0-x-menu--link"
								href="/tiendas"
								target="_self"
							>
								<h3>
									<b>tiendas</b>
								</h3>
							</a>
						</li>
						<li data-url="/tiendas">
							<a
								className="b2canga-header-0-x-menu--link"
								href="/login"
								target="_self"
							>
								<h3>
									<b>Ingresar</b>
								</h3>
							</a>
						</li>
					</ul>
				}
			>
				{saleBottonState == ""
					? InitialMenu
					: saleBottonState == "s"
					? SaleMenu
					: KidsMenu}
			</Drawer>
		</>
	);
};

export default BurgerMenu;
