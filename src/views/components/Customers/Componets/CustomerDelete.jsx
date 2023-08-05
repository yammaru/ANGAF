import { useDispatch } from "react-redux";
import { Popconfirm, Tooltip, Button } from "antd";
import React, { useContext, useState } from "react";
import { CustomerContext } from "./CustomerProvider";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteCustomerById } from "../../../../redux/actions/Customer/CustomerAction";
import { success, error, errorGlobal } from "../../../handle/Notification/Notification";

const CustomerDelete = ({
	dispatchDeleteCustomerAction,
	dispatchFetchAllCustomerAction,
}) => {
	const { request } = useContext(CustomerContext);
	const dispatch = useDispatch();
	const customer = request.customer;
	const [id] = useState(customer.id);
	const cancel = () =>{
		error("Operación cancelada");
	}

	const textDelete = <span style={{ color: "#6A6963" }}>Eliminar</span>;

	const customerdelete = () => {
		dispatch(
			deleteCustomerById(id, async (response) => {
				let res = await response;
				if (res.error) {
					errorGlobal("¡UPS, ha ocurrido un error.");
				} else {
					success("Cliente eliminado con éxito.");
				}
			})
		);
	};

	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textDelete}>
				<Popconfirm
					title={`¿Desea eliminar el cliente ? `}
					onConfirm={customerdelete}
					onCancel={cancel}
					okText="Si"
					cancelText="No"
					icon={<QuestionCircleOutlined style={{ color: "red" }} />}
				>
					<Button
	icon={<DeleteOutlined/>}
	type="primary"
	size="small"
	danger
	/>
				</Popconfirm>
			</Tooltip>
		</>
	);
};

export default CustomerDelete;
