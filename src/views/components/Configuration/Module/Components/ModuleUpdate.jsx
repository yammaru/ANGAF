import { ModuleContext } from './ModuleProvider';
import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { Form, Input, Button, Modal, Tooltip, Checkbox, Space, Select } from 'antd';
import { updateModuleById, fetchAllModule } from '../../../../../redux/actions/Configuration/ModuleAction';

const ModuleUpdate = () => {
	
	const resource = useSelector((state) => state?.resource);
	const {module} = useContext(ModuleContext);
	const [form] = Form.useForm();

	const [isModalVisible, setIsModalVisible] = useState();


	// eslint-disable-next-line no-template-curly-in-string
	const validateMessages = {required: '${label} es requerido'};
	const textEditar = <span style={{color: '#6A6963'}}>Editar	</span>
	const dispatch = useDispatch();


	const onClose = () => {
		setIsModalVisible(false);
		form.resetFields();
	}

	const onReset = () => form.resetFields();

	const showModal = () => {
		setIsModalVisible(true);


	};

	const fillFields = () => {
		form.setFieldsValue({
			name: module.name,
			resourceId: module.resourceId,
			id: module.id,
			"actions": module.actions,
			state: module?.state,
		});
	}

	const onFinish = async () => {
		const values = await form.validateFields();
		values.resource_id = values.resourceId;
		let actions = [];
		if (values.actions) {
			for (let action of values.actions) {
				if (action) {
					if (actions.findIndex(x => x.toLowerCase() === action.action.toLowerCase()) === -1) {
						actions.push(action.action);
					}
				}
			}
		}
		values.actions = actions;
		dispatch(
			updateModuleById(module.id, values, async (response) => {
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


	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textEditar}>
				<Button 
						type="primary"
						style={{backgroundColor: '#ffa247', borderColor: '#ffa247'}}
						size={'small'}
						onClick={ () => {showModal();fillFields()}} icon={<EditOutlined/>}/>
			</Tooltip>
			<Modal
				title={'Actualizar módulo'}
				centeredv
				visible={isModalVisible}
				footer={false}
				onCancel={onClose}
			>
				<Form.Item
	label={<label style={{color: "red"}}>Los campos en blanco y/o repetidos seran borrado al momento de
		guardar</label>}/>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{height: '100%', width: "100%"}}
					form={form}
					onFinish={onFinish}
					validateMessages={validateMessages}
				>

					<Form.Item
						label='Nombre: '
						name='name'
						rules={[
							{
								required: true,
								validator: async (_, name) => {
									let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
									let spaces = /^(?!\s)/;
									if (name.length < 3) {
										return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
									} else if (!chars.test(name)) {
										return Promise.reject(new Error('El nombre no puede contener números.'));
									} else if (!spaces.test(name)) {
										return Promise.reject(new Error('Nombre no válido'));
									}
								}
							},
						]}
					>
						<Input
							value={module.name}
						/>
					</Form.Item>
					<Form.Item
						label='modulo padre: '
						name='module_father_id'
						style={{display:"none"}}
					>
						<Input
						
						/>
					</Form.Item>
					<Form.Item
						label='ruta: '
						name='route_front'
						style={{display:"none"}}
					>
						<Input 
						
						/>
					</Form.Item>
					<Form.Item
						label="Recurso"
						name="resourceId"
						rules={[{required: true}]}

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
								!Array.isArray(resource) && resource._payload?.map(item => (
									<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
								))
							}
						</Select>
					</Form.Item>


					<Form.List name='actions'
					>

						{(fields, {add, remove}, {}) => (
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
											}}/>

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


export default ModuleUpdate;