import React, { useState } from "react";
import { Button, Table } from "antd";
import * as constants from "../../../../redux/constants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import {
	fetchAllConsignmentConcept,
	updateStateConsignmentConceptById,
} from "../../../../redux/actions/Configuration/ConsignmentConceptAction";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Card from "../../Card/Card";
import { useEffect } from "react";
import {
	errorGlobal,
	success,
} from "../../../handle/Notification/Notification";
import TootipInfo from "../../TooltipInfoComponent/TootipInfo";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import DeleteConsignmentConcept from "./components/DeleteConsignmentConcept";
import { ConsignmentConceptProvider } from "./components/ConsignmentConceptProvider";
import RegisterFormComponent from "./components/ConsignmentConceptRegister";
import ConsignmentConceptUpdate from "./components/ConsignmentConceptUpdate";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const ConsignmentConcept = () => {
	const dispatch = useDispatch();
	const consignmentConcept = useSelector(
		(state) => state?.consignmentConcept._payload
	);

	const [filteredData, setFilteredData] = useState(consignmentConcept);

	useEffect(() => {
		dispatch(fetchAllConsignmentConcept());
	}, [dispatch]);

	const searchConsignmentConcept = (record) => {
		for (let index = 0; index < consignmentConcept.length; index++) {
			if (consignmentConcept[index].id === record.id) {
				return consignmentConcept[index];
			}
		}
	};

	const updateStateConsignmentConcept = (id) => {
		dispatch(
			updateStateConsignmentConceptById(id, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success("Clasificacion de proyecto actualizada");
				}
				dispatch(fetchAllConsignmentConcept());
			})
		);
	};

	const getActions = (record) => {
		return (
			<>
				<ConsignmentConceptProvider
					consignmentConcept={searchConsignmentConcept(record)}
				>
					<ConsignmentConceptUpdate
						size="small"
						footer={false}
						title="Actualizar perfil"
					/>

					{"  "}

					<DeleteConsignmentConcept
						size="small"
						title="Empresa afiliada"
					/>

					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</ConsignmentConceptProvider>
			</>
		);
	};

	const getButtonStateAfiliated = (state, id) => {
		if (state) {
			return (
				<Button
					onClick={() => updateStateConsignmentConcept(id)}
					icon={
						<CheckOutlined
							style={{
								fontSize: "18px",
								color: "#0D6B04",
							}}
						/>
					}
					size="small"
					type="text"
				/>
			);
		} else {
			return (
				<Button
					onClick={() => updateStateConsignmentConcept(id)}
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
				return consignmentConcept.indexOf(record) + 1;
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

	if (!validatePermission(constants.CONSIGNMENT_CONCEPT_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = nubeListaElementos(["Nombre de Concepto "]);

	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value, consignmentConcept, ["name"]));
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(consignmentConcept));
	};
	return (
		<>
			<Card
				title="Concepto de consignacion"
				table={
					<Table
						columns={columns}
						dataSource={filteredData?filteredData:consignmentConcept}
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

export default ConsignmentConcept;
