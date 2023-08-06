import {Layout} from "antd";
import "../css/layout.scss";
import {Link} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserOutlined, PoweroffOutlined} from "@ant-design/icons";
import {fetchAllCustomer} from "../../../../redux/actions/Customer/CustomerAction";
import { Row, Col, Button, Popover, Typography, Divider, Form, Select } from "antd";
import * as constants from "../../../../redux/constants";
import { validateModule } from "../../../handle/PermissionMethods/PermissionMethods";
import splitStringWhitUnderScore from "../../../handle/FormatterWords/formatterWords";
const {Text} = Typography;
const {Header} = Layout;

const HeaderComponent = ({isLoggedIn, onLogout, nameUser, profile}) => {
	const dispatch = useDispatch();
	const [options, setOptions] = useState([]);
	const [idCustomer, SetIdCustomer] = useState(null);

	const objectCustomerResponse = useSelector((state) => state?.customer);

	useEffect(() => {
		dispatch(fetchAllCustomer());
	}, [dispatch]);
	useEffect(() => {
		if (Array.isArray(objectCustomerResponse._payload)) {
			if (objectCustomerResponse.message !== null) {
				setOptions([]);
			} else {
				setOptions(objectCustomerResponse._payload);
			}
		}
	}, [objectCustomerResponse]);

	const content = (
		<div>
			<Text type="secondary">{profile}</Text>
			<Divider style={{marginTop: "10px", marginBottom: "10px"}}/>
			<ChangePassword/>
		</div>
	);

	return (
		<Header
			className="header"
			theme="light"
			style={{position: "fixed", zIndex: 102, width: "100%", marginLeft: 80}}
		>
			
		</Header>
	);
};
export default HeaderComponent;
