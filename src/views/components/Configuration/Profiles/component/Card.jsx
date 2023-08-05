import React from 'react';
import Checkbox from "./CheckBox";
import { Card, Row, Col } from 'antd';

const CardPermission = (props) => {
	return(
		<Row justify="center" align="middle">
			<Col style={{ bottom: 50 }}>
				<Card bordered={false} size="small" style={{ width: 250, textAlign: 'justify' }}>
					<Checkbox key={props.permissions} values={ props.permissions } />
				</Card>
			</Col>
		</Row>
	);
}

export default CardPermission;