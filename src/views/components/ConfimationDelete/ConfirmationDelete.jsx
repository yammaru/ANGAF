import React from "react";
import { Popconfirm, Tooltip, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {error} from "../../handle/Notification/Notification";

const DeleteConfirmModal = () => {
	const cancel = () => {
		error("Operación cancelada");
	}

	const textDelete = <span style={{ color: "#6A6963" }}>Eliminar</span>;

	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textDelete}>
				<Popconfirm
					title="Eliminar venta?"
					onConfirm={() => {}}
					onCancel={cancel}
					okText="Si"
					cancelText="No"
				>
					<Button
						icon={<DeleteOutlined />}
						type="primary"
						size="small"
						danger
					/>
				</Popconfirm>
			</Tooltip>
		</>
	);
}
export default DeleteConfirmModal