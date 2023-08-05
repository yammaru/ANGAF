import {connect} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {Button, Table, Tooltip} from "antd";
import Card from "../../components/Card/Card";
import * as constants from "../../../redux/constants";
import CustomerDelete from "./Componets/CustomerDelete";
import CustomersUpdate from "./Componets/CustomersUpdate";
import ReassignAdvisor from "./Componets/ReassignAdvisor";
import {CustomerProvider} from "./Componets/CustomerProvider";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min";
import CustomersRegistration from "./Componets/CustomersRegistration";
import {error, success} from "../../handle/Notification/Notification";
import {getFormatDate} from "../../handle/HandleDatePicker/HandleDate";
import {fetchAllAssessor} from "../../../redux/actions/Configuration/AssesorAction";
import {fetchAllOccupation} from "../../../redux/actions/Configuration/OccupationAction";
import {fetchAllRegisterType} from "../../../redux/actions/Configuration/RegisterTypeAction";
import { CheckOutlined, CloseOutlined, InfoOutlined, SearchOutlined } from "@ant-design/icons";
import { validateModule, validatePermission } from "../../handle/PermissionMethods/PermissionMethods";
import { fetchAllCustomer, updateStateCustomerById } from "../../../redux/actions/Customer/CustomerAction";
import {convertAllMapDataState, getColumnSearchProps, noWhiteWindow} from "../../handle/HandleFilterTable/handleFilterTable";

const Customers = ({
					   customer,
					   occupationData,
					   registerType,
					   dispatchFetchAllCustomerAction,
					   dispatchUpdateStateCustomerAction,
					   dispatchFetchAllOccupationAction,
					   dispatchFetchAllRegisterType,
					   assessorsData,
					   dispatchFetchAllAssessorAction,
				   }) => {
	useEffect(
		() => dispatchFetchAllCustomerAction(),
		[dispatchFetchAllCustomerAction]
	);
	useEffect(
		() => dispatchFetchAllOccupationAction(),
		[dispatchFetchAllOccupationAction]
	);
	useEffect(
		() => dispatchFetchAllRegisterType(),
		[dispatchFetchAllRegisterType]
	);
	useEffect(
		() => dispatchFetchAllAssessorAction(),
		[dispatchFetchAllAssessorAction]
	);

	useEffect(
		() => dispatchFetchAllCustomerAction(),
		[dispatchFetchAllCustomerAction]
	);
	useEffect(
		() => dispatchFetchAllOccupationAction(),
		[dispatchFetchAllOccupationAction]
	);
	useEffect(
		() => dispatchFetchAllRegisterType(),
		[dispatchFetchAllRegisterType]
	);
	useEffect(
		() => dispatchFetchAllAssessorAction(),
		[dispatchFetchAllAssessorAction]
	);

	const updateStateCustomer = (id) => {
		dispatchUpdateStateCustomerAction(id, (response) => {
			response.error ? error(response.message) : success("Estado Actualizado");
			dispatchFetchAllCustomerAction();
		});
	};
	

	const element = [];
	const customersTableModel = [];
	const assessors = [];
	const selectAsessorOptions = [];
	const occupations = [];
	const selectOccupationOptions = [];
	const registerTypes = [];
	const selectRegisterTypesOptions = [];

	for (const key in customer) {
		if (key === "_payload") {
			const customerData = customer[key];
			if (customerData !== null) {
				for (let index = 0; index < customerData.length; index++) {
					element.push(customerData[index]);
					addCustomerTableModel(customerData[index], index + 1);
				}
			}
		}
	}

	for (let key in occupationData) {
		if (key === "_payload") {
			let occupationsFill = occupationData[key];
			if (occupationsFill !== null) {
				for (let index = 0; index < occupationsFill.length; index++) {
					occupations.push(occupationsFill[index]);
				}
			}
		}
	}

	for (let i = 0; i < occupations.length; i++) {
		selectOccupationOptions.push(occupations[i]);
	}

	for (let key in registerType) {
		if (key === "_payload") {
			let registerTypeFill = registerType[key];
			if (registerTypeFill !== null) {
				for (let index = 0; index < registerTypeFill.length; index++) {
					registerTypes.push(registerTypeFill[index]);
				}
			}
		}
	}

	for (let i = 0; i < registerTypes.length; i++) {
		selectRegisterTypesOptions.push(registerTypes[i]);
	}

	for (let key in assessorsData) {
		if (key === "_payload") {
			let asessorsFill = assessorsData[key];
			for (let index = 0; index < asessorsFill.length; index++) {
				assessors.push(asessorsFill[index]);
			}
		}
	}

	for (let i = 0; i < assessors.length; i++) {
		selectAsessorOptions.push(assessors[i]);
	}

	const selectOptions = {
		selectOccupationOptions,
		selectRegisterTypesOptions,
	};

	function mapCustomer(customer, index) {
		return {
			id: customer.id,
			index: index,
			address: customer.address,
			identification: customer.identification,
			name: customer.name.replace("_", " "),
			phoneNumber: customer.phone_number,
			email: customer.email,
			habeasData: customer.has_habeas_data,
			state: customer.state,
			adviserName: customer.adviserName,
			updateAt: getFormatDate(customer.updated_at),
			createAt: getFormatDate(customer.created_at),
		};
	}

	function addCustomerTableModel(customer, index) {
		customersTableModel.push(mapCustomer(customer, index));
	}

	const getButtonStateCustomer = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					onClick={() => updateStateCustomer(id)}
					type="text"
					icon={
						<CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>
					}
				/>
			);
		} else {
			return (
				<Button
					size="small"
					onClick={() => updateStateCustomer(id)}
					type="text"
					icon={
						<CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>
					}
				/>
			);
		}
	};

	const getButtonHabeasData = (habeasData) => {
		if (habeasData) {
			return <CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>;
		} else {
			return <CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>;
		}
	};

	const searchCustomer = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return {
					selectOccupationOptions,
					selectRegisterTypesOptions,
					selectAsessorOptions,
					customer: element[index],
				};
			}
		}
	};

	const columns = [
		{
			title: "#",
			width: 9,
			dataIndex: "index",
			key: "index",
			sorter: (a, b) => a.index - b.index,
		},
		{
			title: "Nombre",
			width: 25,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow
		},
		{
			title: "Identificación",
			width: 15,
			dataIndex: "identification",
			key: "identification",
			...getColumnSearchProps("identificacion"),
		},
		{
			title: "Habeas Data",
			width: 14,
			dataIndex: "data",
			key: "data",
			align: "center",
			render: (_, record) => getButtonHabeasData(record.habeasData),
		},
		{
			title: "Teléfono",
			dataIndex: "phoneNumber",
			width: 15,
			key: "phone",
			...getColumnSearchProps("phone"),
		},
		{
			title: "Correo",
			dataIndex: "email",
			width: 30,
			key: "mail",
			...getColumnSearchProps("mail"),
		},
		{
			title: "Asesor",
			dataIndex: "adviserName",
			width: 20,
			key: "adviserName",
			...getColumnSearchProps("adviserName"),
			render: (adviserName) =>
				adviserName != null ? adviserName : "Asesor no asignado",
		},
		{
			title: "Activo",
			width: 11,
			dataIndex: "state",
			fixed: "right",
			key: "state",
			align: "center",
			render: (_, record) => getButtonStateCustomer(record.state, record.id),
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 21,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const getActions = (record) => {
		const text = (
			<span style={{color: "#6A6963"}}>
				{" "}
				{record.name}
				<hr/>
				Creado: {record.createAt} <br/> Modificado: {record.updateAt}{" "}
			</span>
		);
		const request = searchCustomer(record);
		return (
			<CustomerProvider request={searchCustomer(record)}>
				{validatePermission(constants.SHOW_CUSTOMERS_TRACKING_PERMISSION) ? (
					<Link to={`/customer/customer-tracking/${request.customer.id}`}>
						<Button
							size="small"
							icon={<SearchOutlined/>}
							type="ghost"
						/>
					</Link>
				) : null}
				{"  "}
				{validatePermission(constants.UPDATE_CUSTOMER_PERMISSION) ? (
					<CustomersUpdate/>
				) : null}
				{"  "}
				{validatePermission(constants.REASSIGN_ADVISOR_CUSTOMER_PERMISSION) ? (
					<ReassignAdvisor assessorsData={assessorsData}/>
				) : null}
				{"  "}
				{validatePermission(constants.DELETE_CUSTOMER_PERMISSION) ? (
					<CustomerDelete size="small" title="Cliente"/>
				) : null}
				{"  "}
				<Tooltip placement="left" color="#ffffff" title={text}>
					<Button size="small" type="primary" icon={<InfoOutlined/>}/>
				</Tooltip>
			</CustomerProvider>
		);
	};
	if (!validateModule(constants.CUSTOMER_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	return (
		<>
			<Card
				title="Lista de Clientes"
				drawer={
					<CustomerProvider request={selectOptions}>
						<CustomersRegistration/>
					</CustomerProvider>
				}
				table={
					<Table
						columns={columns}
						dataSource={convertAllMapDataState(customersTableModel)}
						scroll={{x: 1800, y: 300}}
						bordered={true}
					/>
				}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	customer: state.customer,
	registerType: state.registerType,
	occupationData: state.occupation,
	assessorsData: state.assessor,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchUpdateStateCustomerAction: (id, onSuccess, onError) =>
		dispatch(updateStateCustomerById(id, onSuccess, onError)),
	dispatchFetchAllCustomerAction: () => dispatch(fetchAllCustomer()),
	dispatchFetchAllOccupationAction: () => dispatch(fetchAllOccupation()),
	dispatchFetchAllRegisterType: () => dispatch(fetchAllRegisterType()),
	dispatchFetchAllAssessorAction: () => dispatch(fetchAllAssessor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
