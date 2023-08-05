import { Table } from "antd";
import Card from "../../Card/Card";
import { connect } from "react-redux";
import ErrorDrawer from "./ErrorDrawer";
import React, { useEffect, useState } from "react";
import * as constants from "../../../../redux/constants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validateModule } from "../../../handle/PermissionMethods/PermissionMethods";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import { fetchAllCaughtErrorAction } from "../../../../redux/actions/Configuration/CaughtErrorAction";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const Error = ({ caughtErrorAction, dispatchFetchAllErrorAction }) => {
	useEffect(
		() => dispatchFetchAllErrorAction(),
		[dispatchFetchAllErrorAction]
	);
	const [filteredData, setFilteredData] = useState(caughtErrorAction._payload);
	const element = [];
	for (const key in caughtErrorAction) {
		if (key === "_payload") {
			const Error = caughtErrorAction[key];
			for (let index = 0; index < Error.length; index++) {
				element.push(Error[index]);
			}
		}
	}

	const searchProfile = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	};

	const columns = [
		{
			title: "#",
			width: 5,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Fecha",
			width: 5,
			dataIndex: "created_at",
			key: "created_at",
			...getColumnSearchProps("created_at"),
			...noWhiteWindow,
		},
		{
			title: "Código",
			width: 10,
			dataIndex: "error_code",
			key: "error_code",
			...getColumnSearchProps("error_code"),
			...noWhiteWindow,
		},
		{
			title: "IP",
			width: 10,
			dataIndex: "ip",
			key: "ip",
			...getColumnSearchProps("ip"),
			...noWhiteWindow,
		},
		{
			title: "Mensaje",
			width: 5,
			dataIndex: "message",
			key: "message",
			...getColumnSearchProps("message"),
			...noWhiteWindow,
				render: (_, record) => {
return <span style={{fontSize:"9px"}}>{record.message}</span>

				}
		},
		{
			title: "Url",
			width: 20,
			dataIndex: "url",
			key: "url",
			...getColumnSearchProps("url"),
			...noWhiteWindow,
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 20,
			render: (_, record) => getActions(record),
		},
	];

	const getActions = (record) => {
		return (
			<>
				<ErrorDrawer record={searchProfile(record)} />
			</>
		);
	};
	if (!validateModule(constants.MISTAKES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = nubeListaElementos([

		"URL",
		"Dirección IP",
		"Mensaje ",
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, element, [
				"url",
				"message",
				"ip"
			])
		);
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(element));
	};

	return (
		<>
			<Card
				title="Errores"
				modal={
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
				}
				table={
					<Table
						columns={columns}
						dataSource={filteredData?filteredData:caughtErrorAction._payload}
						scroll={{x:800,}}
						
						
					/>
				}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	caughtErrorAction: state.caughtErrorAction,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllErrorAction: () => dispatch(fetchAllCaughtErrorAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Error);
