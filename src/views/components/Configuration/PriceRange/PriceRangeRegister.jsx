import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import * as constants from "../../../../redux/constants";
import { FORMATTER_INPUT_NUMBER } from "../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal, InputNumber } from "antd";
import { success,errorGlobal } from "../../../handle/Notification/Notification";
import {validatePermission} from "../../../handle/PermissionMethods/PermissionMethods";
import { createPricesRange, fetchAllPricesRange } from "../../../../redux/actions/Configuration/PricesRangeAction";

const PriceRangeregister = () => {

	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [lower_limit, setLowerLimit] = useState(0);
	const [upper_limit, setUpperLimit] = useState(0);
	const [state, setState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const pricesRange = {
		name,
		lower_limit,
		upper_limit,
		state,
	};

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
		types: {
			// eslint-disable-next-line no-template-curly-in-string
		  number: '${label} no puede contener letras.',
		},
		number: {
			// eslint-disable-next-line no-template-curly-in-string
		  range: '${label} debe estar entre ${min} y ${max}',
		},
	};
	const showModal = () => {
		setIsModalVisible(true);
	};
	const onClose = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	const onReset = () => form.resetFields();

	const onFinish = () => {
		dispatch(
			createPricesRange(pricesRange,  (response) => {
				if (response.error) {
					errorGlobal('¡UPS! Ocurrió un error mientras se registraba');
				} else {
					success("Rango de precio registrado");
				}
				dispatch(fetchAllPricesRange());
				onReset()
				onClose();
			})
		);
	};

	function getTelephoneValidationPromise(rangePrice) {
		let spaces = /^(?!\s)/;
		if (!spaces.test(rangePrice)) return Promise.reject(new Error('Rango de precio no válido'));
		return Promise.resolve();	
	}
	if (!validatePermission(constants.CREATE_PRICE_RANGE_PERMISSION)) {
		return null;
	}
	return (
		<>
			<Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
				Nuevo
			</Button>
			<Modal
				footer={false}
				title="Nuevo rango de precio"
				visible={isModalVisible}
				onCancel={onClose}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					style={{ height: "100%", width: "100%" }}
					onFinish={onFinish}
					form={form}
					validateMessages={validateMessages}
				>
					<Form.Item name="name" label="Nombre" rules={[{
						required: true,
						min: 3,
						max: 100,
						validator: async (_, value) => {
							// let chars = /^[\wa-zA-Z\s]+$/; *----Cambiar expersión por una que permita guión----*
							let spaces = /^(?!\s)/;
							setName(value);
							if (name !== '') {
								if (name.length < 3) {
									return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
								} else if (!spaces.test(name)) {
									return Promise.reject(new Error('Nombre no válido'));
								} else {
									setName(name);
								}
							}else{
								return Promise.reject(new Error('Nombre vacío.'));
							}

						}
					}]}>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</Form.Item>
					<Form.Item
						label="Límite inferior"
						name="lower_limit"
						rules={[{ type: "number", min: 0, max:999999999999,required: true }, {
							validator(_, value) {
								return getTelephoneValidationPromise(value)
							},
						}]}
					>
						<InputNumber
							{...FORMATTER_INPUT_NUMBER}
							style={{ width: "100%" }}
							min={0}
							placeholder={0}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							value={lower_limit}
							onChange={(value) => setLowerLimit(value)}
						/>
					</Form.Item>
					<Form.Item
						label="Límite superior"
						name="upper_limit"
						rules={[
							{ type: "number", min: 0 ,max:999999999999 },
							{ required: true },
							() => ({
								validator(_, value) {
									if (lower_limit < value) {
										let numbers = /^[0-9\s]+$/;
										let spaces = /^(?!\s)/;
										if (!spaces.test(value)) {
											return Promise.reject(new Error('Límite inferior no válido.'));
										} else if (!numbers.test(value)) {
											return Promise.reject(new Error('El límite inferior no puede estar vacío.'));
										} else if (!spaces.test(value)) {
											return Promise.reject(new Error('Límite inferior no válida.'));
										} else {
											setUpperLimit(value);
										}
										return Promise.resolve();

									}
									return Promise.reject(
										new Error("Límite superior menor que límite inferior")
									);

								},
							}),
						]}
					>
						<InputNumber
							{...FORMATTER_INPUT_NUMBER}
							style={{ width: "100%" }}
							min={1}
							placeholder={0}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							value={upper_limit}
							onChange={(value) => setUpperLimit(value)}
						/>
					</Form.Item>
					<Form.Item>
						<Checkbox
							value={state}
							onChange={(e) => setState(e.target.checked)}
						>
							Activo
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ position: "absolute", right: 1, top: 20 }}
						>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default PriceRangeregister;
