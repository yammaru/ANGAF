import { Divider, Image, Row } from "antd";
import LogIn from "../../Layout/components/NavMenuItems/loginModal/LogIn";
import { renderComponentBasedOnWhoIs } from "../../../handle/RendersComponent/RenderComponetLogin";
import { useState } from "react";

const LoginSeccion = () => {
	const [whoIs, setwhoIs] = useState("I");
	const [how, setHow] = useState("");
	const logoMenu =
		"https://b2cmattelsa.vtexassets.com/arquivos/loginBackground-desktop.jpg";

	//useEffect(() => renderComponentBasedOnWhoIs(), [whoIs, how]);
	const showModalInit = () => {
		setwhoIs("I");
	};
	const showModalReg = () => {
		setwhoIs("R");
		setHow("");
	};

	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<Row width={"100%"} style={{overflow:"hidden",height:"200px"}}>
				<Image width={"100%"} style={{position:"relative",bottom:"40%"}} src={logoMenu} preview={false} />
			</Row>
			<Row
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				justify={"center"}
			>
				{renderComponentBasedOnWhoIs(how, setHow, setwhoIs, whoIs)}
			</Row>
		</>
	);
};
export default LoginSeccion;
