import { Col, Row } from "antd";
import React from "react";

const DownFooter = () => {
	let today = new Date(Date.now());

	return (
		<Row style={{width:"100%"}} justify="end" align="stretch">
			<Col style={{  }}>
				<a href="/info/terminos"
					style={{ color: "#484848" }}
					target="_blank">Términos y restricciones </a> | <a
					href="/info/politicas"
					style={{ color: "#484848" }}
					target="_blank">Política de confidencialidad </a>{" "}
				|{" "}
				<a
					href="https://www.sic.gov.co/"
					style={{ color: "#484848" }}
					target="_blank"
				>
					Superintendencia
				</a>
			</Col>

			<Col style={{width: "30%", display: "flex", alignItems: "flex-end",justifyContent: "flex-end" }}>
				© {today.getFullYear().toString()} Anga Col.
			</Col>
		</Row>
	);
};
export default DownFooter;
