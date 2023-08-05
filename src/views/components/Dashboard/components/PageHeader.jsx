import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { PageHeader, Button, Row, Col } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import * as constants from "../../../../redux/constants";
import CustomersRegistration from '../../Customers/Componets/CustomersRegistration';
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { Hidden } from "@material-ui/core";

const PageHeaderComponent = (props) => {
	return (
		<Fragment>
			<PageHeader
				style={{ border: "1px solid rgb(235, 237, 240)" }}
				title={props.name}
				extra={[<>


					<Row key={props.name + Math.random()}
						style={{
							display: "flex",
							justifyContent: "flex-end",
							

						}}
					>


						<Col key={props.name + Math.random()}>
							{
								validatePermission(constants.CREATE_CUSTOMER_PERMISSION) ? (
									<Link to='/customer/client'>
										<CustomersRegistration visible={false} textButton='Nuevo Cliente' />
									</Link>
								) : null
							}
						</Col>
						<Col style={{ visibility: "Hidden" }}>
							{validatePermission(constants.CREATE_CUSTOMER_PERMISSION) ? "no" : null}
						</Col>
						<Col key={props.name + Math.random()} >
							{
								validatePermission(constants.CREATE_QUOTATION_PERMISSION) ? (
									<Link to='/sales/new-quotes'>
										<Button key={props.name + Math.random()}
											style={{
												background: '#1890ff',
												color: '#fff',
												display: "flex",
												justifyContent: "center",
												alignItems: "center"
											
											}}
											icon={<FileTextOutlined />}
										>
											Nueva Cotización
										</Button>
									</Link>
								) : null
							}
						</Col>
					</Row>

				</>
				]}
			>

			</PageHeader>
		</Fragment>
	);
};

export default PageHeaderComponent;
