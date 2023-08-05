import CustomerTables from "./CustomerTables";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import Spinner from "../../../handle/Spinner/Spinner";
import * as constants from "../../../../redux/constants";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min";
import { success, errorGlobal } from "../../../handle/Notification/Notification";
import {validateModule} from "../../../handle/PermissionMethods/PermissionMethods";
import {fetchAllActivityType} from "../../../../redux/actions/Configuration/ActivityTypeAction";
import { SearchOutlined, DownloadOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {updateCustomerInterestById} from "../../../../redux/actions/Customer/CustomerInterestAction";
import { fetchAllCustomer, getCustomerById } from "../../../../redux/actions/Customer/CustomerAction";
import { setFileCustomer, deleteFileCustomer } from "../../../../redux/actions/Customer/CustomerAction";
import { Button, Descriptions, Divider, Card, Row, Col, Form, Input, Select, Table, Upload, Popconfirm, Tooltip,} from "antd";
import splitStringWhitUnderScore from "../../../handle/FormatterWords/formatterWords";




const validateMessages1 = {
	required: "El campo es requerido",
};

const CustomerTracking = ({customer, dispatchGetCustomerByIdAction}) => {
	
	const dispatch = useDispatch();
	const {id} = useParams();
	const [form] = Form.useForm();
	const [formInterest] = Form.useForm();
	const [customerData, SetCustomerData] = useState({});
	const [searchCustomerId, setSearchCustomerId] = useState(null);
	const [ loading ] = useState(false);
	const [customerAttachment, setCustomerAttachment] = useState([]);
	let customersData = {};
	let dtoCustomerData = {};
	let dtoCustomerAdviserData = {};

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label} es requerido",
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			email: "${label} no es un correo válido",
			// eslint-disable-next-line no-template-curly-in-string
			number: "${label} debe ser un número",
		},
	};

	useEffect(() => dispatch(fetchAllCustomer()), []);
	
	useEffect(() => {
		id !== undefined ? fillSearchCustomer() : cleanSearchCustomer();
	}, [id]);
	
	useEffect(() => {
		setInterestLevel(
			dtoCustomerData.interest_level == null
				? ""
				: dtoCustomerData.interest_level
		);
		setInterests(dtoCustomerData.interests);
	}, [customerData]);
	
	const elements = [];

	for (const key in customer) {
		if (key === "_payload") {
			const customerSelectData = customer[key];
			if (customerSelectData != null) {
				for (let index = 0; index < customerSelectData.length; index++) {
					elements.push(customerSelectData[index]);
				}
			}
		}
	}

	for (const key in customerData) {
		if (key === "_payload") {
			customersData = customerData[key];
		}
	}

	if (customersData != null) {
		if (customersData.customer != null) {
			dtoCustomerData = customersData.customer;
			let attachment = customerAttachment;
			if (attachment != null) {
				dtoCustomerData?.customer_attachments.forEach((value, index) => {
					attachment.push({
						id_attachment: value.id,
						key: index + 1,
						document: value.name,
						url: value.path,
					});
				});
			}
		}
	}
	
	if (customersData?.assessor != null) {
		dtoCustomerAdviserData = customersData?.assessor[0];
	}

	const fillSearchCustomer = () => {
		setSearchCustomerId(id);
		form.setFieldsValue({
			searchCustomer: parseInt(id),
		});
		dispatchGetCustomerByIdAction(id, (response) => {
			SetCustomerData(response);
		});
	};
	
	const downloadDocument = (key) => {
		let tagA = document.createElement("a");
		tagA.href = customerAttachment[key - 1].url;
		tagA.target = "_blank";
		tagA.download = customerAttachment[key - 1].document;
		tagA.dispatchEvent(new MouseEvent("click"));
	};
	
	const deleteRowInTable = (key) => {
		let newArrayAttachment = customerAttachment.filter((item) => {
			if (item.key !== key) {
				return item;
			}
		});
		newArrayAttachment = newArrayAttachment.filter((item, index) => {
			item.key = index + 1;
			return item;
		});
		setCustomerAttachment(newArrayAttachment);
		success("El archivo se elimino con éxito");
	};

	const cleanSearchCustomer = () => {
		SetCustomerData(null);
		form.setFieldsValue({
			searchCustomer: null,
		});
	};
	
	const textDelete = <span style={{color: "#6A6963"}}>Eliminar</span>;
	
	function deleteFileCustomerOfRow(record) {
		dispatch(
			deleteFileCustomer(
				customerAttachment[record.key - 1].id_attachment,
				record.key,
				deleteRowInTable,
				(message) => {
					console.error(message);
				}
			)
		);
	}
	
	const getActions = (name, record) => {
		switch (name) {
			case "user":
				return (
					<>
						<Tooltip placement="left" color="#ffffff" title={textDelete}>
							<Popconfirm
								title={"¿Deseo eliminar?"}
								onConfirm={() => {
									deleteFileCustomerOfRow(record);
								}}
								onCancel={() => {
								}}
								okText="Si"
								cancelText="No"
							>
								<Button
									icon={<DeleteOutlined/>}
									type="primary"
									size="small"
									danger
								/>
							</Popconfirm>
						</Tooltip>
						{"  "}
						<Button
							type="primary"
							size="small"
							onClick={() => {
								downloadDocument(record.key);
							}}
							icon={<DownloadOutlined/>}
						/>
						{"  "}
					</>
				);
			default:
				return <h1>No project match</h1>;
		}
	};

	const getCustomerDataById = () => {
		searchCustomerId === null ? errorGlobal("Debe seleccionar un usuario") :
			dispatchGetCustomerByIdAction(searchCustomerId, (response) => {
				SetCustomerData(response);
				dispatch(fetchAllActivityType())
			});
	};

	const onFinish = () => {
		dispatch(updateCustomerInterestById(searchCustomerId, interestCustomer));
		success("Ha sido agregado con éxito");
	};
	
	const handleAdd = (value) => {
		let varCount = customerAttachment;
		varCount.push({
			id_attachment: value.id,
			key: varCount + 1,
			document: value.name,
			url: value.path,
		});
		setCustomerAttachment(varCount);
	};

	const uploadProps = {
		showUploadList: false,
		onSuccess(response) {
			if (!response.error) {
				success("Se subio el archivo exitosamente");
				handleAdd(response._payload);
			} else errorGlobal("No se pudo subir el archivo");
		},
		onError(err) {
			errorGlobal(err);
		},
		customRequest({onSuccess, file}) {
			let formData = new FormData();
			formData.append("customer_file", file, file.name);
			dispatch(
				setFileCustomer(
					id !== undefined ? id : searchCustomerId,
					formData,
					onSuccess
				)
			);
		},
	};

	const columns = [
		{
			title: "#",
			width: 20,
			dataIndex: "key",
			key: "key",
		},
		{
			title: "Documento",
			width: 80,
			dataIndex: "document",
			key: "document",
		},
		{
			title: "Acciones",
			dataIndex: "actions",
			width: 30,
			key: "id_attachment",
			render: (_, record) => getActions("user", record),
		},
	];

	const [interestLevel, setInterestLevel] = useState("");
	const [interests, setInterests] = useState("");

	const interestCustomer = {
		interest_level: interestLevel,
		interests,
	};

	const fillInterestCustomer = () => {
		formInterest.setFieldsValue({
			interestLevel: String(interestLevel),
			interests,
		});
	};

	fillInterestCustomer();
	
	if (!validateModule(constants.CUSTOMER_TRACKING_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	
	return (
		<Card
			title={"Seguimiento de Clientes"}
			style={{marginBottom: "80px"}}
			extra={
				<Link to="/customer/client">
					{" "}
					<Button size="small" type="primary">
						Volver
					</Button>{" "}
				</Link>
			}
		>
			<Form layout="vertical" size="middle" form={form} onFinish={getCustomerDataById}
				  validateMessages={validateMessages1}>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} lg={24} xl={24}>
						<Descriptions title={"Buscar Cliente"}/>
						<Input.Group compact>
							<Form.Item
								name="searchCustomer"
								label="Digite la Idetificación o Nombre Para Buscsar"
								rules={[
									{
										required: true,
									},
								]}
							>
								<Select
									defaultValue={""}
									showSearch
									style={{width: "100%"}}
									optionFilterProp="children"
									onChange={setSearchCustomerId}
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{elements.map((item) => (
										<Select.Option
											key={item.id + item.name + item.id}
											value={item.id}
										>{` ${splitStringWhitUnderScore(item?.name)} - CC: ${item.identification??""}`}</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="SearchCustomer"
								label=" "
							>
								<Button
									htmlType="submit"
									icon={<SearchOutlined/>}
								/>
							</Form.Item>
						</Input.Group>
					</Col>
				</Row>
			</Form>
			<>
				{(Object.keys(dtoCustomerData).length !== 0 &&
					customerData !== null &&
					searchCustomerId !== undefined) ? (
					<>
						<Divider/>

						<Descriptions
							title={"Datos del Cliente"}
							layout="vertical"
							bordered
						>
							<Descriptions.Item label="Nombre">
								{dtoCustomerData.name}
							</Descriptions.Item>
							<Descriptions.Item label="Identificación">
								{dtoCustomerData.identification}
							</Descriptions.Item>
							<Descriptions.Item label="Teléfono">
								{dtoCustomerData.phone_number}
							</Descriptions.Item>
							<Descriptions.Item label="E-mail">
								{dtoCustomerData.email}
							</Descriptions.Item>
							<Descriptions.Item label="Ocupación">
								{dtoCustomerData.occupation}
							</Descriptions.Item>
							<Descriptions.Item label="Fecha Registro">
								{dtoCustomerData.created_at}
							</Descriptions.Item>
							<Descriptions.Item label="Asesor">
								{dtoCustomerAdviserData != null
									? dtoCustomerAdviserData.name
									: "No asignado"}
							</Descriptions.Item>
						</Descriptions>
						<Divider/>

						<Row gutter={16}>
							<Col xs={24} sm={24} md={12} lg={12} xl={12}>
								<Form
									layout="vertical"
									size="middle"
									form={formInterest}
									validateMessages={validateMessages}
									onFinish={onFinish}
								>
									<Row gutter={16}>
										<Col xs={24} sm={24} md={24} lg={24} xl={24}>
											<Descriptions
												title={"Interes del Cliente"}
											/>
											<Form.Item
												name="interestLevel"
												label="Nivel de Interes"
												rules={[{required: true}]}
											>
												<Select
													placeholder="Nivel de Interés"
													onChange={setInterestLevel}
													style={{width: "100%"}}
													defaultValue=""
												>
													<Select.Option value="">Seleccione...</Select.Option>
													<Select.Option value="1">Bajo</Select.Option>
													<Select.Option value="2">Medio</Select.Option>
													<Select.Option value="3">Alto</Select.Option>
												</Select>
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col xs={24} sm={24} md={24} lg={24} xl={24}>
											<Form.Item
												name="interests"
												label="Qué estas buscando?"
												rules={[{required: true}]}
											>
												<Input.TextArea
													value={interests}
													onChange={(e) => setInterests(e.target.value)}
													placeholder="Ingrese que esta Buscando"
												/>
											</Form.Item>
										</Col>
									</Row>
									<Row span={24}>
										<Button
											style={{marginLeft: "85%"}}
											type="primary"
											htmlType="submit"
										>
											Guardar
										</Button>
									</Row>
								</Form>
							</Col>
							<Col xs={24} sm={24} md={14} lg={12} xl={12}>
								<Row>
									<Descriptions title={"Documentos del cliente"}/>
									<Table
										bordered
										style={{width: "100%"}}
										columns={columns}
										dataSource={customerAttachment}
										pagination={{pageSize: 10}}
										scroll={{y: 240}}
									/>
								</Row>
								<Row>
									<div style={{marginLeft: "78%"}}>
										<Upload {...uploadProps}>
											<Button type="primary" icon={<UploadOutlined/>}>
												Subir Archivos
											</Button>
										</Upload>
									</div>
								</Row>
							</Col>
						</Row>
						<Divider/>
						<Descriptions
							title={"Datos de Movimiento del Cliente"}
						/>
						<CustomerTables
							myOnClick={getCustomerDataById}
							data={customersData}
						/>
					</>
				) : loading ? (
					<Spinner/>
				) : (
					<p style={{visibility: "hidden"}}> ''</p>
				)}
			</>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchGetCustomerByIdAction: (id, onSuccess, onError) =>
		dispatch(getCustomerById(id, onSuccess, onError)),
	dispatchFetchAllCustomerAction: () => dispatch(fetchAllCustomer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTracking);
