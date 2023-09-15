import { MenuOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Space } from "antd";
import React, { useState } from "react";

const BurgerMenu = () => {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Space>
				<Button
					type="ghost"
					style={{ borderColor: "transparent" }}
					icon={<MenuOutlined />}
					onClick={showDrawer}
				/>
			</Space>
			<Drawer
				title={false}
				placement={"left"}
				onClose={onClose}
				open={open}
				width="70vw"
			>
				<ul
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<li data-url="/mujer">
						<a
							class="b2canga-header-0-x-menu--link"
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
							class="b2canga-header-0-x-menu--link"
							href="/hombre"
							target="_self"
						>
							<h3>
								<b>caballeros</b>
							</h3>
						</a>
					</li>

					<li data-url="/cosas">
						<a
							class="b2canga-header-0-x-menu--link"
							href="/kids"
							target="_self"
						>
							<h3>
								<b>kids</b>
							</h3>
						</a>
					</li>
					<li data-url="/cosas">
						<a
							class="b2canga-header-0-x-menu--link"
							href="/cosas"
							target="_self"
						>
							<h3>
								<b>accesorio</b>
							</h3>
						</a>
					</li>

					<li data-url="/sale">
						<a
							class="b2canga-header-0-x-menu--link"
							href="/sale"
							style={{ backgroundColor: "gold" }}
						>
							<h3>
								<b>SALE</b>
							</h3>
						</a>
					</li>
				</ul>
				<Divider />
				<ul
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<li data-url="/tiendas">
						<a
							class="b2canga-header-0-x-menu--link"
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
							class="b2canga-header-0-x-menu--link"
							href="/login"
							target="_self"
						>
							<h3>
								<b>Ingresar</b>
							</h3>
						</a>
					</li>
				</ul>
               
			</Drawer>
		</>
	);
};

export default BurgerMenu;
