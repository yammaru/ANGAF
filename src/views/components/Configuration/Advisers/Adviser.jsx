import Card from "../../Card/Card";
import { Button, Table } from "antd";
import DeleteAdviser from './DeleteAdviser';
import AdviserUpdate from './AdviserUpdate';
import AdviserRegister from './AdviserRegister';
import React, { useEffect, useState } from "react";
import { AdviserProvider } from './AdviserProvider';
import Spinner from "../../../handle/Spinner/Spinner";
import * as constants from "../../../../redux/constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TootipInfo } from '../../TooltipInfoComponent/TootipInfo';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { success, error, warning, errorGlobal } from "../../../handle/Notification/Notification";
import { validatePermission, validateModule } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllAssessor, updateStateAdviserById } from '../../../../redux/actions/Configuration/AssesorAction';
import {
	convertAllMapDataState,
	getColumnSearchProps,
	noWhiteWindow
} from '../../../handle/HandleFilterTable/handleFilterTable';
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const Adviser = ({
					 assessor,
					 dispatchFetchAllAssessorAction,
					 dispatchUpdateStateAdviserAction,
				 }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(
		() =>
			dispatch(
				fetchAllAssessor(async (response) => {
					const res = await response;
					if (!res) {
						warning("No hay Datos en la tabla");
					} else if (res.error === true) {
						errorGlobal("¡UPS! ha ocurrido un error" + res.message)
					}
					setLoading(false);
				})
			), [dispatch]
	);

	const trustColletion = useSelector((state) => state?.assessor._payload);
	const [filteredData, setFilteredData] = useState(trustColletion);
	useEffect(
		() => dispatchFetchAllAssessorAction(),
		[dispatchFetchAllAssessorAction]
	);
	const element = [];
	for (const key in assessor) {
		if (key === "_payload") {
			const asesor = assessor[key];
			for (let index = 0; index < asesor.length; index++) {
				element.push(asesor[index]);
			}
		}
	}
	const searchAdviser = (record) => {
		return element.find(x=> x.id === record.id);
		
	};
	
	//acciones de las tablas y columnas
	const getActions = (record) => {
		return (
			<>
				<AdviserProvider adviser={searchAdviser(record)}>
					{validatePermission(constants.UPDATE_ADVISOR_PERMISSION) ? (
						<AdviserUpdate/>
					) : null}
					{"  "}
					{validatePermission(constants.DELETE_ADVISOR_PERMISSION) ? (
						<DeleteAdviser/>
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</AdviserProvider>
			</>
		);
	};

	const updateStateAdviser = (id) => {
		validatePermission(constants.UPDATE_ADVISOR_PERMISSION) 
		?dispatchUpdateStateAdviserAction(id, (response) => {
			response.error ? error(response.message) : success("Asesor actualizado");
			dispatchFetchAllAssessorAction();
			}) 
		:warning('no tiene permisos para editar el estado')
		
	};

	const getButtonStateAdviser = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					onClick={ () => updateStateAdviser(id)}
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
					onClick={ () => updateStateAdviser(id)}
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
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			render: (_,record)=>{
				return trustColletion.indexOf(record)+1;
			 }
		},
		{
			title: "Nombre",
			width: 80,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow,
		},
		{
			title: "Identificación",
			width: 70,
			dataIndex: "identification",
			key: "identification",
			...getColumnSearchProps("identification"),
			...noWhiteWindow,
		},
		{
			title: "Correo",
			dataIndex: "email",
			width: 70,
			key: "email",
			...getColumnSearchProps("email"),
			...noWhiteWindow,
		},
		{
			title: "Teléfono",
			dataIndex: "phone_number",
			width: 50,
			key: "phone_number",
			...getColumnSearchProps("phone"),
		
		...noWhiteWindow,
		},
		{
			title: "Empresas asociadas",
			dataIndex: "affiliated_company",
			width: 70,
			key: "affiliated_company",
			...getColumnSearchProps("affiliated_company"),
			...noWhiteWindow,
			render: (_, record) => record.affiliated_company==null?"Todas":record?.affiliated_company
		},
		{
			title: "Activo",
			dataIndex: "state",
			key: "state",
			width: 30,
			render: (_, record) => getButtonStateAdviser(record.state, record.id),
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 50,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];
	if (!validateModule(constants.ADVISERS_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
		
	const nubeDatosConsulta = nubeListaElementos(["Identificación del Asesor","Nombre del Asesor","Email del Asesor","Telefono del Asesor"]);
	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value,trustColletion,["identification","name","email","phone_number"]));
	};
	const handleResetFilter=()=>{
		setFilteredData(resetFilter(trustColletion));
	}
	return (
		<Card
			title="Asesores"
			table={[
				<>{loading ? <Spinner/> :
					<Table
						columns={columns}
						dataSource={convertAllMapDataState(filteredData?filteredData:trustColletion)}
						scroll={{x: 1000, y: 300}}
						size="small"
						bordered={true}
					/>}</>]
			}
			drawer={<>
			<InputSearch
			title={nubeDatosConsulta}
			handleSearch={handleSearchFilter}
			resetFilter={handleResetFilter}
			/>
			<AdviserRegister/>
			</>}
		/>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	assessor: state.assessor,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllAssessorAction: () => dispatch(fetchAllAssessor()),
	dispatchUpdateStateAdviserAction: (id, onSuccess, onError) =>
		dispatch(updateStateAdviserById(id, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Adviser);
