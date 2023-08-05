import { Layout, Card } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Slider from "./components/Slider";
import PaginationTables from "./components/PaginationTables";
import PageHeaderComponent from "./components/PageHeader";
import { validatePermission , getPermissionLocalStorage	} from "../../handle/PermissionMethods/PermissionMethods";
import * as constants from "../../../redux/constants";
import {useSelector} from 'react-redux';

const Dashboard = () => {

	const generalSetting = useSelector((state) => state?.generalSetting._payload);
	const userPermission = useSelector((state) => getPermissionLocalStorage());
	const [permission, setPermission] = useState(false);
	useEffect(() => {
		setPermission(validatePermission(constants.SHOW_ADVERSITING_IMAGES_PERMISSION));
	},[generalSetting,userPermission]);		

	return(
		<Fragment>
	
			<Card>
				<PageHeaderComponent name="Dashboard" />
				{permission ? 
				<Slider/>
				:<></>
				}
				<br/><br/>
				<Layout style={{ padding: 20 }}> <PaginationTables /> </Layout>
			
			</Card>	
		</Fragment>
	);
}

export default Dashboard;
