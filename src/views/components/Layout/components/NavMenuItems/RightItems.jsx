import {
	DeleteOutlined,
	SearchOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Drawer, Image, Modal, Row } from "antd";
import { useState } from "react";
import { formatterMoney } from "../../../../handle/FormatterMoney/FormatterMoney";
import ShoppingItem from "./ShoppingItem";
import LogIn from "./loginModal/LogIn";

const RightItems = () => {
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = () => {
		setVisible(false);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-around",
				justifyItems: "center",
			}}
		>
			<Button
				className="gold-hover-boton"
				style={{
					backgroundColor: "transparent",
					borderRadius: "50%",
					border: "2px solid #484848",
				}}
				icon={
					<UserOutlined
						className="gold-hover-icon"
						style={{ color: "#484848", fontSize: "25px" }}
					/>
				}
				onClick={showModal}
			/>

			<SearchOutlined
				className="gold-hover-icon"
				style={{ color: "#484848", fontSize: "25px" }}
			/>
			<ShoppingItem />

			<Modal
				title="Mi Cuenta"
				visible={visible}
				onCancel={hideModal}
				footer={null}
				width={180}
				style={{ position: "absolute", right: "4%", top: "8%" }}
			>
				< LogIn/>
				
			</Modal>
		</div>
	);
};
export default RightItems;
