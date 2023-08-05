import Card from "../../Card/Card";
import {Button, Table} from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as constants from "../../../../redux/constants";
import RegisterForm from "./components/OccupationRegister";
import OccupationUpdate from "./components/OccupationUpdate";
import OccupationDelete from './components/OccupationDelete';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { TootipInfo } from '../../TooltipInfoComponent/TootipInfo';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { OccupationProvider } from './components/OccupationProvider';
import { success, error, warning } from "../../../handle/Notification/Notification";
import { getColumnSearchProps, noWhiteWindow } from '../../../handle/HandleFilterTable/handleFilterTable';
import { validateModule, validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllOccupation, updateStateOccupationById } from '../../../../redux/actions/Configuration/OccupationAction';
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const Occupation = ({ occupation, dispatchFetchAllOccupationAction }) => {
	useEffect(() => dispatchFetchAllOccupationAction(), [dispatchFetchAllOccupationAction])
	const dispatch = useDispatch();
	const [filteredData, setFilteredData] = useState(occupation?._playload);
	const element = [];
	for (const key in occupation) {

		if (key === "_payload") {
			const occupationData = occupation[key];
			if (occupationData !== null) {
				for (let index = 0; index < occupationData.length; index++) {
					element.push(occupationData[index]);
				}
			}

		}
	}

	const searchOcupation = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	};


	const getButtonStateOccupation = (state, id) => {
		if (state) {
			return <Button size="small" onClick={() => UpdatedState(id)} type='text' icon={<CheckOutlined style={{ fontSize: '18px', color: '#0D6B04' }} />} />
		}
		else {
			return <Button size="small" onClick={() => UpdatedState(id)} type='text' icon={<CloseOutlined style={{ fontSize: '18px', color: '#f5222d' }} />} />
		}
	}

	const UpdatedState = (id) => {
		validatePermission(constants.UPDATE_OCCUPATION_PERMISSION) ?
		dispatch(updateStateOccupationById(id, (response) => {
			response.error ? error(response.message) : success('Ocupación actualizado');
			dispatchFetchAllOccupationAction();
		})):warning("no posee el permiso para cambiar este estado")

	}
	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			render: (_,record)=>{
				return element.indexOf(record)+1;
			 }
		},
		{
			title: "Nombre",
			width: 90,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow
		},
		{
			title: "Activo",
			width: 90,
			dataIndex: 'state',
			key: 'state',
			render: (_, record) => getButtonStateOccupation(record.state, record.id)
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
			<OccupationProvider Occupation={searchOcupation(record)}>
				{validatePermission(constants.UPDATE_OCCUPATION_PERMISSION) ? (
					<OccupationUpdate/>
				) : null}
				{"  "}
				{validatePermission(constants.DELETE_OCCUPATION_PERMISSION) ? (
					<OccupationDelete/>
				) : null}
				{"  "}
				<TootipInfo
					created_at={record.created_at}
					name={record.name}
					updated_at={record.updated_at}
				/>
			</OccupationProvider>
		);
	};
	if (!validateModule(constants.OCCUPATION_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}

	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de ocupacion",
		
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

	return (
		<Card
			height={100}
			title="Ocupación"
			table={<Table y={300} columns={columns} dataSource={filteredData?filteredData:element}/>}
			modal={
				<>
				<InputSearch
					title={nubeDatosConsulta}
					handleSearch={handleSearchFilter}
					resetFilter={handleResetFilter}
				/>
			
			<RegisterForm/></>
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	occupation: state.occupation,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllOccupationAction: () => dispatch(fetchAllOccupation()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Occupation);
