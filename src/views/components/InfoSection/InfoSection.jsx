import { Divider, Radio, Row, Space, Tabs } from "antd";
import { useEffect, useState } from "react";
import ShippingItem from "./tabsItems/ShippingItem";
import ReturnsAndWarrantyItem from "./tabsItems/ReturnsAndWarrantyItem";
import PrivacyPolicyItem from "./tabsItems/PrivacyPolicyItem";
import TermsAndConditionsItem from "./tabsItems/TermsAndConditionsItem";
import FAQItem from "./tabsItems/FAQItem";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useWindowWidth } from "../../handle/size/size";
import InfoMovil from "./InfoMovil/InfoMovil";

const InfoSection = () => {
	const [tabPosition, setTabPosition] = useState("left");
	const changeTabPosition = (e) => {
		setTabPosition(e.target.value);
	};
    const { id } = useParams();
    console.log(id);
    const anchoPagina = useWindowWidth(useState, useEffect);
	const element = [
		{
			label: `Términos y restricciones`,
			key: "terminos",
			children: <TermsAndConditionsItem />,
		},
		{
			label: `Política de confidencialidad`,
			key: "politicas",
			children: <PrivacyPolicyItem />,
		},
		{ label: `Envíos`, key: "envios", children: <ShippingItem /> },
		{
			label: `Cambios, garantías y devoluciones`,
			key: "cambios",
			children: <ReturnsAndWarrantyItem />,
		},
		{ label: `Preguntas Frecuentes`, key: "faq", children: <FAQItem /> },
	];
	return (
		<>
			<Divider style={{ paddingBottom: anchoPagina<=766?"10%":"2%" }} />
			<Row justify={anchoPagina<=766?"center":"start"}>
			{anchoPagina<=766?<InfoMovil id={id} element={element}/>:<Tabs defaultActiveKey={id} type="card" tabPosition={"left"} items={element} />}	
			</Row>
			<Divider style={{ paddingBottom: "2%", visibility: "hidden" }} />
		</>
	);
};
export default InfoSection;
