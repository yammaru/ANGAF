import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Typography } from "antd";
import { useState } from "react";

const { Title, Text, Link } = Typography;
const PanelPrincipal = ({how,whoIsSet,howSet}) => {

    const onclickGoBack = () => {
		whoIsSet("I");
	};
    const onclickGoMail = () => {
		whoIsSet("M");
        howSet("BG");
	};
	return (
		<>
			<Col
				style={{
					paddingTop: "20%",
				}}
			>
				<Title level={5}>
				{how=="BG"?<LeftOutlined onClick={onclickGoBack} />:null} Iniciar sesión
				</Title>
				<Text>Ingresa con email y contraseña</Text>
			</Col>
			<Col
				style={{
					width: "95%",
					paddingTop: "2%",
				}}
			>
				<Input width={"100%"} placeholder="ejemplo@example.com"></Input>
			</Col>
			<Col
				style={{
					width: "95%",
					paddingTop: "2%",
				}}
			>
				<Input.Password placeholder="Constraseña" visible={false}></Input.Password>
			</Col>
			<Col
				style={{
					width: "95%",
					paddingTop: "2%",
                    display:"flex",
                    justifyContent:"flex-end"
				}}
			>
				<a className="footer-anga" onClick={onclickGoMail} >Olvidé mi contraseña</a>
			</Col>
			<Col
				style={{
					width: "95%",
					paddingTop: "2%",
                    display:"flex",
                    justifyContent:"flex-end"
				}}
			>
				<a className="footer-anga" onClick={onclickGoMail} >Registrarme</a>
			</Col>
			<Col
				style={{
					width: "95%",
					paddingTop: "2%",
				}}
			>
				<Button
					style={{
						backgroundColor: "#484848",
						borderColor: "#484848",
                        height:"50px",
					}}
					type="primary"
					block
				>
					INGRESAR
				</Button>
			</Col>
		</>
	);
};
export default PanelPrincipal;
