import React, { useState} from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Drawer, Button, Divider, Descriptions, Tooltip} from 'antd';


const ErrorDrawer = (props) => {

	const [visible, setVisible] = useState(false);
  const showDrawer = () => { setVisible(true); };
  const onClose = () => { setVisible(false); };
  const text= <span 	style={{color:'#6A6963'}}	>Ver</span>
	return(
		<>
    <Tooltip placement="left" color='#ffffff' title={text}>
      <Button onClick={showDrawer} type="primary" size="small" icon={<EyeOutlined/>}/>
    </Tooltip>
			<Drawer
				title="Ver auditoría del sistema"
				width='900'
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={null}
			>
				<Descriptions title={'Petición'} >
					<Descriptions.Item  label="Fecha">{props.record.created_at}</Descriptions.Item>
					<Descriptions.Item  label="Tipo petición">{props?.record?.petition_type}</Descriptions.Item>
					<Descriptions.Item label="URL">{props.record.url}</Descriptions.Item>
					<Descriptions.Item label="IP">{props.record.ip}</Descriptions.Item>
					<Descriptions.Item label="Datos">{props.record.response}</Descriptions.Item>
				</Descriptions>
				<Divider/>
				<Descriptions title={'Respuesta'} >
					<Descriptions.Item  label="Mensaje">
						{props.record.message}
					</Descriptions.Item>
				</Descriptions>
				<Divider/>
				<Descriptions title={'Token usuario auntenticado'} >
					<Descriptions.Item  label="Token">{props?.record?.request_token} </Descriptions.Item>
				</Descriptions>
			</Drawer>
		</>
	);
}

export default ErrorDrawer