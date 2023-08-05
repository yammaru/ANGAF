import Card from "../../Card/Card";
import {Button, Table} from "antd";
import React, { useEffect, useState } from "react";
import DeleteChannel from "./components/DeleteChannel";
import ChannelUpdate from "./components/ChannelUpdate";
import RegisterForm from "./components/ChannelRegister";
import * as constants from "../../../../redux/constants";
import { ChannelProvider } from "./components/ChannelProvider";
import { connect, useDispatch, useSelector } from "react-redux";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min";
import { success, warning } from "../../../handle/Notification/Notification";
import { getColumnSearchProps, noWhiteWindow } from "../../../handle/HandleFilterTable/handleFilterTable";
import { validateModule, validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllChannel, updateStateChannelById } from "../../../../redux/actions/Configuration/ChannelAction";
import InputSearch from "../../../handle/InputSearch/InputSerch";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";

const ChannelComponent = () => {
	
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllChannel());
	},[dispatch]);

	const channel = useSelector((state) => state?.channel?._payload);
	const [filteredData, setFilteredData] = useState(channel);

	const UpdatedState = (id) => {
		validatePermission(constants.UPDATE_CHANNEL_PERMISSION) ?
		dispatch(updateStateChannelById(id, async () => {
			success("Actualización exitosa");
			dispatch(fetchAllChannel());
		})):warning("no posee el permiso para cambiar este estado")
	};

	const getButtonStateChannel = (state, id) => {
		if (state) {
			return (
				<Button
					onClick={() => UpdatedState(id)}
					size="small"
					type="text"
					icon={
						<CheckOutlined style={{fontSize: "18px", color: "#0D6B04"}}/>
					}
				/>
			);
		} else {
			return (
				<Button
					onClick={() => UpdatedState(id)}
					size="small"
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
			width: 100,
			render: (_,record)=>{
				return channel.indexOf(record)+1;
			 }
		},
		{
			title: "Nombre",
			dataIndex: "name",
			key: "name",
			width: 200,
			...getColumnSearchProps("name"),
			...noWhiteWindow
		},
		{
			title: "Activo",
			dataIndex: "state",
			key: "state",
			width: 150,
			render: (_, record) => getButtonStateChannel(record.state, record.id),
		},
		{
			title: "Acciones",
			key: "actions",
			width: 100,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const searchChannel = (record) => {
		return channel.find(x => x.id === record.id)
	};

	const getActions = (record) => {
		return (
			<>
				<ChannelProvider channel={searchChannel(record)}>
					{validatePermission(constants.UPDATE_CHANNEL_PERMISSION) ? (
						<ChannelUpdate/>
					) : null}
					{"  "}
					{validatePermission(constants.DELETE_CHANNEL_PERMISSION) ? (
						<DeleteChannel/>
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</ChannelProvider>
			</>
		);
	};
	if (!validateModule(constants.CHANNEL_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de Empresa",
		
	]);
	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, channel, [
				"name",
			])
		);
	};
	const handleResetFilter = () => {
		setFilteredData(resetFilter(channel));
	};
	return (
		<>
			<Card
				height={100}
				title="¿Cómo se enteró?"
				table={<Table columns={columns} dataSource={filteredData?filteredData:channel} y={300}/>}
				modal={
					<>
						<InputSearch
							title={nubeDatosConsulta}
							handleSearch={handleSearchFilter}
							resetFilter={handleResetFilter}
						/><RegisterForm/>
					
					</>
				}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	channel: state.channel,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllChannelAction: () => dispatch(fetchAllChannel()),
	dispatchUpdateStateChannelAction: (id, onSuccess, onError) =>
		dispatch(updateStateChannelById(id, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChannelComponent);
