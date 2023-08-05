import moment from 'moment';
import {connect, useDispatch} from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { AdviserContext } from './AdviserProvider';
import React, { useState, useContext } from "react";
import { RUTA_API_MULTIMEDIA } from "../../../../redux/constants";
import { updateAssessorById, fetchAllAssessor } from '../../../../redux/actions/Configuration/AssesorAction';
import { Tooltip, Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Checkbox, Upload, notification } from 'antd';

const validateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: '${label} es requerido',
	types: {
		// eslint-disable-next-line no-template-curly-in-string
		email: '${label} no es un Correo válido',
		// eslint-disable-next-line no-template-curly-in-string
		number: '${label} Debe ser número',
	},
};

const AdviserUpdate = ({ afiliatedCompanies, dispatchUpdatedAdviserAction, dispatchFetchAllAssessorAction }) => {

	const [form] = Form.useForm();
	const { adviser } = useContext(AdviserContext);
	const formatDate = Date.parse(adviser.birthday);
	let dt = new Date(formatDate);
	const formattedBirthdate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
	const [fileList, setFileList] = useState([{ url: adviser.path }]);
	const [id] = useState(adviser.id)
	const [identification, setIdentification] = useState(adviser.identification)
	const [name, setName] = useState(adviser.name)
	const [email, setEmail] = useState(adviser.email)
	const [password, setPassword] = useState(adviser.password)
	const [phone_number, setPhone] = useState(adviser.phone_number)
	const [address, setAddress] = useState(adviser.address)
	const [area, setBranchOffice] = useState(adviser.area)
	const [affiliated_company, setAfiliatedCompany] = useState(adviser.affiliated_company)
	const [birthday, setBirthday] = useState(formattedBirthdate)
	const [state, setState] = useState(adviser.state)
	const [stateImage, setStateImage] = useState(adviser.path)
	const [visible, setVisible] = useState(false);

	const text = <span style={{ color: '#6A6963' }}>Editar</span>
	const errors = [];
	const companyArraySelec = [];
	const companySelec = [];
	const dateFormat = 'YYYY/MM/DD';

	const dispatch = useDispatch();

	const updateStateAdvisers = () => {
		setName(adviser.name);
		setPassword(adviser.password);
		setEmail(adviser.email);
		setPhone(adviser?.phone_number);
		setAddress(adviser?.address.toString());
		setBranchOffice(adviser?.area.toString());
		setAfiliatedCompany(adviser?.affiliated_company_id);
		setBirthday(formattedBirthdate);
		setState(adviser?.state);
		setStateImage(adviser?.path)
	}
	const adviserRequest = {
		identification,
		name,
		email,
		password,
		phone_number,
		address,
		area,
		affiliated_company,
		birthday,
		state,
		image: stateImage
	}
	
	for (let key in afiliatedCompanies) {
		if (key === "_payload") {
			let companyFill = afiliatedCompanies[key];
			for (let index = 0; index < companyFill.length; index++) {
				companyArraySelec.push(companyFill[index]);
			}
		}
	}
	for (let i = 0; i < companyArraySelec.length; i++) {
		companySelec.push(companyArraySelec[i]);
	}

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		if (newFileList.length !== 0) {
			if (fileList[0] !== undefined) {
				if (fileList[0].thumbUrl !== undefined && fileList[0].thumbUrl !== "") {
					setStateImage(fileList[0].thumbUrl);
				}
			}
		}else {
			setStateImage(null);
		}
	};
	const onPreview = async file => {
		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	const captureDate = (date) => {
		if (date != null) {
			setBirthday(date.format(dateFormat));
			onAgeChange(getAgeOfDate(date));
		} 
	}																																											
	const getAgeOfDate = (fecha) => {
		let actuallyDate = new Date();
		let dateBirth = new Date(fecha);
		let age = actuallyDate.getFullYear() - dateBirth.getFullYear();
		let month = actuallyDate.getMonth() - dateBirth.getMonth();
		if (month < 0 || (month === 0 && actuallyDate.getDate() < dateBirth.getDate())) {
			age--;
		}
		return age;
	}
	
	const onReset = () => {
		form.resetFields();
		setStateImage('');
	};
	const onClose = () => {
		onReset();
		setVisible(false);
	};

	const fillFields = () => {
		form.setFieldsValue({
			identification,
			name,
			password,
			email,
			phone_number,
			address,
			state,
			affiliated_company,
			area,
			birthday
		});
	}
	
	const showDrawer = () => {
		setVisible(true);
		updateStateAdvisers();

	};
	const onAgeChange = (date) => {
		form.setFieldsValue({
			age: date,
		});
	};
	const sendData = () => {
		dispatchUpdatedAdviserAction(id, adviserRequest, (response) => {
			if (response.error) {
				error(response.message);
			} else {
				dispatch(fetchAllAssessor());
				success('Asesor actualizado');
			}
		});
		dispatchFetchAllAssessorAction();
	};
	const success = (response) => {
		openNotificationWithIcon('success', response);
		onClose();
		onReset();
	}	
	const error = (response) => {
		for (let key in response) {
			errors.push(`${response[key][0]}`);
		}
		openNotificationWithIcon('error', errors);
		onClose();
		onReset();
	}
	const openNotificationWithIcon = (type, message) => {
		notification[type]({
			message: `${type}:`,
			description:
				`${message.toString()}`
		});
	};

	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={text}>
				<Button
					type="primary"
					size='small'
					style={{ background: '#ffa247', borderColor: '#ffa247' }}
					onClick={() => {showDrawer();fillFields()}}
					icon={<EditOutlined />} />
			</Tooltip>

			<Drawer
				title="Editar asesor"
				width='auto'
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					layout="vertical"
					autoComplete="off"
					size='middle'
					onFinish={sendData}
					form={form}
					onClose={onClose}
					validateMessages={validateMessages}
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item name='image' label='Foto Asesor'>
								<Upload
									name="avatar"
									action={RUTA_API_MULTIMEDIA}
									listType="picture-card"
									fileList={fileList}
									onChange={onChange}
									onPreview={onPreview}
									accept="image/*"
									maxCount={1}
								>
									{(fileList.length < 1) ? '+ Upload' : ''}
								</Upload>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={18} lg={18} xl={18}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="identification"
										label="Identificación"
										rules={[
											{
												required: true,
												message: 'Identificación es requerida',
											},
											() => ({
												validator(_, value) {
													if (!isNaN(value || value === '')) {
														return Promise.resolve();
													}
													return Promise.reject(new Error('La identificación debe ser numerica'));
												},
											}),
										]}
									>
										<Input
											placeholder="Por favor ingresar su identificación"
											value={identification}
											onChange={(e) => setIdentification(e.target.value)}
											disabled
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="name"
										label="Nombre"
										rules={[{
											required: true,
											min: 3,
											max: 100,
											validator: async (_, name) => {
												let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
												let spaces = /^(?!\s)/;
												if (name.length < 3) {
													return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
												} else if (!chars.test(name)) {
													return Promise.reject(new Error('El nombre no puede contener números.'));
												} else if (!spaces.test(name)) {
													return Promise.reject(new Error('Nombre no válido'));
												} else {
													setName(name);
												}
											}
										}]}
									>
										<Input placeholder="Por favor ingresar su nombre"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="email"
								label="Email"
								rules={[{ required: true, type: 'email' }]}
							>
								<Input placeholder="Por favor ingresar su email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="password"
								label="Password"
								hasFeedback
								rules={[
									{
										min: 7,
										max: 11,
										required: true,
										validator: async (_, password) => {
											if (password?.length < 7) {
												return Promise.reject(new Error('La contraseña debe tener al menos 7 dígitos.'));
											}}
									},
								]}
							>
								<Input.Password placeholder="Contraseña"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="confirm"
								label="Confirmar contraseña"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										message: 'Por favor confirme su contraseña',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('Las dos contraseñas deben ser iguales'));
										},
									}),
								]}
							>
								<Input.Password placeholder="Repita contraseña" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="phone_number"
								label="Teléfono"
								rules={[
									() => ({
										validator(_, value) {
											if (!isNaN(value || value === '')) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('Teléfono Debe Ser Numerico'));
										},
									}),
								]}
							>
								<Input placeholder="Por favor ingresar su Teléfono"
									value={phone_number}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="address"
								label="Dirección"
							>
								<Input placeholder="Por favor ingresar la direccion"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="area"
								label="Surcusal/Zona"
							>
								<Input placeholder="Por favor ingresar la surcusal"
									value={area}
									onChange={(e) => setBranchOffice(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="affiliated_company"
								label="Compañía asociada"
							
							>
								<Select
									showSearch
									placeholder="Por favor elegir la compañía asociada"
									optionFilterProp="children"
									onChange={setAfiliatedCompany}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: '100%' }}
								>
									<Select.Option value={0}>Seleccione...</Select.Option>
									{
										companySelec.filter(x => x.state !== false).map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								label="Fecha de nacimiento"
								rules={[
									{ required: false },
									() => ({
										validator(_, value) {
											if (value._d < moment()) {
												return Promise.resolve();
											} else {
												return Promise.reject(new Error('Fecha mayor a la actual'));
											}
										},
									}),
								]}
							>
								<DatePicker style={{ width: '100%' }}
									defaultValue={moment(formattedBirthdate, dateFormat)}
									format={dateFormat}
									onChange={(value) => captureDate(value)}
									disabled
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item name='age' label=' '>
								<Input style={{ width: '100%' }} defaultValue={getAgeOfDate(dt)}  placeholder="Edad" disabled={true} />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item>
								<Checkbox
									name='state'
									checked={state}
									onChange={(e) => setState(e.target.checked)}
								>
									Activo
								</Checkbox>
							</Form.Item>
						</Col>
						<div
							style={{
								textAlign: 'right',
							}}
						>
							<Button onClick={onClose} style={{ marginRight: 8 }}>
								Cancel
							</Button>
							<Button type="primary" htmlType="submit">
								Actualizar asesor
							</Button>
						</div>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};

const mapStateToProps = state => ({
	loading: state.loading,
	assessor: state.assessor,
	afiliatedCompanies: state.afiliatedCompany
})

const mapDispatchToProps = dispatch => ({
	dispatchUpdatedAdviserAction: (id, adviserReques, onSuccess, onError) =>
		dispatch(updateAssessorById(id, adviserReques, onSuccess, onError)),
	dispatchFetchAllAssessorAction: () => dispatch(fetchAllAssessor()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AdviserUpdate)