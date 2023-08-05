import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {UserAddOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, Modal, Select, Tooltip} from "antd";
import {error, success} from "../../../../../handle/Notification/Notification";
import {dateFormat, validateDateGreaterThanCurrentDate} from "../../../../../handle/HandleDatePicker/HandleDate";
import {fetchAllCustomer,reassignmentAssessorCustomerById} from "../../../../../../redux/actions/Customer/CustomerAction";

const AssignAdvisor = ({id,advisors,adviserName}) => {
	const textReassignAdvisor = <span style={{ color: '#6A6963' }}>Reasignar asesor</span>
	const validateMessages = {
		required : '${label} es requerido'
	}
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const [visible, setVisible] = useState()
	const [newAdviser, setNewAdviser] = useState(0)
	const [date, setDate] = useState('')

	const showModal = () => {setVisible(true)}
	const resetFields = () => form.resetFields()
	const closeModal = () => {
		setVisible(false)
		resetFields()
	}
	
	const captureDate = (date) => {
		if (date != null){
			setDate(date.format(dateFormat))
		}
	}
	
	const sendData = () => {
		let reassignAdvisorData = {
			assessor: newAdviser,
			reassignment_date: date
		}
		dispatch(reassignmentAssessorCustomerById(id,reassignAdvisorData,async (response)=>{
			const res = await response
			if (res.error){
				error(res.message)
			}else {
				dispatch(fetchAllCustomer())
				success(res.message)
				closeModal()
			}
		}))
	}

	const changeExpiationdate=adviserName?"Fecha de Reasignación":"Fecha de Reasignación";
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textReassignAdvisor}>
				<Button type='primary' size='small' onClick={() => showModal()} icon={<UserAddOutlined/>} />
			</Tooltip>
			<Modal
				title={"Reasignar asesores"}
				visible={visible}
				footer={false}
				onCancel={()=> closeModal()}
			>
				<Form
					name={"nest-messages"}
					layout={"vertical"}
					form={form}
					style={{ height:'100%', width:"100%" }}
					validateMessages={validateMessages}
					onFinish={sendData}
				>
					<Form.Item
						label={"Anterior Asesor:"}
						name={"currentAdviser"}
					>
						<Input defaultValue={adviserName} disabled={true} />
					</Form.Item>
					<Form.Item
						name='newAdviser'
						label='Asesor'
						rules={[{ required: true }]}
					>
						<Select
							onChange={setNewAdviser}
							placeholder={"Elija un asesor"}
							style={{width:"100%"}}
							showSearch
							optionFilterProp={"children"}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Select.Option value={0}>Seleccione...</Select.Option>
							{
								advisors.filter(x => x.state !== 0).map((item)=>{
									return <Select.Option key={item?.id+item?.name+item?.id} value={parseInt(item.id)}>{item.name}</Select.Option>
								})
							}
						</Select>
					</Form.Item>
					<Form.Item
						name='date'
						label={changeExpiationdate}
						rules={[
							{
								required:true
							}
						]}
					>
						<DatePicker
							style={{ width: '100%' }}
							placeholder="Ingrese la fecha de reasignación"
							onChange={(value)=>captureDate(value)}
							format={dateFormat}
							value={date}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 1, top: 20 }}>
							Guardar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default AssignAdvisor