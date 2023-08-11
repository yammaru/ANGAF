import { Col, Row } from "antd";
import React from "react";

const DownFooter = () => {
	let today = new Date(Date.now());

	return (
		<Row justify="end" align="stretch">
			<Col style={{width:"70%"}}>
			<a>Términos y condiciones </a>     |   <a>Política de Privacidad </a>        |    <a href="https://www.sic.gov.co/" target="_blank">Superintendencia</a>  
			</Col>

			<Col  style={{display:"flex",alignItems:"flex-end"}}>© {today.getFullYear().toString()} Anga Col.</Col>
		</Row>
	);
};
export default DownFooter;
