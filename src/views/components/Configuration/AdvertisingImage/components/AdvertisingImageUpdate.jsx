
import { useDispatch } from "react-redux";
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useContext } from "react";
import { AdvertisingImageContext } from "./AdvertisingImageProvider";
import { RUTA_API_MULTIMEDIA } from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Upload, Modal, Tooltip } from 'antd';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { updateAdvertisingImageById, fetchAllAdvertisingImage } from '../../../../../redux/actions/Configuration/AdvertisingImageAction';

const { TextArea } = Input;

const UpdatedFormComponent = () => {

	const dispatch = useDispatch();
	const { advertisingImage } = useContext(AdvertisingImageContext);
	const [ description ] = useState(advertisingImage.description);
	const [ state, setState ] = useState(advertisingImage.state);
	const [ form ] = Form.useForm();
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ imageUrl ] = useState(advertisingImage.multimedia.path);
	

	const [fileList, setFileList] = useState([
		{
		  uid: '-1',
		  name: 'image.png',
		  status: 'done',
		  url: imageUrl,
		},
	  ]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onClose = () => {
		setIsModalVisible(false);
		onReset();
	};

	const onReset = () => {
		form.resetFields();
	};

	const textEditar = <span style={{ color: '#6A6963' }}>Editar</span>

	const fillFields = () => {
		form.setFieldsValue({
			description: description
		});
	}

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	  };

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const onFinish = async () => {
		try {
			let dto = await form.validateFields();
			if (dto.image !== undefined){
				dto = {
					...dto,
					state: state,
					image: await toBase64(dto["image"].fileList[0].originFileObj),
				};
			}else {
				dto = {
					...dto,
					state: state,
					image: null
				}
			}
			dispatch(
				updateAdvertisingImageById(advertisingImage.id ,dto, async (response) => {
					const res = await response;
					if (res.error) {
 
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Se ha actualizado con éxito");
					}
					onClose();
					dispatch(fetchAllAdvertisingImage());
				})
			);
		} catch (errorInfo) {
			console.error(errorInfo)
		}
	};

	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textEditar}>
				<Button size='small' style={{ backgroundColor: '#ffa247', border: '#ffa247' }} icon={<EditOutlined />} type="primary"  onClick={() => {showModal();fillFields();}} />
			</Tooltip>
			<Modal
				title='Actualizar imágenes publicitarias'
				visible={isModalVisible}
				footer={false}
				onCancel={handleCancel}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					onFinish={onFinish}
					style={{ height: '100%', width: "100%" }}
					form={form}
				>
					<Form.Item
						name="image"
						label="Imagen publicitaria"
					>
						<Upload
							action={RUTA_API_MULTIMEDIA}
							listType="picture-card"
							fileList = {fileList}
							maxCount={1}
							onChange={onChange}
							accept="image/*"
						>
							+ Subir
						</Upload>
						
					</Form.Item>

					<Form.Item name='description' label="Descripción:">
						<TextArea rows={6} />
					</Form.Item>

					<Form.Item name='state' >
						<Checkbox
							checked={state}
							onChange={(e) => setState(e.target.checked)}
						>
							Activo
						</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" tmlType="submit" style={{ position: 'absolute', right: 1, top: 10 }}>
							Actualizar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default UpdatedFormComponent;