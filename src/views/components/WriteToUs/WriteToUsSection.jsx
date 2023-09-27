import { Divider, Radio, Row, Space, Tabs } from "antd";
import { useState } from "react";

const WriteToUsSection = () => {
	const element = [
		{
			label: `Términos y Restricciones`,
			key: 1,
			//children: <TermsAndConditionsItem />,
		},
		{
			label: `Política de confidencialidad`,
			key: 2,
			//	children: <PrivacyPolicyItem />,
		},
		{
			label: `Envíos`,
			key: 3,
			//  children: <ShippingItem />
		},
		{
			label: `Cambios y devoluciones`,
			key: 4,
			//	children: <ReturnsAndWarrantyItem />,
		},
		{
			label: `Preguntas Frecuentes`,
			key: 5, // children: <FAQItem />
		},
	];
	return (
		<>
			<Divider style={{ paddingBottom: "10%" }} />
			<Row justify={"start"}>
				<Tabs type="card" tabPosition={"left"} items={element} />
			</Row>
			<Divider style={{ paddingBottom: "2%", visibility: "hidden" }} />
		</>
	);
};
export default WriteToUsSection;
