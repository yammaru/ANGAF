import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { errorGlobal } from "../views/handle/Notification/Notification";
import {
	deleteUnitTypeByIdAttachment,
	creatUnitTypeAttachment,
} from "../redux/actions/Project/UnitType";
import { Upload } from "antd";

export const useModals = (props) => {
	const dispatch = useDispatch();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalPrevVisible, setIsModalPrevVisible] = useState(false);
	const [fileImage, setFileImage] = useState("");
	const req = props.record.blueprints;
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (req != null) {
			const tempImages = req.map((r, index) => ({
				uid: r.id,
				percent: 50,
				name: `Multimedia ${index + 1}`,
				status: "done",
				url: r.path,
			}));
			setImages(tempImages);
		}
	}, [req]);

	useEffect(() => {
		if (req != null) setData(req);
	}, [req]);
	const [data, setData] = useState();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const visibleModals = () => {
		if (isModalVisible) {
			setIsModalPrevVisible(true);
			setIsModalVisible(false);
		} else {
			setIsModalVisible(true);
			setIsModalPrevVisible(false);
		}
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOkPrev = () => {
		setIsModalPrevVisible(false);
		setIsModalVisible(true);
	};

	const handleCancelPrev = () => {
		setIsModalPrevVisible(false);
		setIsModalVisible(true);
	};

	const handleDelete = useCallback(
		(record) => {
			setData((prevState) => {
				const dataSource = [...prevState];
				const newData = dataSource.filter(
					(item) => item.id !== record.uid
				);
				dispatch(
					deleteUnitTypeByIdAttachment(record.uid, props.record.id)
				);
				return newData;
			});
		},
		[data, dispatch, props.record.id]
	);

	const handlePreview = async (file) => {
		setFileImage(file.hasOwnProperty("url") ? file.url : file.thumbUrl);
		visibleModals();
	};

	const uploadImage = useCallback(async (file) => {
		setImages(file.fileList);
	}, []);

	const uploadProps = {
		beforeUpload: (file) => {
			if (file.type !== "image/png" && file.type !== "image/jpeg") {
				errorGlobal("Formato no válido");
				return file.type === ("image/png" || "image/jpeg")
					? true
					: Upload.LIST_IGNORE;
			}
		},
		customRequest({ onSuccess, onError, file }) {
			let formData = new FormData();
			formData.append("file", file, file.name);
			formData.append("type", 2);
			dispatch(
				creatUnitTypeAttachment(
					props.record.id,
					formData,
					onSuccess,
					onError
				)
			);
		},
		onChange: (info) => {
			console.info(info.fileList);
		},
	};

	return {
		isModalVisible,
		isModalPrevVisible,
		fileImage,
		images,
		showModal,
		handleOk,
		handleCancel,
		handleOkPrev,
		handleCancelPrev,
		handleDelete,
		handlePreview,
		uploadImage,
		uploadProps,
	};
};
