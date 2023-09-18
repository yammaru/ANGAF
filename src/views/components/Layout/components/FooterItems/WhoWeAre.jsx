import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link,Title } = Typography;
const WhoWeAre= ({anchoPagina}) => {
	const elements = [
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "Cultura",
		},
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "Trabaja aquí",
		},
        {
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "La vida en Anga",
		}
	];
	const title = "QUIÉNES SOMOS";
	return (
		<>
			<ColumSesionItem title={title} elements={elements}  anchoPagina={anchoPagina}/>
		</>
	);

	
};
export default WhoWeAre;
