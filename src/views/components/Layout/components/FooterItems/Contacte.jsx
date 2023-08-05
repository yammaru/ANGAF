import React from "react";
import { Layout } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const Contacte = () => {
	let today = new Date(Date.now());

	return (
		<a
		class="vtex-rich-text-0-x-link vtex-rich-text-0-x-link--menu-item"
		href="https://api.whatsapp.com/send/?phone=573013095065&text&type=phone_number&app_absent=0"
		target="_blank"
	><WhatsAppOutlined />
		3013095065
	</a>
	);
};
export default Contacte;
