import { Button, Checkbox, Form, Input, PageHeader, Select, Table } from "antd";
import ModuleForm from "./Components/ModuleForm";
import React, { Fragment, useEffect, useState } from "react";
import ModuleDelete from "./Components/ModuleDelete";
import ModuleUpdate from "./Components/ModuleUpdate";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import { ModuleProvider } from "./Components/ModuleProvider";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {
	success,
	errorGlobal,
	warning,
} from "../../../handle/Notification/Notification";
import { fetchAllResource } from "../../../../redux/actions/Configuration/ResourceAction";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import {
	validateModule,
	validatePermission,
} from "../../../handle/PermissionMethods/PermissionMethods";
import {
	creatModule,
	fetchAllModule,
	updateStateModuleById,
} from "../../../../redux/actions/Configuration/ModuleAction";
import { hide } from "@popperjs/core";
import { Hidden } from "@material-ui/core";
import { createPermission } from "../../../../redux/actions/Configuration/PermissionAction";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const Module = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [module_id, setModule_id] = useState("");

	const [form] = Form.useForm();

	useEffect(() => {
		dispatch(fetchAllModule());
		dispatch(fetchAllResource());
	}, [dispatch]);

	const modules = useSelector((state) => state?.md?._payload);
	const [filteredData, setFilteredData] = useState(modules);
	const handleSubmit = async () => {
		const values = await form.validateFields();
		//values.state = state;
		dispatch(
			createPermission(
				values,
				async (response) => {
					const res = await response;
					if (res.error) {
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Se ha registrado con éxito");
					}
				},
				async (error) => {
					errorGlobal(error);
				}
			)
		);
	};

	const searchModule = (record) => {
		return modules.find((x) => x.id === record.id);
	};

	const updateStateModule = (id) => {
		validatePermission(constants.UPDATE_MODULE_PERMISSION)
			? dispatch(
					updateStateModuleById(id, async () => {
						success("Estado Actualizado");
						dispatch(fetchAllModule());
					})
			  )
			: warning("no posee el permiso para cambiar este estado");
	};

	const getButtonStateModule = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					onClick={() => updateStateModule(id)}
					type="text"
					icon={
						<CheckOutlined
							style={{ fontSize: "18px", color: "#0D6B04" }}
						/>
					}
				/>
			);
		} else {
			return (
				<Button
					size="small"
					onClick={() => updateStateModule(id)}
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
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			render: (_,record)=>{
			
				return		 modules.indexOf(record)+1;
			 }
		},
		{
			title: "Nombre",
			width: 90,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow,
		},
		{
			title: "Recurso",
			width: 90,
			dataIndex: "resourceName",
			key: "resourceName",
			...getColumnSearchProps("resourceName"),
			...noWhiteWindow,
		},
		{
			title: "Activo",
			dataIndex: "state",
			key: "state",
			width: 30,
			render: (_, record) =>
				getButtonStateModule(record.state, record.id),
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			fixed: "right",
			width: 70,
			render: (_, record) => getActions(record),
		},
	];

	const getActions = (record) => {
		return (
			<ModuleProvider module={searchModule(record)}>
				{validatePermission(constants.UPDATE_MODULE_PERMISSION) ? (
					<ModuleUpdate />
				) : null}
				{"  "}
				{validatePermission(constants.DELETE_MODULE_PERMISSION) ? (
					<ModuleDelete />
				) : null}
				{"  "}
				<TootipInfo
					created_at={record.created_at}
					name={record.name}
					updated_at={record.updated_at}
				/>
			</ModuleProvider>
		);
	};
	if (!validateModule(constants.MODULES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}

	const onFinishRegister = async (values) => {
		dispatch(
			creatModule(values, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success(res.message);
				}
			})
		);
	};

	const getRegisterModules = () => {
		if (validatePermission(constants.CREATE_GENERAL_ACTIVITY_PERMISSION)) {
			return (
				<>
				
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<ModuleProvider context={onFinishRegister}>
						<ModuleForm title={"Registrar Modulo"} />
					</ModuleProvider>
				</>
			);
		}
		return <></>;
	};
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de modulo","Recurso","accion"
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value, modules, ["name","resourceName","state"]));
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(modules));
	};

	return (
		<>
			<Fragment>
				<PageHeader
					style={{ border: "1px solid rgb(235, 237, 240);" }}
					title={"Módulos"}
					extra={getRegisterModules()}
				/>
				<Table
					size="small"
					columns={columns}
					dataSource={filteredData?filteredData:modules}
					x={1500}
					y={500}
				/>
			</Fragment>
			<Form
				name="nest-messages"
				layout="vertical"
				style={{
					display: "none",
					justifyContent: "space-evenly",
					alignItems: "flex-end",
				}}
				onFinish={handleSubmit}
				form={form}
			>
				<Form.Item label="Nombre" name="name" style={{ width: "30%" }}>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Modulo"
					name="module_id"
					style={{ width: "30%" }}
				>
					<Input
						value={module_id}
						onChange={(e) => setModule_id(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Guardar
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Module;
