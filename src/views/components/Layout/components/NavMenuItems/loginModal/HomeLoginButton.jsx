import {
	GooglePlusOutlined,
	LeftOutlined,
	LockOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Typography } from "antd";

const { Title, Text } = Typography;
const HomeLoginButton = ({ whoIsSet, howSet }) => {

	const onclickMail = () => {
		whoIsSet("M");
	};
	const onclickGoogle = () => {};

	const onclickLock = () => {
        console.log(1);
		whoIsSet("R");
		howSet("BG");
	};

	const elements = [
		{
			icon: <MailOutlined />,
			description: "Recibir clave de acceso rápido por email",
			onClick: onclickMail,
		},
		{
			icon: <GooglePlusOutlined />,
			description: "Ingresa con tu cuenta de Google",
			onClick: onclickGoogle,
		},
		{
			icon: <LockOutlined />,
			description: "Ingresa con email y contraseña",
			onClick: onclickLock,
		},
	];
	return (
		<>
			<Col
				style={{
					paddingTop: "20%",
				}}
			>
				<Title level={5}>Iniciar sesión</Title>
				<Text>
					Eligir alguna de las opiniones para confirmar tu identidad
				</Text>
			</Col>
			<Divider style={{ visibility: "hidden" }} />
			<Col
				style={{
					display: "flex",
					alignItems: "flex-start",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				{elements.map((element) => (
					<Button
						style={{
							display: "flex",

							alignItems: "flex-start",
						}}
						icon={<>{element.icon}</>}
						type="ghost"
						onClick={element.onClick}
						block
					>
						{element.description}
					</Button>
				))}
			</Col>
		</>
	);
};
export default HomeLoginButton;
