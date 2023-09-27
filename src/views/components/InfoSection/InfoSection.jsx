import { Divider, Radio, Row, Space, Tabs } from "antd";
import { useState } from "react";
import ShippingItem from "./tabsItems/TermsAndConditionsItem";
import ReturnsAndWarrantyItem from "./tabsItems/ReturnsAndWarrantyItem";
import PrivacyPolicyItem from "./tabsItems/PrivacyPolicyItem";
import TermsAndConditionsItem from "./tabsItems/TermsAndConditionsItem";
import FAQItem from "./tabsItems/FAQItem";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const InfoSection = () => {
	const [tabPosition, setTabPosition] = useState("left");
	const changeTabPosition = (e) => {
		setTabPosition(e.target.value);
	};
    const { id } = useParams();
    console.log(id);
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
			<Divider style={{ paddingBottom: "10%" }} />
			<Row justify={"start"}>
				<Tabs defaultActiveKey={id} type="card" tabPosition={"left"} items={element} />
			</Row>
			<Divider style={{ paddingBottom: "2%", visibility: "hidden" }} />
		</>
	);
};
export default InfoSection;
