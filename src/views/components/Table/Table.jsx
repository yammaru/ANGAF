import React from "react";
import { Table, Row, Col, Tag, Button } from "antd";
import * as constants from "../../../redux/constants";
import './css/index.scss'
import { convertAllMapDataState } from "../../handle/HandleFilterTable/handleFilterTable";
import CustomerUpdateActvities from "../Customers/Componets/Activity/CustomerUpdateActivities";
import { recomposeColor } from "@material-ui/core";
import { validatePermission } from "../../handle/PermissionMethods/PermissionMethods";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { formatoFecha, getTagDaysRemainingActivity } from "../../handle/Dashboard/DashboardHandle";

const TableComponent = (props) => {


 
	const CustomerActivitiesColums = [
		{
			title: '#',
			width: "4%",
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: 'Usuario',
			width: "6%",
			dataIndex: 'creatorUser',
			key: 'creatorUser',
			align: 'center',
		},
		{
			title: 'Programada',
			dataIndex: 'scheduleDate',
			key: 'scheduleDate',
			width: "8%",
			align: 'center',
			render: (_, record) => {
				return formatoFecha(record?.scheduleDate)
			}
		},
		{
			title: 'Tipo de Actividad',
			dataIndex: 'typeActivity',
			key: 'typeActivity',
			width: "10%",
			align: 'center',
		},
		{
			title: 'Tipo de Gestion',
			dataIndex: 'managementType',
			key: 'managementType',
			width: "10%",
			align: 'center',
		},
		{
			title: 'Actividad',
			dataIndex: 'activity',
			key: 'activity',
			width: "20%",
			
		},
		{
			title: 'Realizada',
			dataIndex: 'activityPerformed',
			key: 'activityPerformed',
			width: "8%",
			align: 'center',
			render: (_, record) => getActions(record.id , record.activityPerformed)
		},
		{
			title: 'Comentario',
			dataIndex: 'commentary',
			key: 'commentary',
			width: "20%",
			render : (_, record) => (record.commentary != null) ? record.commentary : null
		}
	];
	const CustomerActivitiesColumsDashBoard = [
		{
			title: '#',
			width: 40,
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: 'Cliente',
			width: 100,
			dataIndex: 'customer_name',
			key: 'customer_name',
			align: 'center',
			
		},
		{
			title: 'Actividad',
			dataIndex: 'activity',
			key: 'activity',
			width: 150,
			align: 'center',
			
		},
		{
			title: 'Fecha Programada',
			dataIndex: 'scheduleDate',
			key: 'scheduleDate',
			width: 150,
			align: 'center',
			render: (_, record) => {
				return formatoFecha(record?.scheduleDate)
			}


		},
		{
			title: 'Días Vencimiento',
			dataIndex: 'scheduleDate',
			key: 'scheduleDate',
			width: 150,
			align: 'center',
			render: (_, record) => getTagDaysRemainingActivity(record?.scheduleDate)
		},
		{
			title: 'Asesor',
			width: 100,
			dataIndex: 'creatorUser',
			key: 'creatorUser',
			align: 'center',
			
		},
		{
			title: 'Acciones',
			dataIndex: 'activityPerformed',
			key: 'activityPerformed',
			width: 150,
			align: 'center',
			render: (_, record) =>(
				<>
					{//validatePermission(constants.SHOW_CUSTOMERS_TRACKING_PERMISSION) ? (
						<Link to={`/customer/customer-tracking/${record?.customer_id}`}>
							<Button
								size="small"
								icon={<SearchOutlined style={{ color: '#f0ad4e' }}/>}
								type="ghost"
							/>
						</Link>
					//) : null
					}
				</>
			)
		}
	];
	
	const getActions = (id, activityPerformed) => {
		
		return (
			<>
				{activityPerformed == null ? <CustomerUpdateActvities myClick={props.myOnClick} id={id} activityPerformed={activityPerformed} /> :formatoFecha( activityPerformed)}
			</>
		);

	}
	const isDashboardColumns=()=>{
		if(window.location.pathname.toLowerCase().includes('dashboard')){
			return CustomerActivitiesColumsDashBoard;
		}else {
			return CustomerActivitiesColums;
		}			
	  }
	  
	return <Row>
		<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
			<Table
				columns={isDashboardColumns()}
				dataSource={convertAllMapDataState(props?.data)}
				size='small'
				scroll={{ x: props.x, y: props.y }}
				bordered={true}
				loading={props?.loading}
			/>
		</Col>
	</Row>

}

export default TableComponent;
