import { Col, Row } from "antd";
import React from "react";

const DownFooter = () => {
	let today = new Date(Date.now());

	return (
		<Row justify="end" align="stretch">
			<Col style={{width:"70%"}}>© {today.getFullYear().toString()} 
			Términos y condiciones      |      Política de Privacidad      |      Superintendencia
			</Col>

			<Col>© {today.getFullYear().toString()} Anga Col. S.A.S.</Col>
		</Row>
	);
};
export default DownFooter;
