import React, { useState } from "react";
import {  Select } from "antd";


const SelectSearch = (props) => {
	return (
		<Select
			loading={props.data.length === 0}
			onChange={props.onChange}
			defaultValue=""
            style={{ width: "90%" }}
		>
			<Select.Option value="">Seleccione...</Select.Option>
			{props.data?.map((value) => {
				return (
					<Select.Option key={value.name} value={value.id}>
						{value.name}
					</Select.Option>
				);
			})}
		</Select>
	);
};

export default SelectSearch;
