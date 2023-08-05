import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { ChannelContext } from './ChannelProvider';
import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Modal, Tooltip } from 'antd';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import { updateChannelById, fetchAllChannel } from '../../../../../redux/actions/Configuration/ChannelAction';

const UpdatedChannel = () => {
	const [ form] = Form.useForm();
	const [ isModalVisible, setIsModalVisible ] = useState();
	const dispatch = useDispatch();
	const { channel } = useContext(ChannelContext);
	const [ id ] = useState(channel.id)
	const [ name, setName ] = useState(channel.name)
	const [ state, setState ] = useState(channel.state)

	const textEditor = <span style={{color: '#6A6963'}}> Editar </span>

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
	};

	const attentionPlacesReques = {
		name,
		state
	}

	const onReset = () => {
		form.resetFields()
	}

	const sendData = () => {
		dispatch(
			updateChannelById(id, attentionPlacesReques, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success("Se ha registrado con éxito");
					onReset();
					onClose();
					dispatch(fetchAllChannel());
				}
			}, async (error) => {
				errorGlobal(error);
			})
		);


	}

	const onClose = () => {
		setIsModalVisible(false);
		form.resetFields();
	}
	const updateStateAttentionPlaces = () => {
		setState(channel.state);
		setName(channel.name);
	}
	const showModal = () => {
		setIsModalVisible(true);
		updateStateAttentionPlaces();
	};

	const fillFields = () => {
		form.setFieldsValue({
			name: name,
			state
		});
	}

	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textEditor}>
				<Button
					onClick={() => {fillFields();showModal()}}
					type="primary"
					style={{backgroundColor: '#ffa247', borderColor: '#ffa247'}}
					size='small'
					icon={<EditOutlined/>}>
				</Button>
			</Tooltip>

			<Modal
				title={'Editar ¿Cómo se enteró?'}
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={onClose}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{height: '100%', width: "100%"}}
					onFinish={sendData}
					form={form}
					validateMessages={validateMessages}
				>
					<Form.Item
						label="Nombre:"
						name="name"
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
									} else {
										setName(name);
									}
								}
							},
						]}
					>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}

						/>
					</Form.Item>
					<Form.Item
						name="state"
					>
						<Checkbox
							checked={state}
							onChange={(e) => setState(e.target.checked)}
						>Activo</Checkbox>
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


export default UpdatedChannel;