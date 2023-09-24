import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import ColumSesionItem from "./ColumSesionItem";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const Mark = ({anchoPagina}) => {

	const elements = [
		{
			path: "/Distribuidores",
			icon: "",
			title: "Distribuidores",
		},
		{
			path: "/lockbook",
			icon: "",
			title: "Lockbook",
		}
	];
	const title = "MARCA";
	return (
		<>
			<ColumSesionItem title={title} elements={elements}  anchoPagina={anchoPagina}/>
		</>
	);
};
export default Mark;
