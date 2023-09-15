import { Button, Col, Image, Row } from "antd";
import React, { Fragment, useState } from "react";
import logo from "../../includes/images/fondo.png";
import { colors } from "@material-ui/core";

const index = () => {
	const fondo =
		"https://th.bing.com/th/id/R.b8e8ecb071ad5ae5f194d440bcfbffa5?rik=%2f96u1oRW%2fDAcZg&pid=ImgRaw&r=0";
	const elements = [
		{
			href: "/mujer",
			src: "https://th.bing.com/th/id/OIP.jp2BPgOGgoRP2fyEenEAOgHaJ2?pid=ImgDet&w=600&h=798&rs=1",
		},
		{
			href: "/mujer",
			src: "https://http2.mlstatic.com/catalogo-de-ropa-moda-para-mujer-envio-gratis-D_NQ_NP_625214-MLM25772144672_072017-F.jpg",
		},
		{
			href: "/mujer",
			src: "https://sheideas.com/wp-content/uploads/2016/02/Stylish-Long-Sleeve-Short-Prom-Dresses-2016.jpg",
		},
	];
	return (
		<>
			<div
				className="fullscreen-image"
				style={{ backgroundImage: `url("${fondo}")` }}
			></div>
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
			<div
				style={{
					gap: "20%",

					position: "absolute",
					top: "70%",
					left: "45%",
				}}
			>
				<div className="button">
					<a href="/kids" target="_self">
						<h2 style={{ color: "white" }}>Kids</h2>
					</a>
				</div>
			</div>

			<Row className="images-container">
				{elements.map((x, index) => (
					<Col style={{ width: "33%", overflow: "hidden" }}>
						<a href={x.href} target="_self">
							<img
								src={x.src}
								alt={"Imagen " + index}
								className="image"
							/>
						</a>
					</Col>
				))}
			</Row>
		</>
	);
};

export default index;
