import React from 'react';
import { Checkbox, Row, Col } from 'antd';

const CheckboxComponent = (props) => {
	return(
		<Checkbox.Group style={{ width: '100%' }} >
			{props.values.map(item => (
				<Row>
					<Col span={24}>
						<Checkbox key={item?.id+item?.name+item?.id} disabled value={item}>{item}</Checkbox>
					</Col>
				</Row>
			))}
  </Checkbox.Group>
	);
}

export default CheckboxComponent;