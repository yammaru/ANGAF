import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const Help = ({anchoPagina}) => {

	const elements = [
		{
			path: "/envios",
			icon: "",
			title: "Envíos",
		},
		{
			path: "/info/cambios",
			icon: "",
			title: "Cambios, garantías y devoluciones",
		},
        {
			path: "/info/faq",
			icon: "",
			title: "Preguntas frecuentes",
		}
	];
	const title = "AYUDA";
	return (
		<>
			<ColumSesionItem title={title} elements={elements}  anchoPagina={anchoPagina}/>
		</>
	);
};
export default Help;
