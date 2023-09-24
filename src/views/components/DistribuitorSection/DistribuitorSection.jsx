import { Card, Col, Divider, Image, Radio, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useWindowWidth } from "../../handle/size/size";
import {
	DribbbleOutlined,
	IeOutlined,
	InstagramOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const DistribuitorSection = () => {
	const elements = {
		nacionales: [
			{
				title: "Colombia",
				dis: [
					{
						id: 13,
						name: "lobo1",
						city: "5524",
						socialpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",

						webpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					},
					{
						id: 1,
						name: "lob",
						city: "5524",
						socialpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",

						webpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					},
				],
			},
		],
		extranjeros: [
			{
				title: "lalala",
				dis: [
					{
						id: 3,
						name: "lobo2",
						city: "5524",
						socialpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",

						webpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					},
				],
			},
			{
				title: "EEUU",
				dis: [
					{
						id: 3,
						name: "lobo2",
						city: "5524",
						socialpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",

						webpath:
							"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
					},
				],
			},
		],
	};
	function obtenerDatosPorClave(objeto, clave) {
		if (clave in objeto) {
			return objeto[clave];
		} else {
			return null; // O cualquier otro valor que desees devolver si la clave no existe
		}
	}
	// Puedes usar cualquier clave aquí

	const [mode, setMode] = useState(Object.keys(elements)[0]);
	const handleModeChange = (e) => {
		setMode(e.target.value);
	};
	const datos = obtenerDatosPorClave(elements, mode);

	if (datos !== null) {
		console.log(`Los datos para la clave "${mode}" son:`, datos);
	} else {
		console.log(`La clave "${mode}" no existe en el objeto.`);
	}
	const anchoPagina = useWindowWidth(useState, useEffect);
    const infoList=<div
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "10px",
        transition: "background-color 0.3s",
        height: "100%",
        width: "100%",
    }}
>
    <h3
        style={{
            mixBlendMode: "difference",
            color: "white",
        }}
    >
        <b>{mode.toUpperCase()}</b>
    </h3>

    {datos.map((element) => (
        <>
            <Divider
                style={{ visibility: "hidden" }}
            />
            <h3
                style={{
                    mixBlendMode: "difference",
                    color: "white",
                }}
            >
                {element.title}
            </h3>
            {element.dis.map((x) => (
                <>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%",
                            gap: "5px",
                            justifyContent:
                                "center",
                        }}
                    >
                        <h5
                            style={{
                                mixBlendMode:
                                    "difference",
                                color: "white",
                            }}
                        >
                            {x.name.toUpperCase()}
                        </h5>
                        -
                        <h5
                            style={{
                                mixBlendMode:
                                    "difference",
                                color: "white",
                            }}
                        >
                            {x.city.toUpperCase()}
                        </h5>
                        -
                        <a
                            style={{
                                mixBlendMode:
                                    "difference",
                                color: "white",
                            }}
                            href={x.webpath}
                            target="_blank"
                        >
                            <IeOutlined />
                        </a>
                        -
                        <a
                        style={{
                            mixBlendMode:
                                "difference",
                            color: "white",
                        }}
                            href={x.socialpath}
                            target="_blank"
                        >
                            <InstagramOutlined />
                        </a>
                    </span>
                </>
            ))}
            <Divider
                style={{
                    visibility: "hidden",
                }}
            />
        </>
    ))}
</div>
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<Divider style={{ visibility: "hidden" }} />
			<Row justify={"center"}>
				<h1>DISTRIBUIDORES</h1>
			</Row>
			<Divider style={{ visibility: "hidden" }} />
			<Row style={{ width: "100vw", height: "100vh" }}>
				<Col xs={24} sm={12}>
					{/*<Image
						width={"100%"}
						height={anchoPagina < 576 ? "100vh" : "auto"}
						src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
					/>*/}
					<div
						style={{
							width: "100%",
							//	background: `url(${element.path[1]})`,
							background: `url(${"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"})`,
							height: anchoPagina < 576 ? "100vh" : "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							overflow: "auto",
						}}
						className=" ki"
					>
						{anchoPagina < 576 ? (
							infoList
						) : null}
					</div>
				</Col>
				{anchoPagina >= 576 ? (
					<Col xs={12} sm={12}>
						{infoList}
					</Col>
				) : null}
			</Row>
			<Row className="center">
				<Radio.Group onChange={handleModeChange} value={mode}>
					{Object.keys(elements).map((element) => (
						<Radio.Button
							style={{ margin: "transparent" }}
							value={element}
						>
							{element.toUpperCase()}
						</Radio.Button>
					))}
				</Radio.Group>
			</Row>
		</>
	);
};
export default DistribuitorSection;
//[0]
