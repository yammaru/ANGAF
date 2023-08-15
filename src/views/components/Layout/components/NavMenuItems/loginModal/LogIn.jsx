import {
	GooglePlusOutlined,
	LockOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Image, Modal, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import HomeLoginButton from "./HomeLoginButton";
import PanelPrincipal from "./PanelPricipal";
import Registrate from "./Registrate";
const { Title, Text } = Typography;

const LogIn = () => {
	const [visible, setVisible] = useState(false);
	const [whoIs, setwhoIs] = useState("");
	const [how, setHow] = useState("");
	const logoMenu =
		"https://b2cmattelsa.vtexassets.com/arquivos/loginBackground-desktop.jpg";

	//useEffect(() => renderComponentBasedOnWhoIs(), [whoIs, how]);
	const showModalInit = () => {
		setVisible(true);
		setwhoIs("I");
	};
	const showModalReg = () => {
		setVisible(true);
		setwhoIs("R");
		setHow("");
	};
	const hideModal = () => {
		setVisible(false);
	};
	console.log(how, whoIs);

	const renderComponentBasedOnWhoIs = () => {
		console.log("hola",whoIs);
		switch (whoIs) {
			case "R":
				return <PanelPrincipal how={how} whoIsSet={setwhoIs} howSet={setHow} />;
			case "I":
				return <HomeLoginButton whoIsSet={setwhoIs} howSet={setHow} />;
			case "M":
				return <Registrate how={how} whoIsSet={setwhoIs} howSet={setHow}/>;
			default:
				return <></>;
		}
	};
	return (
		<>
			<Button
				block
				type="primary"
				style={{
					marginBottom: "10px",
					backgroundColor: "#484848",
					borderColor: "#484848",
				}}
				onClick={showModalInit}
			>
				Iniciar Sesión
			</Button>
			<Button block onClick={showModalReg}>
				Registrarse
			</Button>
			<Modal
				title={false}
				visible={visible}
				onCancel={hideModal}
				footer={null}
				style={{ overflow: "hidden" }}
				width={"60%"}
				bodyStyle={{ padding: 0 }}
			>
				<Row>
					<Col style={{ width: "50%" }}>
						<Image src={logoMenu} preview={false} />
					</Col>
					<Col
						style={{
							width: "50%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Row
							style={{
								width: "90%",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
							justify={"center"}
						>
							{renderComponentBasedOnWhoIs()}
						</Row>
					</Col>
				</Row>
			</Modal>
		</>
	);
};
export default LogIn;
