import {UsersContext} from './UserProvider';
import {EditOutlined} from '@ant-design/icons';
import React, {useContext, useState} from 'react'
import {connect, useDispatch} from 'react-redux';
import {RUTA_API_MULTIMEDIA} from '../../../../../redux/constants';
import {errorGlobal, success} from '../../../../handle/Notification/Notification';
import {fetchAllUsers, updateUserById} from '../../../../../redux/actions/Configuration/usersAction';
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Tooltip, Upload} from 'antd';

const validateMessages = {
	// eslint-disable-next-line no-template-curly-in-string
	required: "${label} es requerido",
	types: {
		// eslint-disable-next-line no-template-curly-in-string
		email: "${label} debe ser un correo válido",
		// eslint-disable-next-line no-template-curly-in-string
		number: "${label} no puede contener letras.",
	},
	number: {
		// eslint-disable-next-line no-template-curly-in-string
		range: "${label} debe estar entre ${min} y ${max}",
	},
};

const UpdateUserForm = ({ profiles, afiliatedCompany }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { users } = useContext(UsersContext);

	const [id] = useState(users.id);
	const [name, setName] = useState(users.name);
	const [password, setPassword] = useState(users.password);
	const [email, setEmail] = useState(users.email);
	const [profile, setProfile] = useState(users?.profile_id);
	const [affiliated_company, setAffiliated_company] = useState(
		users.affiliated_company_id
	);
	const [state, setState] = useState(users.state);
	const [phone_number, setPhoneNumber] = useState(
		users.phone_number === null ? "" : users.phone_number
	);
	const [stateImage, setStateImage] = useState(users.path);

	const textEditar = <span style={{ color: "#6A6963" }}> Editar </span>;
	const [fileList, setFileList] = useState([{ url: users.path }]);

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const fillFields = () => {
		form.setFieldsValue({
			name,
			password,
			email,
			profile: parseInt(profile), 
			affiliated_company: parseInt(affiliated_company),
			phone_number,
			state,
			image: stateImage,
		});
	};

	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
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

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		if (newFileList.length !== 0) {
			if (fileList[0] !== undefined) {
				if (fileList[0].thumbUrl !== undefined && fileList[0].thumbUrl !== "") {
					setStateImage(fileList[0].thumbUrl);
				}
			}
		}
	};

	const onReset = () => {
		form.resetFields();
		setStateImage("");
	};

	const updateStateUsers = () => {
		setName(users.name);
		setPassword(users.password);
		setEmail(users.email);
		setProfile(users.profile_id);
		setState(users.state);
		setPhoneNumber(users.phone_number);
		setAffiliated_company(users.affiliated_company_id);
		setStateImage(users.path);
	};

	const showModal = () => {
		setIsModalVisible(true);
		updateStateUsers();
		fillFields();
	};

	const  sendData = async () => {
		let values = await form.validateFields();
		values.image = stateImage;
		console.log(values?.phone_number)
		values.phone_number = values?.phone_number?.toString();
		if (state === 1 ||state === true||state === "1"){
			values.state = 1;
		}else {
			values.state = 0;
		}
		delete values["confirm"];
		try {
			dispatch(updateUserById(id,values,async (response)=>{
				if(response.error){
					errorGlobal(response.message);
				} else{
					success("Usuario editado correctamente")
					dispatch(fetchAllUsers());
					onReset();
					handleCancel();
				}
			}))
		} catch (error) {
			console.error(error);
		}
	};

	const profileArraySelec = [];
	for (let key in profiles) {
		if (key === "_payload") {
			let profileFill = profiles[key];
			for (let index = 0; index < profileFill.length; index++) {
				profileArraySelec.push(profileFill[index]);
			}
		}
	}

	function getPasswordValidationPromise(getFieldValue, password) {
		if (!password || getFieldValue("password") === password)
			return Promise.resolve();
		return Promise.reject(new Error("Las dos Contraseñas Deben ser Iguales"));
	}

	const profileSelect = [];
	for (let i = 0; i < profileArraySelec.length; i++) {
		profileSelect.push(profileArraySelec[i]);
	}

	const companyArraySelect = [];
	for (let key in afiliatedCompany) {
		if (key === "_payload") {
			let companyFill = afiliatedCompany[key];
			for (let index = 0; index < companyFill.length; index++) {
				companyArraySelect.push(companyFill[index]);
			}
		}
	}

	const companySelect = [];
	for (let i = 0; i < companyArraySelect.length; i++) {
		companySelect.push(companyArraySelect[i]);
	}

	function calculateLengthNumber(number) {
		return number.toString().split("").length;
	}

	function getTelephoneValidationPromise(phoneNumber) {
	
		let spaces = /^(?!\s)/;
		if (phoneNumber != null && phoneNumber.length!=0) {
			if (calculateLengthNumber(phoneNumber) < 7) {
				return Promise.reject(
					new Error("El teléfono debe tener al menos 7 digitos")
				);
			} else if (calculateLengthNumber(phoneNumber) >= 11) {
				if (!spaces.test(phoneNumber)) {
					return Promise.reject(new Error("Teléfono no válido"));
				}
				return Promise.reject(
					new Error("El teléfono debe tener maxímo 11 digitos")
				);
			}
		}
		return Promise.resolve();
	}
	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textEditar}>
				<Button
					size="small"
					style={{ backgroundColor: "#ffa247", border: "#ffa247" }}
					icon={<EditOutlined />}
					type="primary"
					onClick={showModal}
				/>
			</Tooltip>
			<Modal
				title="Editar usuario"
				visible={isModalVisible}
				width={900}
			
				footer={null}
				onCancel={handleCancel}
			>
				<Form
					layout="vertical"
					size="middle"
					onFinish={sendData}
					form={form}
					validateMessages={validateMessages}
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={6} lg={6} xl={6}>
							<Form.Item name="image" label="Foto usuario">
								<Upload
									action= {RUTA_API_MULTIMEDIA}
									listType="picture-card"
									fileList={fileList}
									onChange={onChange}
									onPreview={onPreview}
									accept="image/*"
								>
									{fileList.length < 1 ? "+ Upload" : ""}
								</Upload>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={18} lg={18} xl={18}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="name"
										label="Nombre"
										rules={[
											{
												required: true,
												min: 3,
												max: 100,
												pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
												message: "Texto invalido"
												// validator: async (_, name) => {
												// 	let promise = await NameValidations(name);
												// 	return promise;
												// },
											},
										]}
									>
										<Input
											placeholder="Por favor ingresar su nombre"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<Form.Item
										name="email"
										label="Email"
										rules={[
											{
												required: true,
												type: "email",
												message: "El email debe ser un correo válido",
											},
										]}
									>
										<Input
											placeholder="Por favor ingresar su correo"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="password"
								label="Contraseña"
								hasFeedback
								rules={[
									{
										min: 7,
										max: 11,
								
									},
								]}
							>
								<Input.Password
									placeholder="Contraseña"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="confirm"
								label="Confirmar contraseña"
								dependencies={["password"]}
								hasFeedback
								rules={[
									{
										message: "Por favor confirme su contraseña",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											return  getPasswordValidationPromise(getFieldValue, value)
										},
									}),
								]}
							>
								<Input.Password placeholder="Repita contraseña" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="profile"
								label="Perfil"
								rules={[
									{
										required: true, 
									},
								]}
							>
								<Select
									value={"Admin"}
									showSearch
									style={{ width: '100%' }}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
									}
									
								>
									<Select.Option value="-">Seleccione...</Select.Option>
									{profileSelect?.filter( x => {return x.id !== 2 && x.state !== 0}).map((item) => (
										<Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24} xs={24} sm={12} md={12} lg={12} xl={12}>
							<Form.Item
								name="affiliated_company"
								label="Compañía asociada"
								
							>
								<Select
									showSearch
									placeholder="Por Favor Elegir La Compañía Asociada"
									optionFilterProp="children"
									onChange={setAffiliated_company}
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									style={{ width: "100%" }}
								>
									<Select.Option value={0}>Seleccione...</Select.Option>
									{companySelect.filter(x => x.state !== false).map((item) => (
										<Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								name="phone_number"
								label="Teléfono:"
								rules={[
									{
										type: "number",
										validator: async (_, value) => {
											return getTelephoneValidationPromise(value);
										},
									},
								]}
							>
								<InputNumber
									placeholder="Por favor ingresar su teléfono"
									style={{ width: "100%" }}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item label="Estado" name="state">
								<Checkbox
									checked={state}
									onChange={(e) => setState(e.target.checked)}
								>
									Activo
								</Checkbox>
							</Form.Item>
						</Col>
					</Row>
					<Row xs={24} sm={24} md={12} lg={12} xl={12}>
						<div
							style={{
								textAlign: "right",
								float: "left",
							}}
						>
							<Button onClick={handleCancel} style={{ marginRight: 8 }}>
								Cancel
							</Button>
							<Button type="primary" htmlType="submit">
								Actualizar usuario
							</Button>
						</div>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	profiles: state.profile,
	afiliatedCompany: state.afiliatedCompany,
});
export default connect(mapStateToProps)(UpdateUserForm);
