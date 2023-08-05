import { Redirect, useParams } from "react-router-dom";
import { PageHeader, Table, Tag } from "antd";
import EndActivities from "./Components/EndActivity";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import React, { useEffect, Fragment, useState } from "react";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import GeneralActivitiesDelete from "./Components/GeneralActivitiesDelete";
import UpdateGeneralActivities from "./Components/UpdateGeneralActivities";
import RegisterGeneralActivities from "./Components/RegisterGeneralActivities";
import {
	errorGlobal,
	success,
} from "../../../handle/Notification/Notification";
import { GeneralActivitiesProvider } from "./Components/GeneralActivitiesProvider";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import { fetchAllActivatedUsers } from "../../../../redux/actions/Configuration/usersAction";
import {
	validateModule,
	validatePermission,
} from "../../../handle/PermissionMethods/PermissionMethods";
import {
	createGeneralActivity,
	fetchAllGeneralActivity,
	updateGeneralActivityById,
	endActivity,
} from "../../../../redux/actions/Configuration/GeneralActivityAction";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import {
	handleSearch,
	nubeListaElementos,
	resetFilter,
} from "../../../handle/InputSearch/HandleSearch";

const GeneralActivities = () => {
	const { id } = useParams();
	const columns = [
		{
			title: "#",
			width: 50,
			dataIndex: "id",
			key: "id",
			fixed: "left",
			render: (_, record) => {
				return generalActivities.indexOf(record) + 1;
			},
		},
		{
			title: "Usuario Creador",
			width: 100,
			dataIndex: "creator",
			key: "creator",
			...getColumnSearchProps("creator"),
			...noWhiteWindow,
		},
		{
			title: "Actividad",
			width: 150,
			dataIndex: "activity",
			key: "activity",
			...getColumnSearchProps("activity"),
			...noWhiteWindow,
		},
		{
			title: "Programada",
			dataIndex: "scheduled",
			key: "scheduled",
			width: 80,
			...getColumnSearchProps("scheduled"),
			...noWhiteWindow,
		},
		{
			title: "Días de vencimiento",
			dataIndex: "activity_status",
			key: "activity_status",
			width: 100,
			align: "center",
			fixed: "right",
			render: (_, record) => {
				return getTagDaysRemainingActivity(record);
			},
		},
		{
			title: "Realizada",
			dataIndex: "executing",
			key: "executing",
			align: "center",
			fixed: "right",
			width: 60,
			render: (_, record) => {
				return getEndActivity(record);
			},
		},
		{
			title: "Comentario",
			dataIndex: "commentary",
			key: "commentary",
			width: 150,
			...getColumnSearchProps("commentary"),
			...noWhiteWindow,
		},
		{
			title: "Usuario",
			dataIndex: "executing",
			key: "executing",
			width: 100,
			...getColumnSearchProps("executing"),
			...noWhiteWindow,
		},
		{
			title: "Acciones",
			key: "actions",
			width: 70,
			align: "center",
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const dispatch = useDispatch();
	const [dataSource, setDataSource] = useState([]);
	const generalActivities = useSelector((state) => state["generalActivity"]);

	useEffect(() => {
		dispatch(fetchAllGeneralActivity());
		dispatch(fetchAllActivatedUsers());
	}, [dispatch]);

	useEffect(() => {
		setDataSource(
			id
				? generalActivities?.filter((x) => x?.id == id)
				: generalActivities
		);
		setFilteredData(
			id
				? generalActivities?.filter((x) => x?.id == id)
				: generalActivities
		);
	}, [generalActivities]);

	function getTagDaysRemainingActivity(record) {
		if (record["done"]) {
			return <Tag color={"blue"}> {record["activity_status"]} </Tag>;
		} else {
			if (record["is_overdue"])
				return <Tag color={"red"}> {record["activity_status"]} </Tag>;
			else
				return <Tag color={"green"}> {record["activity_status"]} </Tag>;
		}
	}

	const getEndActivity = (record) => {
		if (!isDone(record)) {
			return (
				<GeneralActivitiesProvider
					context={createDataContextToEndActivity(record["id"])}
				>
					<EndActivities />
				</GeneralActivitiesProvider>
			);
		}
		return <span>12/08/2020</span>;
	};

	const createDataContextToEndActivity = (id) => {
		let generalActivity = searchGeneralActivities(id);
		return {
			generalActivity,
			id,
			onFinishEndActivity,
		};
	};

	const onFinishEndActivity = async (id, values) => {
		dispatch(
			endActivity(
				id,
				values,
				async (response) => {
					const res = await response;
					success(res["message"]);
					return false;
				},
				async (onError) => {
					const res = await onError;
					errorGlobal(res["message"]);
					return true;
				}
			)
		);
	};

	const getActions = (record) => {
		return (
			<>
				<GeneralActivitiesProvider
					context={createDataContextToUpdate(record["id"])}
				>
					{"  "}
					{getDeleteGeneralActivities(record["id"])}
					{"  "}
					{getUpdateGeneralActivities(record)}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.id}
						updated_at={record.updated_at}
					/>
				</GeneralActivitiesProvider>
			</>
		);
	};

	const getDeleteGeneralActivities = (id) => {
		if (validatePermission(constants.DELETE_GENERAL_ACTIVITY_PERMISSION)) {
			return <GeneralActivitiesDelete id={id} />;
		}
		return <></>;
	};

	const getUpdateGeneralActivities = (record) => {
		if (validatePermission(constants.CREATE_GENERAL_ACTIVITY_PERMISSION)) {
			if (!isDone(record)) {
				return (
					<UpdateGeneralActivities
						title={"Actualizar actividad general"}
					/>
				);
			}
		}
		return <></>;
	};

	function isDone(record) {
		return record["done"] === 1;
	}

	const createDataContextToUpdate = (id) => {
		let generalActivity = searchGeneralActivities(id);
		return {
			onFinishUpdate,
			generalActivity,
		};
	};

	const searchGeneralActivities = (id) => {
		return dataSource?.find((x) => x["id"] === id);
	};

	const onFinishUpdate = async (id, values) => {
		dispatch(
			updateGeneralActivityById(
				id,
				values,
				async (response) => {
					const res = await response;
					success(res["message"]);
					return false;
				},
				async (onError) => {
					const res = await onError;
					errorGlobal(res["message"]);
					return true;
				}
			)
		);
	};

	const [filteredData, setFilteredData] = useState(
		id ? generalActivities?.filter((x) => x?.id == id) : generalActivities
	);

	const nubeDatosConsulta = nubeListaElementos([
		"Nombre del usuario",
		"Email del Usuario",
		"Nombre del Usuario Creador",
		"Email del Usuario Creador",
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(
				value,
				id
					? generalActivities?.filter((x) => x?.id == id)
					: generalActivities,
				["executing", "creator", "creator_email", "executing_email"]
			)
		);
	};
	const handleResetFilter = () => {
		setFilteredData(
			resetFilter(
				id
					? generalActivities?.filter((x) => x?.id == id)
					: generalActivities
			)
		);
	};
	const getRegisterGeneralActivities = () => {
		if (validatePermission(constants.CREATE_GENERAL_ACTIVITY_PERMISSION)) {
			return (
				<>
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<GeneralActivitiesProvider context={onFinishRegister}>
						<RegisterGeneralActivities
							title={"Registrar actividad general"}
						/>
					</GeneralActivitiesProvider>
				</>
			);
		}
		return <></>;
	};

	const onFinishRegister = async (values) => {
		dispatch(
			createGeneralActivity(values, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success(res.message);
				}
			})
		);
	};

	if (!validateModule(constants.GENERAL_ACTIVITIES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}

	return (
		<>
			<Fragment>
				<PageHeader
					style={{ border: "1px solid rgb(235, 237, 240);" }}
					title={"Actividades generales"}
					extra={getRegisterGeneralActivities()}
				/>
				<Table
					size="small"
					columns={columns}
					dataSource={filteredData ? filteredData : dataSource}
					x={1500}
					y={500}
				/>
			</Fragment>
		</>
	);
};

export default GeneralActivities;
