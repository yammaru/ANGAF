import { Button, Col, Image, Row } from "antd";
import React, { Fragment, useState } from "react";
import logo from "../../includes/images/fondo.png";
import { colors } from "@material-ui/core";

const index = () => {
	return (
		<>
			<div className="fullscreen-image"></div>
			<div className="button-container">
				<div className="button">
					<a href="/hombre" target="_self">
						<h2 style={{color:"white"}}>hombre</h2>
					</a>
				</div>
				<div className="button">
					<a href="/mujer" target="_self">
						<h2 style={{color:"white"}}>mujer</h2>
					</a>
				</div>
			</div>
			<Row className="images-container">
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img src={logo} alt="Imagen 1" className="image" />
				</Col>
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img src={logo} alt="Imagen 2" className="image" />
				</Col>
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img src={logo} alt="Imagen 3" className="image" />
				</Col>
			</Row>
		</>
	);
};

export default index;
