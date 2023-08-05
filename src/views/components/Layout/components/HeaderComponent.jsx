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
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col xs={4} sm={4} md={4} lg={6} xl={6}/>
				<Col
					xs={8}
					sm={8}
					md={8}
					lg={8}
					xl={8}
					className="gutter-row"
					style={{display: "inline-flex", alignItems: "center"}}
				>
				
				<>
						<Form.Item style={{width: "100%"}} name="headerSearchCustomer">
						<Select
							showSearch
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
							placeholder="Seleccione..."
							onChange={SetIdCustomer}
						>
							<Select.Option value="">Seleccionar</Select.Option>
							{options.length > 0 &&
							options.map((item) => (
								<Select.Option value={item.id}>{splitStringWhitUnderScore(item?.name)}</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item>
						<Link to={`/hombre`}>
							{" "}
							<Button
								disabled={!idCustomer}
								style={{marginLeft: 10}}
								type="primary"
							>
								Buscar
							</Button>{" "}
						</Link>
					</Form.Item>
				</>
				
				
				</Col>
				<Col className="gutter-row" span={8}>
					<div
						//className="confUser"
						alignitems={"center"}
						style={{float: "right"}}
					>
						<h6 className="p-3" style={{display: "inline"}}>
							{nameUser}
						</h6>
						<Popover
							placement="bottom"
							title={nameUser}
							content={content}
							trigger="click"
						>
							<Button
								shape="circle"
								icon={<UserOutlined style={{fontSize: 20}}/>}
							/>
						</Popover>
						{isLoggedIn && (
							<Button
								onClick={onLogout}
								style={{
									marginLeft: 5,
									marginRight: 10,
									background: "none",
									border: "none",
								}}
								shape="circle"
								icon={<PoweroffOutlined style={{fontSize: 20}}/>}
							/>
						)}
					</div>
				</Col>
			</Row>
		</Header>
	);
};
export default HeaderComponent;
