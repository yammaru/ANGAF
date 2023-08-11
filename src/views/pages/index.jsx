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
						<h2 style={{ color: "white" }}>hombre</h2>
					</a>
				</div>
				<div className="button">
					<a href="/mujer" target="_self">
						<h2 style={{ color: "white" }}>mujer</h2>
					</a>
				</div>
			</div>
			<Row className="images-container">
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img
						src={
							"https://b2cmattelsa.vtexassets.com/assets/vtex.file-manager-graphql/images/64dd62f9-f9b5-490b-9a1f-b4950d948075___6ea0eac9b8f28f17e21b74b4619c7e3f.jpg"
						}
						alt="Imagen 1"
						className="image"
					/>
				</Col>
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img
						src={
							"https://b2cmattelsa.vtexassets.com/assets/vtex.file-manager-graphql/images/385b0807-a249-4886-8a10-c752c9c180dc___5bfc4b7df59a2d14e22fe2d3e1652c18.jpg"
						}
						alt="Imagen 2"
						className="image"
					/>
				</Col>
				<Col style={{ width: "33%", overflow: "hidden" }}>
					<img
						src={
							"https://b2cmattelsa.vtexassets.com/assets/vtex.file-manager-graphql/images/e06d7c91-8540-448c-8fcd-7a76bcb78ee0___ca3fb1b33569816c1f5ea354baae80f8.jpg"
						}
						alt="Imagen 3"
						className="image"
					/>
				</Col>
			</Row>
			
		</>
	);
};

export default index;
