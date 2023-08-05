import { Select, Form } from "antd";
import React from "react";

const DatabaseSelect = ({dataToMap, label, isRequired, labelFormItem, nameFormItem, setSelectedAssessor = null,}) => {
	return (
		<Form.Item
			label={labelFormItem}
			name={nameFormItem}
			rules={[
				{
					required: isRequired,
					message: "El campo es requerido.",
				},
			]}
		>
			<Select
				showSearch
				style={{ width: "100%" }}
				optionFilterProp="children"
				onChange={(_, option) => {
					setSelectedAssessor(option);
				}}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				<Select.Option value="">Seleccionar</Select.Option>
				{dataToMap.map((item, index) => (
					<Select.Option key={index} value={item.id}>
						{`${item[label]} - CC: (${item.identification})`} {
							item.state ? '' : <span style={{
								color: 'red',
							}}>
							(Inactivo)
							</span>
						}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default DatabaseSelect;
