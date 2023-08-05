import { Layout } from "antd";
import { connect } from 'react-redux';
import React, { Fragment } from "react";
import Routes from '../../config/router/Routes';
import NavMenu from "../Layout/components/NavMenu";
import FooterComponent from "../Layout/components/FooterComponent";
import HeaderComponent from "../Layout/components/HeaderComponent";
import { logoutUser } from '../../../redux/actions/Configuration/authAction';

const { Content } = Layout;

const LayoutComponent = ({user, dispatchLogoutAction}) => {
	
	return (
		<Fragment>
			<Layout>
				<NavMenu/>
				<Layout>
					<HeaderComponent 
					/>
					<Content
						style={{
							padding: "93px 30px 50px 100px",
							overflow: "initial",
						}}
					>
						{/* RUTAS */}
						<Routes />
            {/* END RUTAS */}
					</Content>
					<FooterComponent />
				</Layout>
			</Layout>
		</Fragment>
	);
};


export default 	LayoutComponent;
