import Card from "../../Card/Card";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PriceRangeRegister from "./PriceRangeRegister";
import DeletedPricesRange from "./DeletedPricesRange";
import UpdatedPricesRange from "./UpdatedPricesRange";
import * as constants from "../../../../redux/constants";
import { PricesRangeProvider } from "./PricesRangeProvider";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { TootipInfo } from "../../TooltipInfoComponent/TootipInfo";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
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
	fetchAllPricesRange,
	changeSateById,
} from "../../../../redux/actions/Configuration/PricesRangeAction";
import {
	handleSearch,
	nubeListaElementos,
	resetFilter,
} from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const PriceRange = ({ pricesRange, dispatchFetchAllPricesRangeAction }) => {
	const dispatch = useDispatch();
	useEffect(
		() => dispatchFetchAllPricesRangeAction(),
		[dispatchFetchAllPricesRangeAction]
	);
	const [filteredData, setFilteredData] = useState(pricesRange?._playload);
	const element = [];
	for (const key in pricesRange) {
		if (key === "_payload") {
			const RangoPrecios = pricesRange[key];
			if (RangoPrecios !== null) {
				for (let index = 0; index < RangoPrecios.length; index++) {
					element.push(RangoPrecios[index]);
				}
			}
		}
	}
	const formatterPesoo = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 2,
	});
	const UpdatedState = (value) => {
		validatePermission(constants.UPDATE_PRICE_RANGE_PERMISSION)
			? dispatch(
					changeSateById(value, (response) => {
						if (response.error) {
							errorGlobal(
								"¡UPS! Ocurrió un error mientras se actualizaba el esatdo"
							);
						} else {
							success("Estado del rango de precio actualizado");
							dispatch(fetchAllPricesRange());
						}
					})
			  )
			: warning("no posee el permiso para cambiar este estado");
	};

	const lower_limit = (record) => {
		return (
			<>
				{record.lower_limit === null
					? ""
					: formatterPesoo.format(parseInt(record.lower_limit))}
			</>
		);
	};

	const upper_limit = (record) => {
		return (
			<>
				{record.upper_limit === null
					? ""
					: formatterPesoo.format(parseInt(record.upper_limit))}
			</>
		);
	};

	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: "descend",
			render: (_, record) => {
				return element.indexOf(record) + 1;
			},
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
			title: "Límite superior",
			width: 90,
			dataIndex: "upper_limit",
			key: "upper_limit",
			render: (_, record) => upper_limit(record),
		},
		{
			title: "Límite inferior",
			key: "lower_limit",
			width: 70,
			dataIndex: "lower_limit",
			render: (_, record) => lower_limit(record),
		},
		{
			title: "Estado",
			key: "state",
			width: 70,
			dataIndex: "state",
			render: (state, value) => {
				if (state) {
					return (
						<Button
							onClick={() => UpdatedState(value.id)}
							size="small"
							type="text"
							icon={
								<CheckOutlined
									style={{
										fontSize: "18px",
										color: "#0D6B04",
									}}
								/>
							}
						/>
					);
				} else {
					return (
						<Button
							onClick={() => UpdatedState(value.id)}
							size="small"
							type="text"
							icon={
								<CloseOutlined
									style={{
										fontSize: "18px",
										color: "#f5222d",
									}}
								/>
							}
						/>
					);
				}
			},
		},
		{
			title: "Acciones",
			key: "actions",
			width: 70,
			fixed: "right",
			render: (_, record) => getActions(record),
		},
	];

	const searchPricesRange = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	};
	const getActions = (record) => {
		return (
			<>
				<PricesRangeProvider pricesRange={searchPricesRange(record)}>
					{validatePermission(
						constants.UPDATE_PRICE_RANGE_PERMISSION
					) ? (
						<UpdatedPricesRange />
					) : null}
					{"  "}
					{validatePermission(
						constants.DELETE_PRICE_RANGE_PERMISSION
					) ? (
						<DeletedPricesRange />
					) : null}
					{"  "}
					<TootipInfo
						created_at={record.created_at}
						name={record.name}
						updated_at={record.updated_at}
					/>
				</PricesRangeProvider>
			</>
		);
	};
	if (!validateModule(constants.PRICE_RANGE_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = nubeListaElementos([
		"Nombre de rango de precios",
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value, element, ["name"]));
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(element));
	};

	return (
		<Card
			title="Rango de precios"
			table={<Table columns={columns} dataSource={filteredData?filteredData:element} />}
			modal={
				<>
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<PriceRangeRegister />
				</>
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	pricesRange: state.pricesRange,
});
const mapDispatchToProps = (dispatch) => ({
	dispatchFetchAllPricesRangeAction: () => dispatch(fetchAllPricesRange()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PriceRange);
