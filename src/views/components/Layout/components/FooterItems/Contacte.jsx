import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link,Title } = Typography;
const Contacte = ({anchoPagina}) => {
	const elements = [
		{
			path: "https://api.whatsapp.com/send/?phone=573013095065",
			icon: <WhatsAppOutlined/>,
			title: "3013095065",
		},
		{
			path: "tel:+573113894327",
			icon: "",
			title: <><strong>PBX:</strong>005+57+20002+3113894327</>,
		},
        {
			path: "/escribenos",
			icon: "",
			title: "Escríbenos",
		}
	];
	const title = "CONTACTO";
	return (
		<>
			<ColumSesionItem title={title} elements={elements}  anchoPagina={anchoPagina}/>
			
		</>
	);
};
export default Contacte;
