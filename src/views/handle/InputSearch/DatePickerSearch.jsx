import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DatePickerSearch = (props) => {
	const handleChange = (date, dateString) => {
		props.setDate(dateString);
	};
	return (
		<DatePicker
			defaultValue={moment()}
			onChange={handleChange}
			format={"YYYY-MM-DD"}
			style={{ width: "90%" }}
		/>
	);
};

export default DatePickerSearch;
