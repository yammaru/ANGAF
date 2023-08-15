import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Typography } from "antd";

const { Title, Text } = Typography;
const Registrate = ({ whoIsSet, how }) => {
	const onclickGoBack = () => {
		how == "BG" ? whoIsSet("R") : whoIsSet("I");
	};
	return (
		<>
			<Col
				style={{
					paddingTop: "20%",
				}}
			>
				<Title level={5}>
					<LeftOutlined onClick={onclickGoBack} /> Recibir clave de
					acceso rápido por email
				</Title>
			</Col>
			<Col
				style={{
                    width: "95%",
					paddingTop: "2%",
				}}
			>
				<Input placeholder="ejemplo@example.com"></Input>
			</Col>
			<Col
				style={{	width: "95%",
                
					paddingTop: "2%",
				}}
			>
				<Button
					style={{
                        height:"50px",
						backgroundColor: "#484848",
						borderColor: "#484848",
					}}
					type="primary"
					block
				>
					RECIBIR CLAVE
				</Button>
			</Col>
		</>
	);
};
export default Registrate;
