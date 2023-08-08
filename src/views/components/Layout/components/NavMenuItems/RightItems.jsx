import {
	SearchOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Modal } from "antd";
import { useState } from "react";

const RightItems = () => {
	const [visible, setVisible] = useState(false);
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const showModal = () => {
		setVisible(true);
	};

	const hideModal = () => {
		setVisible(false);
	};
	const showDrawer = () => {
		setVisibleDrawer(true);
	};

	const closeDrawer = () => {
		setVisibleDrawer(false);
	};
	const elements = [{ name: "lobo" }, { name: "lupus" }];
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-around",
				justifyItems: "center",
			}}
		>
			<Button
				style={{
					backgroundColor: "transparent",
					borderRadius: "50%",
					border: "2px solid #484848",
				}}
				icon={
					<UserOutlined
						style={{ color: "#484848", fontSize: "25px" }}
					/>
				}
				onClick={showModal}
			/>

			<SearchOutlined style={{ color: "#484848", fontSize: "25px" }} />
			<Button
				style={{
					backgroundColor: "transparent",
					borderRadius: "50%",
					border: "2px solid transparent",
				}}
				icon={
					<ShoppingCartOutlined
						style={{ color: "#484848", fontSize: "25px" }}
					/>
				}
				onClick={showDrawer}
			/>

			<Modal
				title="Mi Cuenta"
				visible={visible}
				onCancel={hideModal}
				footer={null}
				width={180}
				style={{ position: "absolute", right: "4%", top: "8%" }}
			>
				<Button block type="primary" style={{ marginBottom: "10px" }}>
					Iniciar Sesión
				</Button>
				<Button block>Registrarse</Button>
			</Modal>
			<Drawer
				title={<div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    justifyItems: "center",
                }}><b>Carrito de Compra</b></div>}
				placement="right"
				closable={true}
				onClose={closeDrawer}
				visible={visibleDrawer}
			>
				{elements.forEach((element) => {
					<Button
						block
						type="primary"
						style={{ marginBottom: "10px" }}
					>
						{element.name}
					</Button>;
				})}
			</Drawer>
		</div>
	);
};
export default RightItems;
