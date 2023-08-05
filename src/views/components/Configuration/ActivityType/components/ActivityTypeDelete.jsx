import { useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { message, Popconfirm, Tooltip, Button } from "antd";
import {error} from "../../../../handle/Notification/Notification";
import { deleteActivityTyperById, fetchAllActivityType } from "../../../../../redux/actions/Configuration/ActivityTypeAction";

const ActivityTypeDelete = ({activityType}) => {
	const dispatch = useDispatch();
	const [visible,setVisible] = useState(false)
	const [id] = useState(activityType.id);
	
	useEffect(()=>{
		if (activityType.id === 1 || activityType.id === 2 ){
			setVisible(true)
		}
	},[])

	const cancel = () => {
		error("Operación cancelada")
	}

	const textDelete = <span style={{ color: "#6A6963" }}>Eliminar</span>;
	const deleteProfile = () => {
		dispatch(
			deleteActivityTyperById(
				id,
				async (response) => {
					let res = await response;
					if (res.error) {
					}
					message.success("Tipo de actividad eliminada con +éxito");
					dispatch(fetchAllActivityType());
				},
				async (response) => {
					const res = await response;
					message.error(`Error: ${res}`);
				}
			)
		);
	};
	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={textDelete}>
				<Popconfirm
					title={`¿Desea eliminar el tipo de actividad ${activityType.name}? `}
					onConfirm={deleteProfile}
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
						disabled={visible}
					/>
				</Popconfirm>
			</Tooltip>
		</>
	);
};

export default ActivityTypeDelete;
