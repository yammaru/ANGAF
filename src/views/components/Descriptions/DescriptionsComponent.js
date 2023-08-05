import React from "react";
import { Descriptions } from "antd";
import "../Price/Quotes/Components/availableProjects/availableProjects.scss";

const descriptionItemStyle = {
	border: "1px solid #f0f0f0",
    backgroundColor: "#fff"
};

const DescriptionsUtil = ({ dataLabel, data }) => {
	return (
		<Descriptions
           
			bordered
			title={false}
			size="small"
			column={1}
		>
			{dataLabel.map((element) => (
				<Descriptions.Item labelStyle={descriptionItemStyle} key={element.label} label={<strong>{element.label}</strong>}>
					{data[element.dbName]}
				</Descriptions.Item>
			))}
		</Descriptions>
	);
};

export default DescriptionsUtil;
