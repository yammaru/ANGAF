import Card from "../../Card/Card";
import { Button, Input, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import ProfileForm from "./component/ProfileForm";
import PermisosProfile from "./component/Permisos";
import ProfileUpdate from "./component/ProfileUpdate";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import { ProfileProvider } from "./component/ProfileProvider";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ConfirmationDeleteProfile from "./component/ConfirmationDeleteProfile";
import {
	success,
	errorGlobal,
	warning,
} from "../../../handle/Notification/Notification";
import {
	getColumnSearchProps,
	noWhiteWindow,
} from "../../../handle/HandleFilterTable/handleFilterTable";
import {
	validateModule,
	validatePermission,
} from "../../../handle/PermissionMethods/PermissionMethods";
import {
	fetchAllProfile,
	updateStateProfileById,
} from "../../../../redux/actions/Configuration/ProfileAction";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const { Search } = Input;
const Profile = () => {
	const dispatch = useDispatch();
	const profiles = useSelector((state) => state?.profile._payload);
	const [filteredData, setFilteredData] = useState(profiles);
	useEffect(() => {
		dispatch(fetchAllProfile());
	}, [dispatch]);

	const updateStateProfile = async (id) => {
		validatePermission(constants.UPDATE_PROFILE_PERMISSION)
			? dispatch(
					updateStateProfileById(id, async (response) => {
						const res = await response;
						if (res.error) {
							errorGlobal("¡UPS!, Ha ocurrido un error");
						} else {
							success("Perfil actualizado");
						}
						dispatch(fetchAllProfile());
					})
			  )
			: warning("no posee el permiso para cambiar este estado");
	};

	const searchProfile = (record) => {
		for (let index = 0; index < profiles.length; index++) {
			if (profiles[index].id === record.id) {
				return profiles[index];
			}
		}
	};

	const getActions = (record) => {
		return (
			<ProfileProvider profile={searchProfile(record)}>
				{validatePermission(constants.UPDATE_PROFILE_PERMISSION) ? (
					<ProfileUpdate />
				) : null}
				{"  "}
				{record.id !== 1 ? (
					validatePermission(constants.DELETE_PROFILE_PERMISSION) ? (
						<ConfirmationDeleteProfile />
					) : null
				) : null}
				{"  "}
				<TootipInfo
					created_at={record.created_at}
					name={record.name}
					updated_at={record.updated_at}
				/>
				{"  "}
				{validatePermission(constants.GRANT_PROFILE_PERMISSION) ? (
					<PermisosProfile />
				) : null}
			</ProfileProvider>
		);
	};

	const getButtonStateProfile = (state, id) => {
		if (state) {
			return (
				<Button
					size="small"
					onClick={() => updateStateProfile(id)}
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
					onClick={() => updateStateProfile(id)}
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
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Nombre",
			width: 40,
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			...noWhiteWindow,
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Activo",
			width: 30,
			dataIndex: "state",
			key: "state",
			render: (_, record) =>
				getButtonStateProfile(record.state, record.id),
		},
		{
			title: "Acciones",
			key: "actions",
			width: 20,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];
	if (!validateModule(constants.PROFILES_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = (
		<p style={{ color: "#6A6963" ,    fontFamily: "sans-serif"}}>
			<strong>Buscar por:</strong> <br />
			
			Nombre del perfil<br />
			
		</p>
	);
	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value,profiles,["name"]));
	};
	const handleResetFilter=()=>{
		setFilteredData(resetFilter(profiles));
	}
	return (
		<Card
			title="Perfiles"
			table={
				<Table
					columns={columns}
					dataSource={filteredData?filteredData:profiles}
					y={300}
					size="small"
					bordered={true}
				/>
			}
			modal={
				<div style={{display:"flex"}}>
						<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<ProfileForm />
				</div>
			}
		/>
	);
};

export default Profile;
