import '../css/generalSetting.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as constants from "../../../../../redux/constants";
import logotipoApp from '../../../../../includes/images/m2.png';
import {RUTA_API_MULTIMEDIA} from "../../../../../redux/constants";
import {getBase64} from "../../../../handle/Multimedia/Multimedia";
import {Button, Card, Col, Form, Input, Row, Select, Upload} from 'antd';
import {errorGlobal, success} from "../../../../handle/Notification/Notification";
import {fetchAllProfile} from '../../../../../redux/actions/Configuration/ProfileAction';
import {validatePermission} from "../../../../handle/PermissionMethods/PermissionMethods";
import {createGeneralSetting, fetchAllGeneralSetting} from '../../../../../redux/actions/Configuration/GeneralSettingAction';

const GeneralSettings = () => {
	

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllGeneralSetting())
		dispatch(fetchAllProfile())
	},[dispatch]);
	
	const profileSelect = useSelector((state) => state?.profile._payload);
	const generalSetting = useSelector((state) => state?.generalSetting._payload);
	
	const [colorIcon, setColorIcon] = useState(generalSetting?.accountant_profile_id);
	const [colorMenu, setColorMenu] = useState(generalSetting?.construction_manager_profile_id);
	const [administratorProfile, setAdministratorProfile] = useState(0);
	const [technicalProfile, setTechnicalProfile] = useState(0);
	const [counterProfile, setCounterProfile] = useState(0);
	const [constructionDirectorProfile, setConstructionDirectorProfile] = useState(0);
	const [commercialDirectorProfile, setCommercialDirectorProfile] = useState(0);
	const [adviserProfile, setAdviserProfile] = useState(0);
	const [form] = Form.useForm();
	const [logoLogin, setLogoLogin] = useState(0);
	const [logoApp, setLogoApp] = useState(0);
	const [fileListLogoApp, setFileListLogoApp] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: logoApp ? logoApp : logotipoApp,
		},
	]);
	
	
	

	useEffect(() => {
		setStates()
		setColor()
		setImage()
		fillFields()
	},[profileSelect,generalSetting])
	
	const setColor = () => {
		const colorMenuLocal = generalSetting?.icon_color && generalSetting?.icon_color !== "" ? generalSetting?.icon_color : localStorage.getItem('colorIcon') ?? process.env.REACT_APP_ICON_LOGIN;
		const colorIconLocal = generalSetting?.menu_bar_color && generalSetting?.menu_bar_color !== "" ? generalSetting?.menu_bar_color : localStorage.getItem('colorMenu') ?? process.env.REACT_APP_ICON_APP;
		setColorIcon(`${colorMenuLocal}`)
		setColorMenu(`${colorIconLocal}`)
		localStorage.setItem('colorIcon', colorMenuLocal)
		localStorage.setItem('colorMenu', colorIconLocal)
	}
	
	const setStates = () => {
		if(generalSetting){
			setAdministratorProfile(generalSetting?.super_admin_profile_id)
			setTechnicalProfile(generalSetting?.technician_profile_id)
			setCounterProfile(generalSetting?.accountant_profile_id)
			setConstructionDirectorProfile(generalSetting?.construction_manager_profile_id)
			setCommercialDirectorProfile(generalSetting?.commercial_director_profile_id)
			setAdviserProfile(generalSetting?.assessor_profile_id)
			setLogoLogin(generalSetting?.logo_login)
			setLogoApp(generalSetting?.logo_app)
		}
	}
	
	const setImage = () => {
		setFileListLogoApp([
			{
				uid: '-1',
				name: 'image.png',
				status: 'done',
				url: generalSetting?.logo_app,
			},
		])
	}
	
	const generalSettingsData = {
		icon_color: colorIcon,
		menu_bar_color: colorMenu,
		super_admin_profile_id: administratorProfile,
		technician_profile_id: technicalProfile,
		accountant_profile_id: counterProfile,
		construction_manager_profile_id: constructionDirectorProfile,
		commercial_director_profile_id: commercialDirectorProfile,
		assessor_profile_id: adviserProfile,
		app_logo: logoApp,
		login_logo: logoLogin,
		user_creator_id : JSON.parse(localStorage.USER_INFO).id,
	}

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido'
	};
	
	const fillFields =  ()  => {
		form.setFieldsValue({
			administratorProfile : profileSelect?.find(x => x.id == administratorProfile)?.name,
			technicalProfile : profileSelect?.find(x => x.id == technicalProfile)?.name,
			counterProfile : profileSelect?.find(x => x.id == counterProfile)?.name,
			constructionDirectorProfile : profileSelect?.find(x => x.id == constructionDirectorProfile)?.name,
			commercialDirectorProfile : profileSelect?.find(x => x.id == commercialDirectorProfile)?.name,
			adviserProfile : profileSelect?.find(x => x.id == adviserProfile)?.name,
			logoLogin,
			logoApp
		});
	};
	
	const sendData = () => {
		dispatch(createGeneralSetting(generalSettingsData,  async function (response){
			if (response.error) {
				errorGlobal("¡UPS!, Ha ocurrido un error");
			} else {
				success("Se ha actualizado la configuración");
				onReset();
				dispatch(fetchAllGeneralSetting());
				dispatch(fetchAllProfile());
			}
		}));
	}

	const onReset = () => {
		form.resetFields();
	};

	const onChangeLogoApp = ({fileList: info}) => {
		setFileListLogoApp(info);
		if(info.length>0 && info[0].originFileObj){
			getBase64(info[0].originFileObj, (imageUrl) => {
				setLogoApp(imageUrl);
			});
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

	
	
	if (!validatePermission(constants.CREATE_GENERAL_SETTING_PERMISSION)) {
		return null;
	}

	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};
	
	return (
		<>
			<Card>
				<Form
					onFinish={sendData}
					form={form}
					layout="vertical"
					style={{height: 700, marginBottom: 100}}
					validateMessages={validateMessages}
					size='middle'
				>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="administratorProfile"
								label="Perfil del super administrador"
								rules={[
									{
										required: true
									}]}>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setAdministratorProfile}
									value={administratorProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="technicalProfile"
								label="Perfil del técnico"
								rules={[
									{
										required: true
									}
								]}
							>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setTechnicalProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="counterProfile"
								label="Perfil del contador"
								rules={[
									{
										required: true
									}
								]}
							>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setCounterProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="constructionDirectorProfile"
								label="Perfil del director de obra"
								rules={[
									{
										required: true
									}
								]}
							>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setConstructionDirectorProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="commercialDirectorProfile"
								label="Perfil del director comercial"
								rules={[
									{
										required: true
									}

								]}
							>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setCommercialDirectorProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item
								name="adviserProfile"
								label="Perfil del asesor"
								rules={[
									{
										required: true
									}
								]}
							>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Selecciona un perfil"
									optionFilterProp="children"
									onChange={setAdviserProfile}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">Seleccione...</Select.Option>
									{
										profileSelect?.map(item => (
											<Select.Option key={item.id+item.name+item.id} value={item.id}>{item.name}</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<h4 style={{marginBottom: 20}}>Imágenes</h4>
					</Row>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								style={{paddingTop: '60px', paddingLeft: '50px'}}
								name={['projectApp', 'logo']}
								className="imagenes"
								
								getValueFromEvent={normFile}
								label="Logotipo App (Medidas Recomendadas: 129x43)"
							>
								<Upload
									action={RUTA_API_MULTIMEDIA}
									listType="picture-card"
									fileList={fileListLogoApp}
									onChange={onChangeLogoApp}
									onPreview={onPreview}
									value={logoApp}
									width='1500'
									accept="image/*"
									maxCount={1}
									name={"image"}
								>
									{(fileListLogoApp.length < 1) ? '+ Upload' : ''}
								</Upload>
							</Form.Item>
						</Col>
						{/*<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<Form.Item
								style={{paddingTop: '60px', paddingLeft: '50px'}}
								name={['projectLogin', 'logo']}
								className="imagenes"
								getValueFromEvent={normFile}
								label="Logotipo Login (Medidas Recomendadas: 260x170)"
							>
								<Upload
									action={RUTA_API_MULTIMEDIA}
									listType="picture-card"
									fileList={fileListLogoLogin}
									onChange={onChangeLogoLogin}
									onPreview={onPreview}
									value={logoApp}
									width='1500'
									accept="image/*"
									maxCount={1}
									name={"image"}
								>
									{(fileListLogoLogin.length < 1) ? '+ Upload' : ''}
								</Upload>
							</Form.Item>
						</Col>*/}
					</Row>
					<Row style={{marginTop: '20px'}}>
						<h2>Colores</h2>
					</Row>
					<Row gutter={16} style={{marginTop: '10px'}}>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item valuePropName={colorMenu} name='colorMenu' label='Color barra de menú'>
								<Input defaultValue={colorMenu} type="color"  required={""}  value={colorMenu} onChange={(e) => setColorMenu(e.target.value)} name='colorMenu'
											 id='color_menu'/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item  valuePropName={colorIcon}  name='colorIcon' label='Color ícono'>
								<Input defaultValue={colorIcon} type="color" required={""} value={colorIcon} onChange={(e) => setColorIcon(e.target.value)} name='colorIcon'
											 id='color_icon'/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={8} lg={8} xl={8}>
							<Form.Item label=' '>
								<Button type="primary" htmlType="submit">
									Guardar
								</Button>
							</Form.Item>
						</Col>
					</Row>

				</Form>
			</Card>

		</>
	);
};


export default GeneralSettings;
