import {Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {formatterMoney} from "../../../../handle/FormatterMoney/FormatterMoney";
import {CollectionManagementGet} from "../../../../../redux/actions/Dashboard/Dashboard";
import {getColumnSearchProps} from "../../../../handle/HandleFilterTable/handleFilterTable";

const CollectionManagement = () => {
	const dispatch = useDispatch()
	const [collectionManagement,setCollectionManagement] = useState([])
	const [loading,setLoading]=useState(true);
	useEffect(()=>{
		setLoading(true);
		dispatch(CollectionManagementGet(async (response)=>{
			const res = await response
			setCollectionManagement(res._payload)
			setLoading(false);
		},()=>{}))
	},[])
	
	const CollectionStatus = (record) => {
		if (parseFloat(record.totalCollection) < 48){
			return <Tag color={"red"}> CRITICO </Tag>;
		}
		if (parseFloat(record.totalCollection) > 48 &&parseFloat(record.totalCollection) < 80){
			return <Tag color={"blue"}> REGULAR </Tag>;
		}
		if (parseFloat(record.totalCollection) > 80){
			return <Tag color={"green"}> NORMAL </Tag>;
		}
	}
	
	const GestionDeRecaudo = [
		{
			title: '#',
			width: 100,
			dataIndex: 'id',
			key: 'id',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: 'Asesor',
			width: 100,
			dataIndex: 'adviser',
			key: 'adviser',
			...getColumnSearchProps('adviser'),
		},
		{
			title: 'Proyecto',
			dataIndex: 'project',
			key: 'project',
			width: 150,
			...getColumnSearchProps('project'),
		},
		{
			title: 'Cliente',
			dataIndex: 'customer',
			key: 'customer',
			width: 150,
			...getColumnSearchProps('customer'),
		},
		{
			title: 'Estado',
			dataIndex: 'state',
			key: 'state',
			width: 100,
			render: (_,record) => CollectionStatus(record)
		},
		{
			title: '% Recaudo Total',
			dataIndex: 'totalCollection',
			key: 'totalCollection',
			width: 120,
			...getColumnSearchProps('totalCollection'),
		},
		{
			title: 'Saldo Pendiente a la Fecha',
			dataIndex: 'balanceOutstandingDate',
			key: 'balanceOutstandingDate',
			width: 170,
			...getColumnSearchProps('balanceOutstandingDate'),
			render: (text) => formatterMoney.format(text)
		},
		{
			title: '# Gestiones de Recaudo',
			dataIndex: 'collectionManagement',
			key: 'collectionManagement',
			width: 140,
			...getColumnSearchProps('collectionManagement'),
		},
	];
	return <Table 
		columns={GestionDeRecaudo}
		dataSource={collectionManagement} 
		y={400}
		loading={loading}
	/>
}

export default CollectionManagement