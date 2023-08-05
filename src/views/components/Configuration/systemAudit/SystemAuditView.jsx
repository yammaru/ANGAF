import React, {useState} from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Drawer, Button, Col, Row ,Input,Form, Tooltip} from 'antd';

const SystemAuditView = (props) => { 


    const [form] =  Form.useForm();
    const text= <span style={{color:'#6A6963'}}>Ver</span>
    const [ type ] = useState(props.record.type_id);
    const [ user ] = useState(props.record.user);
    const [ class_name ] = useState(props.record.class_id);
    const [ ip ] = useState(props.record.ip); 
    const [ creation_date ] = useState(props.record.created_at);
    const [ final_state ] = useState(JSON.stringify(props.record.final_state) );
	const fillFields = () => {
		form.setFieldsValue({
			type,
            user,
            ip,
            class_name,
            creation_date,
            final_state
		});
	}
    const [visible, setVisible] = useState(false);
    const showDrawer = () => { setVisible(true);fillFields(); };
    const onClose = () => { setVisible(false); };

    return(
		<>
            <Tooltip placement="left" color='#ffffff' title={text}>
                <Button
    onClick={showDrawer}
    type="primary" size="small"
    icon={<EyeOutlined/>}/>
            </Tooltip>
			<Drawer
				title="Ver Auditoría del Sistema"
				width='auto'
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={null}
			>
				<Form layout="vertical"  size='middle' form={form}>
				<Row gutter={16}>
						<Col span={12}>
							<Form.Item 	name="type" label="Tipo" >
								<Input 
								value = {type}
								disabled={true} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="class_name" label="Clase" >
								<Input disabled={true} 
								value={class_name} />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item name="user" label="Usuario" >
								<Input
                                 value = {user}
                                 disabled={true}  />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name="creation_date" label="Fecha" >
								<Input  disabled={true}
                                    value={creation_date}
                                />
                                
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="ip" label="Ip" >
								<Input  disabled={true} 
                                    value = {ip}
                                />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item name="final_state" label="Estado final" >
								<Input.TextArea 
                                    disabled={true} rows={4} 
                                    value={final_state[0]?.email}
                                 />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};

export default SystemAuditView;