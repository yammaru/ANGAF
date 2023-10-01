import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link,Title } = Typography;
const WhoWeAre= ({anchoPagina}) => {
	const elements = [
		{
			path: "/conviccion",
			icon: "",
			title: "Convicciones",
		},
		{
			path: "/login",
			icon: "",
			title: "Ficha Anga",
		},
        {
			path: "/",
			icon: "",
			title: "Mundo Anga",
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
