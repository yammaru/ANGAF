import React from "react";
import { Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const ColumSesionItem = ({ elements, title }) => {
	return (
		<>
        <Row>
				<strong style={{padding:"5px"}}>{title}</strong>
			</Row>
			{elements?.map((element) => (
				<Row>
					<a className="footer-anga"
						href={element.path}
						target="_blank"
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
                            padding: "5px"
						}}
					>
					{element.icon!==""?element.icon:<></>}

						{element.title}
					</a>
					<br />
				</Row>
			))}
		</>
	);
};
export default ColumSesionItem;
