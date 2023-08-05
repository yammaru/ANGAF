
import {Button, Table} from "antd";
import Card from "../../Card/Card";
import React, { useEffect, useState } from "react";
import * as constants from "../../../../redux/constants";
import RegisterForm from "./components/ActivityTypeRegister";
import { connect, useDispatch, useSelector } from "react-redux";
import ActivityTypeUpdate from "./components/ActivityTypeUpdate";
import ActivityTypeDelete from "./components/ActivityTypeDelete";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { success, warning } from "../../../handle/Notification/Notification";
import { getColumnSearchProps, noWhiteWindow } from "../../../handle/HandleFilterTable/handleFilterTable";
import { validateModule, validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllActivityType, updateStateActivityTypeById } from "../../../../redux/actions/Configuration/ActivityTypeAction";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";


const ActivityTypeComponent = () => {
	
	const dispatch = useDispatch();
	
	useEffect(() => {dispatch(fetchAllActivityType())}, [dispatch]);
	const activityTypeSelector = useSelector((state) => state?.activityType);
	const [filteredData, setFilteredData] = useState(activityTypeSelector?._playload);
	const UpdatedState = (id) => {
		validatePermission(constants.UPDATE_ACTIVITY_TYPE_PERMISSION) ? 

		dispatch(updateStateActivityTypeById(id, async function (){

			dispatch(fetchAllActivityType());
			success("Registro Actualizado")
		}))
		:warning("no posee el permiso para cambiar este estado")
	
	};
	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			render: (_,record)=>{
				return activityTypeSelector._payload.indexOf(record)+1;
			 }
		},
		{
			title: "Nombre",
			width: 100,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow
		},
		{
			title: "Activo",
			width: 50,
			dataIndex: "state",
			key: "state",
			render: (_, record) => {
				if (record.state) {
					return (
						<Button
							onClick={() => UpdatedState(record.id)}
							size="small"
							type="text"
							icon={
								<CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>
							}
						/>
					);
				} else {
					return (
						<Button
							onClick={() => UpdatedState(record.id)}
							size="small"
							type="text"
							icon={
								<CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>
							}
						/>
					);
				}
			},
		},
		{
			title: "Acciones",
			key: "actions",
			width: 30,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const getActions = (record) => {
		return (
			<>
				{validatePermission(constants.UPDATE_ACTIVITY_TYPE_PERMISSION) ? (
					<ActivityTypeUpdate activityType={record}/>
				) : null}
				{"  "}
				{validatePermission(constants.DELETE_ACTIVITY_TYPE_PERMISSION) ? (
					<ActivityTypeDelete activityType={record}/>
				) : null}
				{"  "}
				<TootipInfo
					created_at={record.created_at}
					name={record.name}
					updated_at={record.updated_at}
				/>
			</>
		);
	};
	if (!validateModule(constants.ACTIVITY_TYPE_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de tipo de actividad",
		
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, activityTypeSelector.hasOwnProperty("_payload")
			? activityTypeSelector._payload
			: [], [
				"name",
			])
		);
	};
	const handleResetFilter = () => {
		setFilteredData(resetFilter(activityTypeSelector.hasOwnProperty("_payload")
		? activityTypeSelector._payload
		: []));
	};
	return (

		<Card
			height={100}
			title="Tipo de actividad"
			table={
				<Table
					y={300}
					columns={columns}
					dataSource={filteredData?filteredData:
						activityTypeSelector.hasOwnProperty("_payload")
							? activityTypeSelector._payload
							: []
					}
				/>
			}
			modal={
				<>
				<InputSearch
					title={nubeDatosConsulta}
					handleSearch={handleSearchFilter}
					resetFilter={handleResetFilter}
				/>
			<RegisterForm/></>}
		/>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	activityType: state.activityType,
});
export default connect(mapStateToProps)(ActivityTypeComponent);
