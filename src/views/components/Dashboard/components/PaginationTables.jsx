import {Tabs, Divider} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";



const PaginationTables = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		
		console.log("llegamos");
		
	}, [dispatch]);
	
	const {TabPane} = Tabs;
	return (
		<Divider orientation="left">Tablas</Divider>
			
	);
}

export default PaginationTables;