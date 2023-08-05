import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
	getUSerId,
	getUSerIdProfile,
} from "../../../../handle/HandleUser/HandleUser";
import { Form, Input, Button, Modal, DatePicker, Select } from "antd";
import {
	success,
	errorGlobal,
} from "../../../../handle/Notification/Notification";
import { getCustomerById } from "../../../../../redux/actions/Customer/CustomerAction";
import { fetchAllActivityType } from "../../../../../redux/actions/Configuration/ActivityTypeAction";
import { createCustomerActivity } from "../../../../../redux/actions/Customer/CustomerActivityAction";
import { fetchAllUsers } from "../../../../../redux/actions/Configuration/usersAction";

const CustomerRegisterActivities = (props) => {
	const customerData = props?.customerData;
	const managementTypeSelect = props?.customerData?.managementTypes;
	const activityTypeSelect = useSelector(
		(state) => state?.activityType._payload
	);
    const users = useSelector(state => state['users']);
	const newActivityTypeSelect = activityTypeSelect
		?.filter(FilterActivityType)
		.sort(SortArray);

	function FilterActivityType(elemento) {
		return (
			elemento?.id === 3 ||
			elemento?.id === 4 ||
			elemento?.id === 9 ||
			elemento?.id === 8
		);
	}

	function SortArray(x, y) {
		if (x.name.length < y.name.length) {
			return -1;
		}
		if (x.name.length > y.name.length) {
			return 1;
		}
		return 0;
	}

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
		dispatch(fetchAllActivityType());
	}, []);

	const [visible, setVisible] = useState();
	const [activityType, setActivityType] = useState();
	const [managementType, setManagementType] = useState();
	const [scheduledDate, setScheduledDate] = useState();
	const [activityDescription, setActivityDescription] = useState();
	const [creatorUserId, setCreatorUserId] = useState();

	const { TextArea } = Input;

	const dateFormat = "YYYY/MM/DD";
	const [form] = Form.useForm();
	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label} es requerido",
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			email: "${label} no es un correo válido",
			// eslint-disable-next-line no-template-curly-in-string
			number: "${label} debe ser un numero",
		},
	};

	const showModal = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const captureDate = (date) => {
		if (date != null) {
			setScheduledDate(date.format(dateFormat));
		}
	};

	const dataRegisterActivities = {
		scheduled: scheduledDate,
		activity_description: activityDescription,
		activity_type_id: activityType,
		customer_id: customerData.customer.id,
		management_type_id: managementType,
		creator_user_id: getUSerIdProfile()===1?creatorUserId:getUSerId(),
	};
	console.log(creatorUserId);
	const onFinish = () => {
		dispatch(
			createCustomerActivity(dataRegisterActivities, (response) => {
				if (response.error) {
					errorGlobal("Op a ocurrido un error");
				} else {
					success("Ha sido agregado con éxito");
					updateTable();
					onReset();
					onClose();
					dispatch(getCustomerById(customerData.customer[0].id));
				}
			})
		);
	};
	const onReset = () => {
		form.resetFields();
	};

	const updateTable = () => {
		props.myClick();
	};
	return (
		<>
			<Button
				type="primary"
				onClick={showModal}
				style={{ backgroundColor: "#5cb85c", borderColor: "#5cb85c" }}
			>
				<PlusOutlined style={{ fontSize: 20 }} /> {"Agregar Actividad"}
			</Button>
			<Modal
				title="Agregar Actividad"
				visible={visible}
				footer={false}
				onCancel={() => setVisible(false)}
			>
				<Form
					layout="vertical"
					size="middle"
					form={form}
					validateMessages={validateMessages}
					onFinish={onFinish}
				>
					{getUSerIdProfile() === 1 ? (
						<>
							<Form.Item
								name="user_id"
								label="Usuario"
								rules={[{ required: true }]}
							>
								<Select
									showSearch
									style={{ width: "100%" }}
                                    onChange={setCreatorUserId}
									placeholder="Selecciona un usuario"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									<Select.Option value="">
										Seleccione...
									</Select.Option>
									{!Array.isArray(users) &&
										users["_payload"]?.map((item) => (
											<Select.Option
												key={
													item.id +
													item.name +
													item.id
												}
												value={item.id}
											>
												{item.name}
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</>
					) : (
						<></>
					)}
					<Form.Item
						name="activityType"
						label="Tipo"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select
							showSearch
							style={{ width: "100%" }}
							optionFilterProp="children"
							onChange={setActivityType}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							<Select.Option value="">
								Seleccione...
							</Select.Option>
							{newActivityTypeSelect?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name="managementType"
						label="Tipo de Gestion"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select
							showSearch
							style={{ width: "100%" }}
							optionFilterProp="children"
							onChange={setManagementType}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							<Select.Option value="">
								Seleccione...
							</Select.Option>
							{managementTypeSelect.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name="scheduledDate"
						label="Fecha Programada"
						rules={[{ required: true }]}
					>
						<DatePicker
							value={scheduledDate}
							format={dateFormat}
							onChange={(value) => captureDate(value)}
							style={{ width: "100%" }}
							placeholder="Ingrese la fecha"
						/>
					</Form.Item>
					<Form.Item
						name="activityDescription"
						label="Actividad"
						rules={[{ required: true }]}
					>
						<TextArea
							value={activityDescription}
							onChange={(e) =>
								setActivityDescription(e.target.value)
							}
							rows={3}
						/>
					</Form.Item>
					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Registrar Actividad
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default CustomerRegisterActivities;
