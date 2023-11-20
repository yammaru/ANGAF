import React, { useState } from "react";
import { Drawer, Button, Form, Input, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateButtonYourMarquetLook = ({ ExportOutlined }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const onFinish = (values) => {
		// Aquí puedes manejar la lógica para enviar la información a donde sea necesario
		console.log("Valores del formulario:", values);
		onClose();
	};
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	const customRequest = ({ file, onSuccess }) => {
		// Aquí puedes manejar la lógica para subir la imagen, por ejemplo, utilizando una API
		// En este ejemplo, simplemente muestra un mensaje de éxito después de 2 segundos
		setTimeout(() => {
			onSuccess();
			message.success(`${file.name} fue subido correctamente.`);
		}, 2000);
	};
	const beforeUpload = (file) => {
		const isImage = file.type.startsWith("image/");
		if (!isImage) {
			message.error("Solo puedes subir archivos de imagen");
		}
		return isImage;
	};
	return (
		<>
			<Button
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				block
				icon={<ExportOutlined />}
				onClick={showDrawer}
			>
				vender
			</Button>
			<Drawer
				title="Información de Venta"
				width={"100%"}
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={false}
			>
				<Form layout="vertical" onFinish={onFinish}>
					<Form.Item name="producto" label="¿Qué vendes?">
						<Input />
					</Form.Item>
					<Form.Item name="precio" label="Precio ($)">
						<Input type="number" />
					</Form.Item>
					<Form.Item name="categoria" label="Categoría">
						<Select>
							<Option value="electronicos">Electrónicos</Option>
							<Option value="ropa">Ropa</Option>
							{/* Agrega más opciones según tus categorías */}
						</Select>
					</Form.Item>
					<Form.Item name="ubicacion" label="Ubicación">
						<Input value="Valledupar" disabled />
					</Form.Item>
					<Form.Item name="descripcion" label="Descripción">
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						name="imagenes"
						label="Fotos del producto"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload
							customRequest={customRequest}
							beforeUpload={beforeUpload}
							listType="picture"
							maxCount={3}	
                            accept="image/*"
						>
							<Button icon={<UploadOutlined />}>
								Seleccionar Archivos
							</Button>
						</Upload>
					</Form.Item>

					<Form.Item>
						<Button
							style={{
								background: "#484848",
								border: "1px solid #484848",
							}}
							type="primary"
							htmlType="submit"
							block
						>
							Enviar
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};

export default CreateButtonYourMarquetLook;
