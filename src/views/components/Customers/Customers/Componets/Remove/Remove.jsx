import React from "react"
import {useDispatch} from "react-redux";
import {Button, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {deleteCustomerById} from "../../../../../../redux/actions/Customer/CustomerAction";
import {errorGlobal, success, warning} from "../../../../../handle/Notification/Notification";


const Remove = ({id}) => {
	const textDelete = <span style={{ color: "#6A6963" }}>Eliminar</span>
	const dispatch = useDispatch()
	const cancel = () => {
		warning("Operación cancelada")
	}
	const removeClient = () => {
		dispatch(
			deleteCustomerById(id,async (response)=>{
				const res = await response
				if (res.error){
					errorGlobal(res.message)
				}else {
					success(res.message)
				}
			})
		)
	}
	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textDelete}>
				<Popconfirm 
					title={"¿Desea eliminar el cliente ?"}
					onConfirm={removeClient}
					onCancel={cancel}
					okText={"Si"}
					cancelText={"No"}
					icon={<QuestionCircleOutlined style={{ color:"red" }} />}
				>
					<Button
						type={"primary"}
						size={"small"}
						danger
						icon={<DeleteOutlined/>}
					/>
				</Popconfirm>
			</Tooltip>
		</>
	)
}

export default Remove