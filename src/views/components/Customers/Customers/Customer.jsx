import Card from "../../Card/Card";
import {Link} from "react-router-dom";
import {Button, Table, Tooltip} from "antd";
import Remove from "./Componets/Remove/Remove";
import React, {useEffect, useState} from "react";
import Upgrade from "./Componets/Upgrade/Upgrade";
import {useDispatch, useSelector} from "react-redux";
import Register from "./Componets/toRegister/Register";
import * as constants from "../../../../redux/constants";
import {CustomerProvider} from "../Componets/CustomerProvider";
import AssignAdvisor from "./Componets/AssignAdvisor/AssignAdvisor";
import {error, errorGlobal, success} from "../../../handle/Notification/Notification";
import {fetchAllAssessor} from "../../../../redux/actions/Configuration/AssesorAction";
import {validatePermission} from "../../../handle/PermissionMethods/PermissionMethods";
import {getAgeOfDate, getFormatDate} from "../../../handle/HandleDatePicker/HandleDate";
import {getColumnSearchProps, noWhiteWindow} from "../../../handle/HandleFilterTable/handleFilterTable";
import {CheckOutlined, CloseOutlined, InfoOutlined, SearchOutlined} from "@ant-design/icons";
import {fetchAllCustomer, updateStateCustomerById} from "../../../../redux/actions/Customer/CustomerAction";
import Spinner from "../../../handle/Spinner/Spinner";

const Customer = () => {

	const dispatch = useDispatch()
	const [advisors,setAdvisors] = useState([])
	const customers = useSelector((state)=> state?.customer._payload)
	const [loading, setLoading] = useState(true);
	
	useEffect(()=>{
		dispatch(fetchAllCustomer())
		dispatch(fetchAllAssessor(async (response)=>{
			const res = await response
			if (res.error){
				errorGlobal(res.message)
			}else {
				let tem = []
				res._payload.forEach((item)=>{
					tem.push({
						id: item.id,
						name: item.name,
						state:item.state
					})
				})
				setAdvisors(tem)
			}				setLoading(false);
		}))
	},[])
	
	const element = []
	const customersTableModel = []
	const selectAsessorOptions = []
	const selectOccupationOptions = []
	const selectRegisterTypesOptions = []
	const setCustomers = () => {
		if (customers){
			customers.forEach((element,index)=>{
				addCustomerTableModel(element,index +1)
			})
		}
	}
	function addCustomerTableModel(customer, index) {
		customersTableModel.push(mapCustomer(customer, index))
	}
	function mapCustomer(customer, index) {
		return {
			id: customer.id,
			index: index,
			address: customer.address,
			identification: customer.identification,
			identificationType: parseInt(customer.identification_type),
			name: customer.name.replace("_", " "),
			fullName: customer.original_name,
			phoneNumber: customer.phone_number,
			email: customer.email,
			habeasData: customer.has_habeas_data,
			state: customer.state,
			adviserName: customer.adviserName,
			occupation: customer.occupation_id,
			age: getAgeOfDate(customer.birthday),
			birthday: customer.birthday,
			sons: customer.children_number ? parseInt(customer.children_number) : 0,
			typeRegister: customer.register_type_id,
			gender: customer.gender,
			
			updateAt: getFormatDate(customer.updated_at),
			createAt: getFormatDate(customer.created_at),
		}
	}
	const getButtonStateCustomer = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					type="text"
					onClick={() => updateStateCustomer(id)}
					icon={
						<CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>
					}
				/>
			)
		} else {
			return (
				<Button
					size="small"
					type="text"
					onClick={() => updateStateCustomer(id)}
					icon={
						<CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>
					}
				/>
			)
		}
	}
	const updateStateCustomer = (id) => {
		dispatch(
			updateStateCustomerById(id,async (response)=>{
				const res = await response
				if (res.error){
					error(res.message)
				}else {
					success(res.message)
				}
				dispatch(fetchAllCustomer())
			})
		)
	}
	const getButtonHabeasData = (habeasData) => {
		if (habeasData) {
			return <CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>
		} else {
			return <CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>
		}
	}
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
		
		},
		{
			title: "Habeas Data",
			width: 14,
			dataIndex: "data",
			key: "data",
			align: "center",
			render: (_, record) => getButtonHabeasData(record.habeasData)
		},
		{
			title: "Teléfono",
			dataIndex: "phoneNumber",
			width: 15,
			key: "phoneNumber",
		
		},
		{
			title: "Correo",
			dataIndex: "email",
			width: 30,
			key: "email",
		},
		{
			title: "Asesor",
			dataIndex: "adviserName",
			width: 20,
			key: "adviserName",
			render: (adviserName) => adviserName != null ? adviserName : "Asesor no asignado"
		},
		{
			title: "Activo",
			width: 11,
			dataIndex: "state",
			fixed: "right",
			key: "state",
			align: "center",
			render: (_, record) => getButtonStateCustomer(record.state, record.id)
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 21,
			fixed: "right",
			render: (_,record) => getActions(record)
		}
	]
	const getActions = (record) => {
		const text = (
			<span style={{color: "#6A6963"}} >
				{" "}
				{record.name}
				<hr/>
				Creado: {record.createAt}<br/> Modificado: {record.updateAt}{" "}
			</span>
		)
		return (
			<CustomerProvider request={searchCustomer(record)}>
				{
					validatePermission(constants.SHOW_CUSTOMERS_TRACKING_PERMISSION) ? (
							<Link to={`/customer/customer-tracking/${record.id}`}>
								<Button
									size="small"
									type="ghost"
									icon={<SearchOutlined/>}
								/>
							</Link>
					) : null
				}
				{"  "}
				{
					validatePermission(constants.UPDATE_CUSTOMER_PERMISSION) 
						? (<Upgrade customer={record} />)
						: null
				}
				{"  "}
				{
					validatePermission(constants.REASSIGN_ADVISOR_CUSTOMER_PERMISSION)
						? ( <AssignAdvisor adviserName={record.adviserName} id={record.id} advisors={advisors} /> )
						: null
				}
				{"  "}
				{
					validatePermission(constants.DELETE_CUSTOMER_PERMISSION)
						? ( <Remove id={record.id} /> )
						: null
				}
				{"  "}
				<Tooltip placement="left" color="#ffffff" title={text}>
					<Button size="small" type="primary" icon={<InfoOutlined/>}/>
				</Tooltip>
			</CustomerProvider>
		)
	}
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
	}
	setCustomers()
	return (
		<>
			<Card
				title="Lista de Clientes"
				drawer={
					<CustomerProvider>
						<Register/>
					</CustomerProvider>
				}
				table={[
					<>{loading ? <Spinner/> :
					<Table
						columns={columns}
						dataSource={customersTableModel}
						scroll={{x: 1150, y: 300}}
						bordered={true}
					/>}</>]
				}
			/>
		</>
	)
}

export default Customer