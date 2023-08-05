import moment from "moment";
import {useSelector} from "react-redux";
import React, {useContext, useEffect} from "react";
import {GeneralActivitiesContext} from "./GeneralActivitiesProvider";
import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import { dateFormat } from '../../../../handle/HandleDatePicker/HandleDate';

const config = {
	rules: [
		{
			type: 'object',
			required: true,
			message: '¡Por favor selecciona!',
		},
	],
};

const GeneralActivitiesForm = ({textAction, onClose}) => {

	const [form] = Form.useForm();
	const  {context}  = useContext(GeneralActivitiesContext);
	
	const onFinish = context.generalActivity ? context.onFinishUpdate : context;
	// eslint-disable-next-line no-template-curly-in-string
	const validateMessages = { required: '${label} es requerido'};
	const users = useSelector(state => state['users']);
	const onReset = () => form.resetFields();

	useEffect(() => {
		if(context.generalActivity != null || context.generalActivity !== undefined){
			fillFields();
		}
	}, [context]);

	const fillFields = () => {
		form.setFieldsValue({
			scheduled: moment(context.generalActivity.scheduled),
			activity: context.generalActivity.activity,
			user_id: context.generalActivity.executing_user_id,
		})
	}

	const onAccept = async () => {
		
		let values = await getDataForm();
		if(isActionRegister()){
			await onFinish(values);
			onClose();
			onReset();
		}
		else {
			await onFinish(context.generalActivity.id, values);
			onClose();
		}	
		
			
	}

	const isActionRegister = () => {
		return !context.generalActivity;
	}

	const getDataForm = async () => {
		const values = await form.validateFields();
		return {
			...values,
			scheduled : values['scheduled'].format(dateFormat)
		}
	}

	return (
		<>
			<Form
				validateMessages={validateMessages}
				form={form}
				onFinish={onAccept}
				layout="vertical"
				style={{ height: '100%', width: "100%" }}
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Form.Item
							name="user_id"
							label="Usuario"
							rules={[{ required: true }]}
						>
							<Select
								showSearch
								style={{ width: '100%' }}
								placeholder="Selecciona un usuario"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								<Select.Option value="">Seleccione...</Select.Option>
								{!Array.isArray(users) && users['_payload']?.map((item) => (
									<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Form.Item name='scheduled'
							 label="Fecha de expiración"
							 {...config}
							 rules={[{ required: true, message: 'La fecha es requerida', }]}>
							<DatePicker format={dateFormat} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={48}>
					<Col xs={24} sm={24} md={12} lg={24} xl={24}>
						<Form.Item
							label="Actividad"
							name="activity"
							rules={[{ required: true }]}>
							<Input.TextArea/>
						</Form.Item>
					</Col >
				</Row>
				<Row>
					<Form.Item >
						<Button type="primary" htmlType="submit" >
							{textAction}
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</>
	);
}

export default GeneralActivitiesForm;