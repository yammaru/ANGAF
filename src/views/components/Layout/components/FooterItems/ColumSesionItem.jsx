import React from "react";
import { Collapse, Layout, Row, Typography } from "antd";
import { CaretRightOutlined, WhatsAppOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link, Title } = Typography;
const { Panel } = Collapse;
const ColumSesionItem = ({ elements, title, anchoPagina }) => {
	return anchoPagina >= 766 ? (
		<>
			<Row>
				<strong style={{ padding: "5px" }}>{title}</strong>
			</Row>
			{elements?.map((element) => (
				<Row>
					<a
						className="footer-anga"
						href={element.path}
						target="_blank"
						style={{
							display: "flex",
							alignItems: "center",
							gap: "5px",
							padding: "5px",
						}}
					>
						{element.icon !== "" ? element.icon : <></>}

						{element.title}
					</a>
					<br />
				</Row>
			))}
		</>
	) : (
		<Row style={{display:"block"}}>
			<Collapse
				accordion
				expandIcon={({ isActive }) => (
					<CaretRightOutlined style={{display:"none"}} rotate={isActive ? 90 : 0} />
				)}
			>
				<Panel header={<h6 style={{color:"#484848",}}><strong>{title}</strong></h6>} >
					{elements?.map((element) => (
						<Row>
							<a
								className="footer-anga"
								href={element.path}
								target="_blank"
								style={{
									display: "flex",
									alignItems: "center",
									gap: "5px",
									padding: "5px",
								}}
							>
								{element.icon !== "" ? element.icon : <></>}

								{element.title}
							</a>
							<br />
						</Row>
					))}
				</Panel>
			</Collapse>
		</Row>
	);
};
export default ColumSesionItem;
