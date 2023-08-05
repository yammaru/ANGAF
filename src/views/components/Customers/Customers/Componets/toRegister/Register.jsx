import Forms from "../Forms";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {UserAddOutlined} from "@ant-design/icons";
import {Button, Drawer, Form, Tooltip} from "antd";
import {useCustomers} from "../../Hooks/useCustomers";
import {errorGlobal, success, warning} from "../../../../../handle/Notification/Notification";
import {createCustomer, fetchAllCustomer} from "../../../../../../redux/actions/Customer/CustomerAction";

const Register = () => {
	const [visible,setVisible] = useState(false)
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const {DTOSet} = useCustomers()
	const resetFields = () => form.resetFields()
	const showModal = () => {setVisible(true)}
	const onCloseDrawer = () => {
		setVisible(false) 
		resetFields()
	}
	const detectAge =  () => {
		const values =  form.getFieldValue('dateBirth')
		let age = 0;
		let actuallyDate = new Date();
		let dateBirth = new Date(values);
		age = actuallyDate.getFullYear() - dateBirth.getFullYear();
		let month = actuallyDate.getMonth() - dateBirth.getMonth();
		if (month < 0 || (month === 0 && actuallyDate.getDate() < dateBirth.getDate()))
		{
			age--
		}
		form.setFieldsValue({age})
	}
	const handleSubmit = async () => {
		const values = await form.validateFields()
		const dto = DTOSet(values)
		dispatch(
			createCustomer(dto,async (response)=>{
				const res = await response
				if (res.error){
					for (const key in res.message){
						if (res.message[key][0] === "validation.unique"){
							warning(`Los datos del campo ${
								key
							} ya se encuentran registrados.`)
						}
					}
					errorGlobal(res.message)
				}else {
					dispatch(fetchAllCustomer())
					success(res.message)
					onCloseDrawer()
				}
			})
		)
	}
	
	const textReassignAdvisor = <span style={{ color: '#6A6963' }}>Registrar Cliente</span>
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textReassignAdvisor}>
				<Button onClick={showModal} type='primary' size='small' icon={<UserAddOutlined/>} />
			</Tooltip>
			<Drawer
				title={'Nuevo Cliente'}
				visible={visible}
				width="800"
				onClose={onCloseDrawer}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					name="nest-messages"
					layout="vertical"
					onFinish={handleSubmit}
					form={form}
					style={{ height: '100%', width: "100%" }}
				>
					<Forms disable={false} detectAge={detectAge}/>
					<div style={{textAlign: "right"}}>
						<Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Registrar Cliente
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	)
}

export default Register