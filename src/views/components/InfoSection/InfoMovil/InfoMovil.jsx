import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Radio, Row, Space, Tabs } from "antd";
import { useEffect, useState } from "react";

const InfoMovil = ({
	id,
	terminos,
	faq,
	cambios,
	envios,
	politicas,
	element,
}) => {
	const [tabPosition, setTabPosition] = useState("left");
	const [arrowState, setArrowState] = useState(true);
    const [palabreo, setPalabreo] = useState( element.filter((x) => (x.key==id))[0].children);

    const selectorPolityc=(data)=>{
        console.log(data);
        setPalabreo(data)
        setArrowState(true);
    }
	const changeArrowState = () => {
        
		setArrowState(arrowState==true?false:true);
	};
	console.log(id,arrowState,palabreo,element.filter((x) => (x.key==id))[0].children);

	return (
		<Card
			style={{ width: "90%", borderRadius: "5%" }}
			headStyle={{
				color: "#fff",
				background: "#484848",
				borderTopLeftRadius: "15px",
				borderTopRightRadius: "15px",
			}}
			title={
				arrowState ? (
					false
				) : (
					<h1
						style={{
							color: "white",
							textAlign: "center",
						}}
					>
						Infomation
					</h1>
				)
			}
		>
			<Button
				style={{
					display: arrowState ? "flex" : "none",
					padding: 0,
					alignItems: "center",
					justifyContent: "center",
				}}
				block
				icon={<ArrowLeftOutlined />}
				onClick={changeArrowState}
			>
				Volver al Menu
			</Button>
			{arrowState
				?palabreo
				: element.map((x) => (
						<Button
							style={{
								display: "flex",
								padding: 0,
								alignItems: "center",
								justifyContent: "space-between",
								border: "transparent",
								flexDirection: "row-reverse",
								width: "100%",
							}}
							block
							icon={<ArrowRightOutlined />}
                            onClick={()=>selectorPolityc(x.children)}
						>
							{x.label}
						</Button>
				  ))}
		</Card>
	);
};
export default InfoMovil;
