import React from 'react';
import { Button,Tooltip } from "antd";
import { getFormatDate } from '../../handle/HandleDatePicker/HandleDate';
import { InfoOutlined } from '@ant-design/icons';

export const TootipInfo = (record) => {
		let createdAt = getFormatDate(record.created_at);
		let updatedAt = getFormatDate(record.updated_at);
		const text = <span style={{ color: '#6A6963' }}> Creado: {createdAt} <br />  Modificado: {updatedAt} </span>
		return ( 
			<>
				<Tooltip placement="left" color='#ffffff' title={text}>
					<Button size='small' type="primary" icon={<InfoOutlined size='small'/>}/>
				</Tooltip>
			</>
		);
}

export default TootipInfo;