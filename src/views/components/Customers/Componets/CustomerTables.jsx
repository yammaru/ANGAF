import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {Button, Tabs, Divider, Tooltip} from "antd";
import TableComponent from '../../../components/Table/Table'
import CustomerRegisterActivities from './Activity/CustomerRegisterActivities';
import ModalDetailReform from "../../Price/ReformRequests/Componets/ModalDetailReform";
import { getColumnSearchProps } from '../../../handle/HandleFilterTable/handleFilterTable'
import { PrinterOutlined,AuditOutlined,ToolOutlined,SearchOutlined } from '@ant-design/icons';
import { fetchAllCustomer, getCustomerById } from '../../../../redux/actions/Customer/CustomerAction';
import LegalizeDocuments from "../../Price/SalesMade/Componets/legalizeDocumentsComponents/LegalizeDocuments";

const CustomerTables = (props) => {
	const customerData = props.data;
	const dispatch = useDispatch();
	const sales = props.data?.customer?.sale;
	const quotations = props.data?.customer?.quotation;
	const [visibleModalReformRequest,setVisibleModalReformRequest] = useState(false);
	const [recordSelected,setRecordSelected] = useState({});
	useEffect(() => {
		dispatch(getCustomerById(customerData.customer.id))
		dispatch(fetchAllCustomer())
	}, []);

	const  handleCancelReformRequest = ()=>{
		setVisibleModalReformRequest(!visibleModalReformRequest);
	}
	const  changeStateShowModalReformRequest = (record)=>{
		setRecordSelected(record);
		setVisibleModalReformRequest(!visibleModalReformRequest);
	}

	const getActionsSales = (record) =>{
		const textRequestReform = <span style={{ color: '#6A6963' }}> Solicitudes de Reforma </span>
		const textAfterSales = <span style={{ color: '#6A6963' }}> Postventas </span>
		const textSeePrint = <span style={{ color: '#6A6963' }}> Ver / Imprimir </span>
		const textObservations = <span style={{ color: '#6A6963' }}> Observaciones </span>
		return <>
			<Tooltip placement="left" color='#ffffff' title={textSeePrint}>
				<Button size="small" onClick={()=>{}} style={{ backgroundColor: '#2cc02c', marginTop: 3 }} icon={<PrinterOutlined style={{ color: '#fff' }} />} />
			</Tooltip>
			{""}
			
			<LegalizeDocuments data={record} />
			{""}
			<Tooltip placement="left" color='#ffffff' title={textRequestReform}>
				<Button size="small" onClick={()=>{changeStateShowModalReformRequest(record)}} style={{ backgroundColor: '#002140', marginTop: 3 }} icon={<AuditOutlined style={{ color: '#fff' }} />} />
			</Tooltip>
			{""}
			<Tooltip placement="left" color='#ffffff' title={textAfterSales}>
				<Button size="small" onClick={()=>{}} style={{ backgroundColor: '#002140', marginTop: 3 }} icon={<ToolOutlined style={{ color: '#fff' }} />} />
			</Tooltip>
			<Tooltip placement="left" color='#ffffff' title={textObservations}>
				<Button size="small" onClick={()=>{}} style={{ backgroundColor: '#002140', marginTop: 3 }} icon={<SearchOutlined style={{ color: '#fff' }} />} />
			</Tooltip>
		</>
	}


	const customerActivitiesModel = [];

	function mapActivitiesModel (ActivitiesData){
		return  {
			id : ActivitiesData.id,
			creatorUser : ActivitiesData.user.person.name,
			scheduleDate : ActivitiesData.scheduled,
			typeActivity : ActivitiesData?.activity_type.name,
			managementType : ActivitiesData?.management_type.name,
			activity : ActivitiesData.activity_description,
			activityPerformed : ActivitiesData.done,
			commentary : ActivitiesData.commentary
		}
	}

	function addDatacustomerActivities (ActivitiesData) {
		customerActivitiesModel.push(mapActivitiesModel(ActivitiesData));
	}

	for (let index = 0; index < customerData?.activities.length; index++) {
		addDatacustomerActivities(customerData?.activities[index]);
	}

	const separateUnits = [
		{
			title: 'Código',
			width: 20,
			dataIndex: 'code',
			key: 'code',
			sorter: (a, b) => a.code - b.code,

		},
		{
			title: 'Proyecto',
			width: 50,
			dataIndex: 'project',
			key: 'project',
			...getColumnSearchProps('project'),
		},
		{
			title: 'Unidad',
			dataIndex: 'unit',
			key: 'unit',
			width: 30,
			sorter: (a, b) => a.unit - b.unit,
		},
		{
			title: 'Cód. Fiduciario',
			dataIndex: 'trustCode',
			key: 'trustCode',
			width: 30,
			...getColumnSearchProps('trustCode'),
		},
		{
			title: 'No. Habitaciones',
			dataIndex: 'numberRooms',
			key: 'numberRooms',
			width: 30,
			...getColumnSearchProps('numberRooms'),
		},
		{
			title: 'Estado Unidad del Proyecto',
			dataIndex: 'projectUnitStatus',
			key: 'projectUnitStatus',
			width: 40,
			...getColumnSearchProps('projectUnitStatus'),
		},
	];
	const trackingClients = [
		{
			title: 'Código',
			width: 50,
			dataIndex: 'id',
			key: 'id',
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: 'Fecha',
			width: 70,
			dataIndex: 'sale_date',
			key: 'sale_date',
			sorter: (a, b) => a.sale_date - b.sale_date,
		},
		{
			title: 'Proyecto',
			dataIndex: 'project_name',
			key: 'project_name',
			width: 100,
			...getColumnSearchProps('project'),
		},
		{
			title: 'Unidad',
			dataIndex: 'label_unit',
			key: 'label_unit',
			width: 70,
			sorter: (a, b) => a.unit - b.unit,
		},
		{
			title: 'Cód. Fiduciario',
			dataIndex: 'fiduciary_code',
			key: 'fiduciary_code',
			width: 70,
			...getColumnSearchProps('trustCode'),
		},
		{
			title: 'Valor Unidad',
			dataIndex: 'unit_value',
			key: 'unit_value',
			width: 70,
			sorter: (a, b) => a.unitValue - b.unitValue,
		},
		{
			title: 'Valor Reformas',
			dataIndex: 'reform_value',
			key: 'reform_value',
			width: 70,
			sorter: (a, b) => a.reformsValue - b.reformsValue,
		},
		{
			title: 'Valor Total',
			dataIndex: 'total_value',
			key: 'total_value',
			width: 70,
			sorter: (a, b) => a.totalValue - b.totalValue,
		},
		{
			title: '# CI Recaudo',
			dataIndex: 'percentage_collected',
			key: 'percentage_collected',
			width: 70,
			...getColumnSearchProps('ciCollection'),
		},
		{
			title: 'Legalizacion',
			dataIndex: 'percentage_of_legalization',
			key: 'percentage_of_legalization',
			width: 70,
			...getColumnSearchProps('legalization'),
		},
		{
			title: 'Observaciones',
			dataIndex: 'observation',
			key: 'observation',
			width: 100,
			...getColumnSearchProps('observations'),
		},
		{
			title: 'Acciones',
			key: 'acciones',
			fixed: 'right',
			width: 60,
			render: (_, record) => getActionsSales(record),
		},
	];

	

	const { TabPane } = Tabs;

	


	return (
		<>
			<Divider orientation="left">Tablas</Divider>
			<Tabs defaultActiveKey="1" >
				<TabPane
					tab={
						<span>
              Datos de Cotizaciones
          </span>
					}
					key="1"
				>
					<TableComponent data={quotations} columns={separateUnits} x={1100} y={300} />
				</TabPane>
				<TabPane
					tab={
						<span>
              Datos de Compras
          </span>
					}
					key="2"
				>
					<TableComponent data={sales} columns={trackingClients} x={1800} y={300} />
				</TabPane>
				<TabPane
					tab={
						<span>
              Actividades
          </span>
					}
					key="3"
				>
					<div style={{ display: "inline-flex", marginLeft: '77%', marginBottom: '0.5%' }}>
						<Button style={{ marginRight: 10 }} type="primary">Imprimir</Button>
						<CustomerRegisterActivities myClick={props.myOnClick} customerData={customerData} />
					</div>
					<TableComponent  data={customerActivitiesModel} x={1300} y={300} />
				</TabPane>
			</Tabs>
			{visibleModalReformRequest && <ModalDetailReform idSale={recordSelected?.id}  visibleModal={visibleModalReformRequest} handleCancel={handleCancelReformRequest} onClose={setVisibleModalReformRequest}/>}
		</>

	);
}

export default CustomerTables;