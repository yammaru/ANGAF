import Card from "../../Card/Card";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import SystemAuditView from "./SystemAuditView";
import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as constants from "../../../../redux/constants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validateModule } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllSystemAudit } from "../../../../redux/actions/Configuration/SystemAuditAction";
import {
	getColumnSearchProps,
	lol,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import {
	handleSearch,
	nubeListaElementos,
	resetFilter,
} from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import FilterTable from "./FilterTable";

const SystemAudit = ({ systemAudit, dispatchFetchAllSystemAuditAction }) => {
	useEffect(
		() => dispatchFetchAllSystemAuditAction(),
		[dispatchFetchAllSystemAuditAction]
	);
	const [filteredData, setFilteredData] = useState(systemAudit._payload);
	//filter
	const element = [];
	if (systemAudit._payload != null) {
		for (const key in systemAudit) {
			if (key === "_payload") {
				const system = systemAudit[key];
				for (let index = 0; index < system.length; index++) {
					element.push(system[index]);
				}
			}
		}
	}

	const searchSystemAudit = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	};

	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Clase",
			width: 90,
			dataIndex: "module_name",
			key: "class_id",
			...getColumnSearchProps("class_id"),
			...noWhiteWindow,
		},
		{
			title: "Tipo",
			width: 90,
			dataIndex: "auditType_name",
			key: "type_id",
			...getColumnSearchProps("type_id"),
			...noWhiteWindow,
		},
		{
			title: "IP",
			width: 90,
			dataIndex: "ip",
			key: "ip",
			...getColumnSearchProps("ip"),
			...noWhiteWindow,
		},
		{
			title: "Usuario",
			width: 90,
			dataIndex: "user",
			key: "user",
			...getColumnSearchProps("user"),
			...noWhiteWindow,
		},
		{
			title: "Fecha",
			width: 90,
			dataIndex: "created_at",
			key: "created_at",
			...getColumnSearchProps("created_at"),
			...noWhiteWindow,
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 70,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const getActions = (record) => {
		return (
			<>
				<SystemAuditView record={searchSystemAudit(record)} />
			</>
		);
	};
	if (!validateModule(constants.SYSTEM_AUDIT_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de la Fuente","Evento","Modelo","Fecha"
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value, element, ["module_name", "created_at","ip","final_state","auditType_name","user"]));
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(element));
	};

	return (
		<>
			<Card
				title="Auditorías del Sistema"
				modal={
					
						<InputSearch
							title={nubeDatosConsulta}
							handleSearch={handleSearchFilter}
							resetFilter={handleResetFilter}
						/>
					
				}
				table={
					<>
					<FilterTable
				setFilteredData={setFilteredData}
				filteredData={element}
				
			/>
					<Table
						columns={columns}
						dataSource={
							filteredData ? filteredData : systemAudit._payload
						}
					/>
					</>
					
				}
			/>
		</>
	);
};
const mapStateToProps = (state) => ({
	loading: state.loading,
	systemAudit: state.systemAudit,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllSystemAuditAction: () => dispatch(fetchAllSystemAudit()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SystemAudit);
