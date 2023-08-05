import {Button, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getColumnSearchProps} from "../../../../handle/HandleFilterTable/handleFilterTable";
import {fetchAllGeneralActivity} from "../../../../../redux/actions/Configuration/GeneralActivityAction";
import { formatoFecha } from "../../../../handle/Dashboard/DashboardHandle";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const MonitoringOfGeneralActivities = () => {
	const [loading,setLoading]=useState(true);
	const generalActivities = useSelector(state => state['generalActivity']);
	const dispatch = useDispatch();
	
	useEffect(()=>{
		setLoading(true);
		dispatch(fetchAllGeneralActivity(async (response) => {
			await response;
		if(response?.statusCode==200){
			setLoading(false)
		}else{
			setLoading(false)
		}
		}));	
	
	
		
	},[])
	
	
	function getTagDaysRemainingActivity(record) {
		if (record['done']) {
			return <Tag color={"blue"}> {record['activity_status']} </Tag>;
		} else {
			if (record['is_overdue'])
				return <Tag color={"red"}> {record['activity_status']} </Tag>;
			else
				return <Tag color={"green"}> {record['activity_status']} </Tag>;
		}
	}
	const generalActivitiesTracking = [
		{
			title: "#",
			width: 50,
			dataIndex: "id",
			key: "id",
			defaultSortOrder: 'descend',
			fixed: "left",
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Usuario Creador",
			width: 100,
			dataIndex: "creator",
			key: "creator",
			...getColumnSearchProps('creator'),
		},
		{
			title: 'Actividad',
			dataIndex: 'activity',
			key: 'activity',
			width: 150,
			align: 'center',
			
		},
		{
			title: "Programada",
			dataIndex: "scheduled",
			key: "scheduled",
			width: 80,
			render: (_, record) => {
				return formatoFecha(record?.scheduled)
			}

		},
		{
			title: "Dias de Vencimiento",
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
			title: "Usuario",
			dataIndex: "executing",
			key: "executing",
			width: 100,
			...getColumnSearchProps('executing'),
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
						<Link to={`/settings/general-activities/${parseInt(record?.id)}`}>
							<Button
								size="small"
								icon={<ArrowRightOutlined style={{ color: '#f0ad4e' }}/>}
								type="ghost"
							/>
						</Link>
					//) : null
					}
				</>
			)
		}
	];
	return <Table 
		size='small'
		columns={generalActivitiesTracking}
		dataSource={generalActivities?.filter(x=>x?.done=="0")}
		scroll={{x: 400}}
		loading={loading}
	/>
}

export default MonitoringOfGeneralActivities