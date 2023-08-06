import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const Help = () => {

	const elements = [
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "Envíos",
		},
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "Cambios y garantías",
		},
        {
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: "",
			title: "Preguntas frecuentes",
		}
	];
	const title = "AYUDA";
	return (
		<>
			<ColumSesionItem title={title} elements={elements} />
		</>
	);
};
export default Help;
