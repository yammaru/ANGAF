import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as constants from "../../../../../redux/constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Modal, Select, Space } from 'antd';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { creatModule, fetchAllModule } from '../../../../../redux/actions/Configuration/ModuleAction';

const ModuleRegister = () => {

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const resource = useSelector((state) => state?.resource);

	const showModal = () => {
		setIsModalVisible(true);
	}

	const onReset = () => {
		form.resetFields();
	}

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
	};

	

	const onClose = () => {
		form.resetFields();
		setIsModalVisible(false);
	}

	
	const handleSubmit = async () => {
		const values = await form.validateFields();
		//values.state = state;

		let actions = [];
		if(values.actions){
			for(let action of values.actions){
				if(action){
					if(actions.findIndex(x=>x.toLowerCase() === action.action.toLowerCase())===-1){
						actions.push(action.action);
					}
				}
			}
		}
		values.actions = actions;
		dispatch(
			creatModule(values, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success("Se ha registrado con éxito");
					onReset();
					onClose();
					dispatch(fetchAllModule());
				}
			}, async (error) => {
				errorGlobal(error);
			})
		);

	};
	
	
	if (!validatePermission(constants.CREATE_MODULE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Nuevo
			</Button>
			<Modal
				footer={false}
				title="Nuevo módulo"
				visible={isModalVisible}
				onCancel={onClose}
			>
				<Form.Item label={<label style={{color: "red"}}>Los campos en blanco y/o repetidos seran borrado al momento de
	guardar</label>}/>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{height: '100%', width: "100%"}}
					onFinish={handleSubmit}
					form={form}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre"
						name="name"
						rules={[{
							required: true,
							min: 3,
							max: 100,
							validator: async (_,) => {
								let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
								let spaces = /^(?!\s)/;
								if (name !== '') {
									if (name.length < 3) {
										return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
									} else if (!chars.test(name)) {
										return Promise.reject(new Error('El nombre no puede contener números.'));
									} else if (!spaces.test(name)) {
										return Promise.reject(new Error('Nombre no válido'));
									}
								} else {
									return Promise.reject(new Error('Nombre vacío.'));
								}

							}
						}]}
					>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Item>
					<Form.Item
						label="Recurso"
						name="resource_id"
						rules={[{
							required: true,

						}]}
					>
						<Select

							showSearch
							placeholder="Selecciona un recurso"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
							style={{width: '100%'}}
						>
							<Select.Option value="">Seleccione...</Select.Option>
							{
								!Array.isArray(resource)  && resource._payload.map(item => (
									<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
								))
							}
						</Select>
					</Form.Item>

					<Form.List name='actions'>
						{(fields, {add, remove}) => (
							<>
								<Form.Item>
									<Button onClick={() => {
										add()
									}} block icon={<PlusOutlined/>}>
										Agregar Accion
									</Button>
								</Form.Item>
								{
									fields.map(field => (
										<Space key={field.key} style={{display: 'flex', marginBottom: 8}}
											   align="baseline">
											<Form.Item
												label={""}
												{...field}
												name={[field.name, 'action']}
												fieldKey={field.fieldKey}
												id={field.fieldKey}
											>
												<Input style={{width: '450px'}} placeholder='Aqui la Accion'/>
											</Form.Item>
											<MinusCircleOutlined onClick={() => {
												remove(field.name);
											} }/>
										</Space>
									))}
							</>
						)}
					</Form.List>
					
					
					<Form.Item valuePropName={"checked"}
							   label="Estado"
							   name="state">
						<Checkbox>
							Activo
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{position: 'absolute', right: 1, top: 20}}>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>

		</>
	);
};
export default ModuleRegister;