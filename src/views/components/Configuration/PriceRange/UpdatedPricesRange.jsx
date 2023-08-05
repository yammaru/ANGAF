import { connect } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useContext } from "react";
import { PricesRangeContext } from './PricesRangeProvider';
import { FORMATTER_INPUT_NUMBER } from "../../../../redux/constants";
import { Form, Input, Button, Checkbox, Tooltip, Modal, InputNumber , notification} from 'antd';
import { updatePricesRangeById, fetchAllPricesRange } from '../../../../redux/actions/Configuration/PricesRangeAction';

const UpdatedPricesRange = ({ dispatchUpdatedPriceRangeAction, dispatchFetchAllPriceRangeAction }) => {

	const [ form ] = Form.useForm();

	const { pricesRange } = useContext(PricesRangeContext);

	const [ id ] = useState(pricesRange.id);
	const [ name, setName ] = useState(pricesRange.name);
	const [ upper_limit, setUpperLimit ] = useState(pricesRange.upper_limit);
	const [ lower_limit, setLowerLimit ] = useState(pricesRange.lower_limit);
	const [ state, setState ] = useState(pricesRange.state);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const textEditar = <span style={{ color: '#6A6963' }}	>Editar	</span>
	const errors = [];

	const pricesRangeReques = {
		name, upper_limit, lower_limit, state
	}

	const updateStatePricesRange = () => {
		setState(pricesRange.state);
		setName(pricesRange.name);
		setUpperLimit(pricesRange.upper_limit)
		setLowerLimit(pricesRange.lower_limit)
	}

	const showModal = () => {
		setIsModalVisible(true);
		updateStatePricesRange();
	};

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: '${label} es requerido',
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			number: '${label} deber ser numérico',
		}
	};

	const onReset = () => {
		form.resetFields();
	}

	const onClose = () => {
		setIsModalVisible(false);
	}

	const fillFields = () => {
		form.setFieldsValue({
			name, 
			upper_limit : parseFloat(upper_limit) 
			, lower_limit : parseFloat(lower_limit), 
			state
		});
	}

	const sendData = () => {
		dispatchUpdatedPriceRangeAction(id, pricesRangeReques,  (response) => {
            if (response.error) {
                error(response.message);
            }
            else {
                success('Rango de precio actualizado');
            }
        });
        dispatchFetchAllPriceRangeAction();
	}

	const success = (response) => {
        openNotificationWithIcon('success', response);
        onClose();
        onReset();
        dispatchFetchAllPriceRangeAction();
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
			<Tooltip placement="left" color='#ffffff' title={textEditar}>
				<Button size='small' type="primary" style={{ backgroundColor: '#ffa247', borderColor: '#ffa247' }} onClick={()=>{fillFields();showModal()}}  icon={<EditOutlined />} />
			</Tooltip>

			<Modal
				title={"Editar rango de precio"}
				centered
				visible={isModalVisible}
				footer={false}
				onCancel={() => setIsModalVisible(false)}
				onClose={onClose}
			>
				<Form
					layout="vertical"
					style={{ height: '100%', width: "100%" }}
					onFinish={sendData}
					form={form}
					validateMessages={validateMessages}
				>
					<Form.Item
						name="name"
						label="Nombre"
						rules={[{ required: true }]}
					>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Item>

					<Form.Item
						name="upper_limit"
						label="Límite superior"
						rules={[
							{
								type: 'number',
								min: 0,
							},
							{ required: true }
						]}
					>
						<InputNumber
							{...FORMATTER_INPUT_NUMBER}
							defaultValue={upper_limit}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							value={upper_limit}
							onChange={value => setUpperLimit(value)}
							style={{ width: '100%' }}
						/>
					</Form.Item>

					<Form.Item
						name="lower_limit"
						label="Límite infeior"
						rules={[
							{
								type: 'number',
								min: 0,
							},
							{ required: true }
						]}
					>
						<InputNumber
							{...FORMATTER_INPUT_NUMBER}
							defaultValue={lower_limit}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							value={lower_limit}
							onChange={value => setLowerLimit(value)}
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item
						label=" "
					>
						<Checkbox
							name="state"
							checked={state}
							onChange={(e) => setState(e.target.checked)}
						>
							Activo
						</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 1, top: 20 }}>
							Guardar
        		</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	dispatchUpdatedPriceRangeAction: (id, pricesRangeReques, onSuccess, onError) =>
		dispatch(updatePricesRangeById(id, pricesRangeReques, onSuccess, onError)),
	dispatchFetchAllPriceRangeAction: () => dispatch(fetchAllPricesRange())
})
export default connect(null, mapDispatchToProps)(UpdatedPricesRange);