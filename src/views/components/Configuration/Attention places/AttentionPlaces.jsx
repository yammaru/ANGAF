import Card from "../../Card/Card";
import {Button, Table} from "antd";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import * as constants from "../../../../redux/constants";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DeleteAttentionPlaces from "./Components/DeleteAttentionPlaces";
import AttentionPlacesUpdated from "./Components/AttentionPlacesUpdated";
import AttentionPlacesRegister from "./Components/AttentionPlacesRegister";
import { success, error, warning } from "../../../handle/Notification/Notification";
import { AttentionPlacesProvider } from "./Components/AttentionPlacesProvider";
import { getColumnSearchProps, noWhiteWindow } from "../../../handle/HandleFilterTable/handleFilterTable";
import { validateModule, validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllAttentionPlaces, updateStateAttentionPlacesById } from "../../../../redux/actions/Configuration/AttentionPlacesAction";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const AttentionPlaces = ({
													 attentionPlaces,
													 dispatchFetchAllAttentionPlacesAction,
													 dispatchUpdateStateAttentionPlacesAction,
												 }) => {
	useEffect(
		() => dispatchFetchAllAttentionPlacesAction(),
		[dispatchFetchAllAttentionPlacesAction]
	);
	const element = [];
	for (const key in attentionPlaces) {
		if (key === "_payload") {
			const LugarAtencion = attentionPlaces[key];
			for (let index = 0; index < LugarAtencion.length; index++) {
				element.push(LugarAtencion[index]);
			}
		}
	}
	const [filteredData, setFilteredData] = useState(attentionPlaces?._playload);
	const updateStateAttentionPlaces = (id) => {
		validatePermission(constants.UPDATE_ATTENTION_PLACE_PERMISSION) ?
		dispatchUpdateStateAttentionPlacesAction(id, (response) => {
			response.error
				? error(response.message)
				: success("Estado lugar de atención actualizado");
			dispatchFetchAllAttentionPlacesAction();
		}):warning("no posee el permiso para cambiar este estado")
	};

	const getButtonStateAttentionPlaces = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					onClick={() => updateStateAttentionPlaces(id)}
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
					onClick={() => updateStateAttentionPlaces(id)}
					type="text"
					icon={
						<CloseOutlined style={{fontSize: "18px", color: "#f5222d"}}/>
					}
				/>
			);
		}
	};

	const columns = [
		{
			title: "#",
			dataIndex: "id",
			key: "id",
			render: (_,record)=>{
				return element.indexOf(record)+1;
			 }
		},
		{
			title: "Lugares de atención",
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow
		},
		{
			title: "Activo",
			dataIndex: "state",
			render: (_, record) =>
				getButtonStateAttentionPlaces(record.state, record.id),
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 120,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const searchAttentionPlaces = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	};

	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de lugar",
		
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, element, [
				"name",
			])
		);
	};
	const handleResetFilter = () => {
		setFilteredData(resetFilter(element));
	};
	const getActions = (record) => {
		return (
			<>
				<AttentionPlacesProvider
					attentionPlaces={searchAttentionPlaces(record)}
				>
					{validatePermission(constants.UPDATE_ATTENTION_PLACE_PERMISSION) ? (
						<AttentionPlacesUpdated/>
					) : null}
					{"  "}
					{validatePermission(constants.DELETE_AFFILIATE_PERMISSION) ? (
						<DeleteAttentionPlaces/>
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</AttentionPlacesProvider>
			</>
		);
	};
	if (!validateModule(constants.ATTENTION_PLACES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	return (
		<Card
			title="Lugares de atención"
			table={<Table columns={columns} dataSource={filteredData?filteredData:element} y={300}/>}
			modal={
				<>
						<InputSearch
							title={nubeDatosConsulta}
							handleSearch={handleSearchFilter}
							resetFilter={handleResetFilter}
						/><AttentionPlacesRegister/>
						
					</>
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	attentionPlaces: state.attentionPlaces,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllAttentionPlacesAction: () =>
		dispatch(fetchAllAttentionPlaces()),
	dispatchUpdateStateAttentionPlacesAction: (id, onSuccess, onError) =>
		dispatch(updateStateAttentionPlacesById(id, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AttentionPlaces);
