import Card from "../../Card/Card"
import {Button, Table, Tooltip} from "antd"
import React, { useEffect, useState } from 'react'
import * as constants from "../../../../redux/constants"
import RegisterTypeUpdate from "./components/RegisterTypeUpdate"
import RegisterTypeDelete from "./components/RegisterTypeDelete"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import RegisterTypeRegister from "./components/RegisterTypeRegister"
import { RegisterTypeProvider } from "./components/RegisterTypeProvider"
import { CheckOutlined, CloseOutlined, InfoOutlined } from "@ant-design/icons"
import { errorGlobal, success, warning } from "../../../handle/Notification/Notification"
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods"
import { fetchAllRegisterType,createRegisterType,updateStateRegisterTypeById } from "../../../../redux/actions/Configuration/RegisterTypeAction"
import InputSearch from "../../../handle/InputSearch/InputSerch"
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch"

const RegisterTypeComponent = () => {
	const registerType = useSelector((state)=> state?.registerType,shallowEqual)
	const [tableData, setTableData] = useState([]);
	const [filteredData, setFilteredData] = useState(registerType?._playload);
	const dispatch = useDispatch();
	useEffect(()=>{
		data()
	},[registerType])
	const searchRecords = () => {
		dispatch(fetchAllRegisterType())
	}
	const saveRecords = (registerType) => {
		dispatch(
			createRegisterType(registerType,(response)=> {
				if (response.error){
					errorGlobal('¡UPS! Ocurió un error mientras se registraba')
				} else {
					success(response.message)
					searchRecords()
				}
			})
		)
	}
	const updateStateRegisterType = (id) => {
		validatePermission(constants.UPDATE_RECORD_TYPE_PERMISSION) ? 
		dispatch(
			updateStateRegisterTypeById(id,(response)=>{
				if (response.error){
					errorGlobal(response.message)
				}else {
					success(response.message)
					searchRecords()
				}
			})
		):warning("no posee el permiso para cambiar este estado")
	}
	useEffect(()=>{
		searchRecords()
	},[])
	const formatDate = (date) => {
		const formatDate = Date.parse(date)
		let dt = new Date(formatDate)
		dt = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()
		return dt
	}
	const data = () => {
		let element = [];
		for (const key in registerType) {
			if (key === "_payload") {
				const register = registerType[key];
				if (register !== null) {
					for (let index = 0; index < register.length; index++) {
						element.push(register[index])
					}
				}
			}
		}
		setTableData(element)
	}
	const getButtonStateRegisterType = (state, id) => {
		if (state) {
			return <Button size="small" onClick={() => updateStateRegisterType(id)} type='text'
						   icon={<CheckOutlined style={{fontSize: '18px', color: '#0D6B04'}}/>}/>
		} else {
			return <Button size="small" onClick={() => updateStateRegisterType(id)} type='text'
						   icon={<CloseOutlined style={{fontSize: '18px', color: '#f5222d'}}/>}/>
		}
	}
	const searchRegister = (record) => {
		for (let index = 0; index < tableData.length; index++) {
			if (tableData[index].id === record.id) {
				return tableData[index]
			}
		}
	}
	const getActions = (record) => {
		const createdAt = formatDate(record.created_at)
		const updatedAt = formatDate(record.updated_at)
		const text = <span style={{color: '#6A6963'}}> {record.name}
			<hr/> Creado: {createdAt} <br/>  Modificado: {updatedAt} </span>
		return (
			<RegisterTypeProvider registerType={searchRegister(record)}>
				{ validatePermission(constants.UPDATE_RECORD_TYPE_PERMISSION) ? (
					<RegisterTypeUpdate/>
				) : null }
				{"  "}
				{ validatePermission(constants.DELETE_RECORD_TYPE_PERMISSION) ? (
					<RegisterTypeDelete/>
				) : null }
				{"  "}
				<Tooltip placement="left" color='#ffffff' title={text}>
					<Button size="small" type="primary" icon={<InfoOutlined/>}/>
				</Tooltip>
			</RegisterTypeProvider>
		)
	}
	const columns = [
		{
			title: '#',
			width: 20,
			dataIndex: 'id',
			key: 'id',
			defaultSortOrder: 'descend',
			render: (_,record)=>{
				return tableData.indexOf(record)+1;
			 }
		},
		{
			title: 'Nombre',
			width: 50,
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Activo',
			width: 50,
			dataIndex: 'state',
			key: 'state',
			render: (_, record) => getButtonStateRegisterType(record.state, record.id)
		},
		{
			title: 'Acciones',
			key: 'actions',
			width: 20,
			fixed: 'right',
			render: (_, record) => getActions(record),
		},
	]
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de Registro",
		
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, tableData, [
				"name",
			])
		);
	};
	const handleResetFilter = () => {
		setFilteredData(resetFilter(tableData));
	};
	return (<Card
		height={100}
		title="Tipo de Registro"
		table={<Table y={300} columns={columns} dataSource={filteredData?filteredData:tableData}/>}
		modal={
			<>
						<InputSearch
							title={nubeDatosConsulta}
							handleSearch={handleSearchFilter}
							resetFilter={handleResetFilter}
						/>
						<RegisterTypeRegister CreateRegisterTypeAction={saveRecords}/>
					</>
		}
	/>)
}

export default RegisterTypeComponent