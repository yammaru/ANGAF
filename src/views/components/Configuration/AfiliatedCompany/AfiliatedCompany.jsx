import Card from "../../Card/Card";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AfiliatedCompanyUpdate from "./components/AfiliatedCompanyUpdate";
import DeleteAfiliatedCompany from "./components/DeleteAfiliatedCompany";
import RegisterFormComponent from "./components/AfiliatedCompanyRegister";
import {
	errorGlobal,
	success,
	warning,
} from "../../../handle/Notification/Notification";
import { AfiliatedCompanyProvider } from "./components/AfiliatedCompanyProvider";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import {
	validateModule,
	validatePermission,
} from "../../../handle/PermissionMethods/PermissionMethods";
import {
	fetchAllAfiliatedCompany,
	updateStateAfiliatedCompanyById,
} from "../../../../redux/actions/Configuration/AfiliatedCompanyAction";
import {
	handleSearch,
	nubeListaElementos,
	resetFilter,
} from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const AfiliatedCompanyComponent = () => {
	const dispatch = useDispatch();
	const afiliatedCompany = useSelector(
		(state) => state?.afiliatedCompany._payload
	);
	const [filteredData, setFilteredData] = useState(afiliatedCompany);
	useEffect(() => {
		dispatch(fetchAllAfiliatedCompany());
	}, [dispatch]);

	const searchAfiliatedCompany = (record) => {
		for (let index = 0; index < afiliatedCompany.length; index++) {
			if (afiliatedCompany[index].id === record.id) {
				return afiliatedCompany[index];
			}
		}
	};

	const updateStateAfiliatedCompany = (id) => {
		validatePermission(constants.UPDATE_AFFILIATE_PERMISSION)
			? dispatch(
					updateStateAfiliatedCompanyById(id, async (response) => {
						const res = await response;
						if (res.error) {
							errorGlobal("¡UPS!, Ha ocurrido un error");
						} else {
							success("Compañía asociada actualizada");
						}
						dispatch(fetchAllAfiliatedCompany());
					})
			  )
			: warning("no posee el permiso para cambiar este estado");
	};

	const getActions = (record) => {
		return (
			<>
				<AfiliatedCompanyProvider
					afiliatedCompany={searchAfiliatedCompany(record)}
				>
					{validatePermission(
						constants.UPDATE_AFFILIATE_PERMISSION
					) ? (
						<AfiliatedCompanyUpdate
							size="small"
							footer={false}
							title="Actualizar perfil"
						/>
					) : null}
					{"  "}
					{validatePermission(
						constants.DELETE_AFFILIATE_PERMISSION
					) ? (
						<DeleteAfiliatedCompany
							size="small"
							title="Empresa afiliada"
						/>
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</AfiliatedCompanyProvider>
			</>
		);
	};

	const getButtonStateAfiliated = (state, id) => {
		if (state) {
			return (
				<Button
					onClick={() => updateStateAfiliatedCompany(id)}
					icon={
						<CheckOutlined
							style={{ fontSize: "18px", color: "#0D6B04" }}
						/>
					}
					size="small"
					type="text"
				/>
			);
		} else {
			return (
				<Button
					onClick={() => updateStateAfiliatedCompany(id)}
					size="small"
					type="text"
					icon={
						<CloseOutlined
							style={{ fontSize: "18px", color: "#f5222d" }}
						/>
					}
				/>
			);
		}
	};

	const columns = [
		{
			title: "#",
			width: 40,
			dataIndex: "id",
			key: "id",
			render: (_, record) => {
				return afiliatedCompany.indexOf(record) + 1;
			},
		},
		{
			title: "Nombre",
			width: 100,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow,
			sorter: true,
		},
		{
			title: "Activo",
			width: 40,
			dataIndex: "state",
			key: "state",
			align: "center",
			render: (_, record) =>
				getButtonStateAfiliated(record.state, record.id),
		},
		{
			title: "Acciones",
			key: "actions",
			fixed: "right",
			width: 30,
			render: (_, record) => getActions(record),
		},
	];

	if (!validateModule(constants.AFFILIATES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}

	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de Empresa",
		
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, afiliatedCompany, [
				"name",
			])
		);
	};
	const handleResetFilter = () => {
		setFilteredData(resetFilter(afiliatedCompany));
	};
	return (
		<>
			<Card
				title="Empresas afiliadas"
				table={
					<Table
						columns={columns}
						dataSource={
							filteredData ? filteredData : afiliatedCompany
						}
						y={300}
					/>
				}
				modal={
					<>
						<InputSearch
							title={nubeDatosConsulta}
							handleSearch={handleSearchFilter}
							resetFilter={handleResetFilter}
						/>
						<RegisterFormComponent />
					</>
				}
			/>
		</>
	);
};

export default AfiliatedCompanyComponent;
