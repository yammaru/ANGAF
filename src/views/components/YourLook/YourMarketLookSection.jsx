import { Affix, Avatar, Button, Col, Divider, Row, message } from "antd";
import NavYourLook from "./componet/NavYourLook";
import { FORMATTER_INPUT_NUMBER } from "../../../redux/constants";
import {
	BarsOutlined,
	ExportOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import CreateButtonYourMarquetLook from "./componet/CreateButtonYourMarquetLook";
import { useState } from "react";
import CategoriasRopaModal from "./componet/CategoriasRopaModal";

const YourMarketLookSection = () => {

	const [modalVisible, setModalVisible] = useState(false);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
	const handleCategoriaSeleccionada = (categoria) => {
	  setCategoriaSeleccionada(categoria);
	};
  
	const mostrarModal = () => {
	  setModalVisible(true);
	};
  
	const cerrarModal = () => {
	  setModalVisible(false);
	};
		const props = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text",
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};
	const data = Array.from({
		length: 13,
	}).map((_, i) => ({
		href: "https://ant.design",
		title: `ant design part ${i}`,
		avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
		description:
			"Ant Design, a design language for background applications, is refined by Ant UED Team.",
		name: "lobo2",
		content:
			"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
		value: 85,
		categoria:i%2==0?"pantalones":"camisetas"
	}));
	const datosFiltrados = categoriaSeleccionada
    ? data.filter((producto) => producto.categoria === categoriaSeleccionada)
    : data;
console.log(datosFiltrados);
	return (
		<Row>
			<Affix offsetTop={0} style={{ width: "100%" }}>
				<Row
					style={{
						width: "100%",
						alignItems: "center",
						background: "white",
					}}
				>
					<NavYourLook props={props} />
					<Row
						justify={"space-between"}
						style={{
							width: "100%",
							paddingBottom: 4,
							background: "white",
						}}
					>
						<h3
							style={{
								fontVariant: "small-caps",
								color: "#484848",
							}}
						>
							<b>YourMarquetLook</b>
						</h3>

						<Col
							style={{
								display: "flex",
								alignItems: "flex-end",
							}}
						>
							<Avatar
								src={
									"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
								}
							/>
							<SearchOutlined style={{ fontSize: 35 }} />
						</Col>
					</Row>
				</Row>
			</Affix>

			<Row justify={"space-evenly"} style={{ width: "100%" }}>
				<Col
					style={{
						width: "40%",
					}}
				>
					<CreateButtonYourMarquetLook
						ExportOutlined={ExportOutlined}
					/>
				</Col>
				<Col
					style={{
						width: "40%",
					}}
				>
					<Button
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						block
						icon={<BarsOutlined />}
						onClick={mostrarModal}
					>
						categoria
					</Button>
					<CategoriasRopaModal
						visible={modalVisible}
						onClose={cerrarModal}
						onCategoriaSeleccionada={handleCategoriaSeleccionada}
					/>
				</Col>
			</Row>
			<Divider />
			<Row justify={"space-between"} style={{ width: "100%" }}>
				{datosFiltrados.map((x, index) => (
					<Col
						key={index}
						style={{
							backgroundImage: `url("${x.avatar}")`,
							backgroundSize: "cover",
							width: "49%",
							height: 200,
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<div
							style={{
								flex: 1,
								backgroundColor: "white",
								padding: 4,
								overflow: "hidden",
								height: 30,
								width: "100%",
							}}
						>
							<b>{FORMATTER_INPUT_NUMBER.formatter(x.value)}</b>
						</div>
					</Col>
				))}
			</Row>
		</Row>
	);
};
export default YourMarketLookSection;
