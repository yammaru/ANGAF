import { Button, Tooltip } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { ProfileContext } from "./ProfileProvider";
import React, { useState, useContext } from "react";
import ModalListPermission from "./ModalListPermission";

const PermisosProfile = () => {
	const { profile } = useContext(ProfileContext);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const text = <span style={{ color: "#6A6963" }}>Asignar Permisos </span>;
	return (
		<>
			<Tooltip placement="left" color="#ffffff" title={text}>
				<Button
					size="small"
					type="primary"
					onClick={showModal}
					icon={<TeamOutlined />}
				/>
			</Tooltip>
			{isModalVisible && (
				<ModalListPermission
					data={profile}
					onClose={setIsModalVisible}
					handleCancel={handleCancel}
				/>
			)}
		</>
	);
};
export default PermisosProfile;
