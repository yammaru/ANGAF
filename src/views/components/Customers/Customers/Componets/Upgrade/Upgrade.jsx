import Forms from "../Forms";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Drawer, Form} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useCustomers} from "../../Hooks/useCustomers";
import {fetchAllCustomer, updateCustomerById} from "../../../../../../redux/actions/Customer/CustomerAction";
import {errorGlobal, success} from "../../../../../handle/Notification/Notification";

const Upgrade = ({customer}) => {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()
	const {DTOSet,FillInTheForm} = useCustomers()

	const showDrawer = () => {setVisible(true)}
	const resetFields = () => form.resetFields()
	const closeDrawer = () => {
		setVisible(false) 
		resetFields()
	}

	const detectAge = (date) => {
		let age = 0;
		if (date){
			let actuallyDate = new Date();
			let dateBirth = new Date(date);
			age = actuallyDate.getFullYear() - dateBirth.getFullYear();
			let month = actuallyDate.getMonth() - dateBirth.getMonth();
			if (month < 0 || (month === 0 && actuallyDate.getDate() < dateBirth.getDate()))
			{
				age--
			}
			form.setFieldsValue({age})
		}else{
			form.setFieldsValue({age: 0})
		}
	}
	
	const fillFields = () => {
		form.setFieldsValue(FillInTheForm(customer))
	}
	
	const handleSubmit = async () => {
		const values = await form.validateFields()
		const DTO = DTOSet(values)
		dispatch(updateCustomerById(customer.id,DTO,async (response)=>{
			const res = await response
			dispatch(fetchAllCustomer())
			success(res.message)
			closeDrawer()
		},async (error)=>{
			const err = await error
			errorGlobal(err.message)
		}))
	}
	
	return (
		<>
			<Button
				onClick={()=> {fillFields(); showDrawer() }}
				type="primary"
				size={"small"}
				icon={<EditOutlined/>}
				style={{backgroundColor: "#ffa247", borderColor: "#ffa247"}}
			/>
			<Drawer
				title="Editar Clientes"
				width="800"
				onClose={closeDrawer}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					layout="vertical"
					size="middle"
					form={form}
					onFinish={handleSubmit}
				>
					<Forms disable={customer.identification == null ? false : null} detectAge={detectAge}/>
					<div style={{textAlign: "right"}}>
						<Button onClick={closeDrawer} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Actualizar Cliente
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	)
}

export default Upgrade