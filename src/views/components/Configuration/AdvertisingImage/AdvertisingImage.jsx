import Card from "../../Card/Card";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../../../redux/constants";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import UpdatedFormComponent from "./components/AdvertisingImageUpdate";
import DeleteAdvertisinImage from "./components/DeleteAdvertisinImage";
import AdvertisingImageRegister from "./components/AdvertisingImageRegister";
import { AdvertisingImageProvider } from "./components/AdvertisingImageProvider";
import {
	success,
	errorGlobal,
	warning,
} from "../../../handle/Notification/Notification";
import {
	validateModule,
	validatePermission,
} from "../../../handle/PermissionMethods/PermissionMethods";
import {
	fetchAllAdvertisingImage,
	updateStateAdvertisingImageById,
} from "../../../../redux/actions/Configuration/AdvertisingImageAction";
import { getColumnSearchProps } from "../../../handle/HandleFilterTable/handleFilterTable";
import {
	handleSearch,
	nubeListaElementos,
	resetFilter,
} from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const AdvertisingImageComponent = () => {
	const dispatch = useDispatch();
	const advertisingsImages = useSelector(
		(state) => state?.advertisingImage._payload
	);
	const [filteredData, setFilteredData] = useState(advertisingsImages);
	useEffect(() => {
		dispatch(fetchAllAdvertisingImage());
	}, [dispatch]);

	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "id",
			key: "id",
			render: (text) => (
				<>
					{advertisingsImages.map((item, index) =>
						item.id === text ? index + 1 : null
					)}
				</>
			),
		},
		{
			title: "Imagen",
			width: 90,
			dataIndex: "multimedia",
			key: "multimedia",
			render: (record) => (
				<a href={record.path} target="_blank" rel="noreferrer">
					{" "}
					{record.name}{" "}
				</a>
			),
		},
		{
			title: "Descripción",
			width: 90,
			dataIndex: "description",
			key: "description",
			...getColumnSearchProps("description"),
			render: (text) => <>{text}</>,
		},
		{
			title: "Activo",
			width: 40,
			dataIndex: "state",
			key: "state",
			render: (_, record) =>
				getButtonStateAdvertisingImage(record.state, record.id),
		},
		{
			title: "Acciones",
			key: "actions",
			fixed: "right",
			width: 40,
			render: (_, record) => getActions(record),
		},
	];

	const searchAdvertisingImage = (record) => {
		for (let index = 0; index < advertisingsImages.length; index++) {
			if (advertisingsImages[index].id === record.id) {
				return advertisingsImages[index];
			}
		}
	};

	const updateStateAdversetingImage = (id) => {
		validatePermission(constants.UPDATE_ADVERSITING_IMAGE_PERMISSION)
			? dispatch(
					updateStateAdvertisingImageById(id, async (response) => {
						const res = await response;
						if (res.error) {
							errorGlobal("¡UPS!, Ha ocurrido un error");
						} else {
							success("Imagen publicitaria actualizada");
						}
						dispatch(fetchAllAdvertisingImage());
					})
			  )
			: warning("no posee el permiso para cambiar este estado");
	};

	const getButtonStateAdvertisingImage = (state, id) => {
		if (state) {
			return (
				<Button
					onClick={() => updateStateAdversetingImage(id)}
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
					onClick={() => updateStateAdversetingImage(id)}
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

	const getActions = (record) => {
		return (
			<>
				<AdvertisingImageProvider
					advertisingImage={searchAdvertisingImage(record)}
				>
					{validatePermission(
						constants.UPDATE_ADVERSITING_IMAGE_PERMISSION
					) ? (
						<UpdatedFormComponent />
					) : null}
					{"  "}
					{validatePermission(
						constants.DELETE_ADVERSITING_IMAGE_PERMISSION
					) ? (
						<DeleteAdvertisinImage />
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={"Imagen " + record.id}
						updated_at={record.updated_at}
					/>
				</AdvertisingImageProvider>
			</>
		);
	};
	if (!validateModule(constants.ADVERTISIN_IMAGE_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de imagenes publicitarias",
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value, advertisingsImages, ["name","description"]));
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(advertisingsImages));
	};

	return (
		<Card
			height={100}
			title="Imágenes publicitarias"
			table={
				<Table
					y={300}
					columns={columns}
					dataSource={filteredData?filteredData:advertisingsImages}
				/>
			}
			modal={
				<>
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<AdvertisingImageRegister />
				</>
			}
		/>
	);
};

export default AdvertisingImageComponent;
