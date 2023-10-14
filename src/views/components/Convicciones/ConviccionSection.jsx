import React, { useEffect, useState } from "react";
import { Card, Divider, Layout, Row, Typography } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import { useWindowWidth } from "../../handle/size/size";

const { Text, Link, Title } = Typography;
const ConviccionSection = () => {
	const title = "QUIÉNES SOMOS";
	const anchoPagina = useWindowWidth(useState, useEffect);
	return (
		<>
			<Card style={{ border: "transparent" }}>
				<>
			
					<h4>Valores</h4> <br />
					<b>Sostenibilidad:</b>
					<br /> En ANGA nos comprometemos a producir nuestras prendas
					de manera sostenible y responsable con el medio ambiente.
					<br />
					<b>Ética:</b>
					<br />
					Nos aseguramos de trabajar con proveedores éticos y de
					mantener una cultura de trabajo ética y transparente.
					<br />
					<b>Calidad:</b>
					<br />
					Nos esforzamos por producir prendas de alta calidad y
					ofrecer un servicio excepcional a nuestros clientes.
					<br />
					<b>Innovación:</b>
					<br />
					Buscamos constantemente nuevas formas de innovar y visionar
					nuevas estrategias y el uso de materiales sostenibles.
					<br />
					<b>objetivos:</b>
					<br />
					Convertirnos en una marca lider a nivel nacional e
					internacional en el mercado de la moda, extendiendo nuestras
					operaciones a diferentes ciudades del pais proporcionando un
					servicio de excelencia y calidad en cada uno de nuestros
					productos y lo mas importante generando una identidad en
					todos nuestros consumidores
					<br />
					-Aumentar el volumen de ventas mayoristas en un 80%,
					optimizando y automatizando la atencion al cliente y el
					servicio posventa con el fin de gererar confianza y
					fidelizacion de clientes.<br/> -Crear un equipo de ventas y
					marketing lead que conozcan muy bien nuestra filosofía de
					marca.
					<br />
					<b>Quiénes somos:</b>
					<br />
					•Somos un equipo de profesionales apasionados por un estilo
					sostenible y la responsabilidad social empresarial. Estamos
					comprometidos con producir prendas de alta calidad de manera
					sostenible y ética, y ofrecer un servicio excepcional a
					nuestros clientes.
					<br />
					<b>Visión:</b>
					<br />
					"Enfocados en un objetivo claro, nos convertiremos en la
					primera tienda Streetwear en el Cesar. Manteniendo una
					identidad única y auténtica, transmitiremos nuestra pasión.
					<br />
					Nuestro propósito es demostrar que en el Cesar - Colombia,
					existe un talento y creatividad excepcionales para el estilo
					"Streetwear".
					<br />
					Ambicionamos llevar a ANGA a unos de los países más
					apasionados por el Streetwear, como México y Estados Unidos.
					Lo haremos a través de distribuidores aliados en puntos
					físicos, expandiendo nuestra presencia y compartiendo
					nuestra visión."
				</>
			</Card>
		</>
	);
};
export default ConviccionSection;
