import {
	CaretLeftOutlined,
	CaretRightOutlined,
	FileImageTwoTone,
	HeartFilled,
	HeartOutlined,
	HomeOutlined,
	LikeOutlined,
	MenuOutlined,
	MessageOutlined,
	PlusCircleOutlined,
	ShareAltOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	StarOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
	Divider,
	Image,
	Input,
	List,
	Modal,
	Row,
	Space,
	Table,
	Upload,
	message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FORMATTER_PESO } from "../../../redux/constants";
import Title from "antd/lib/typography/Title";
import { useWindowWidth } from "../../handle/size/size";
import yourLookLogo from "../../../includes/images/yourLookAmarillo.jpg";
import BurgerMenu from "../Layout/components/NavMenuItems/BurgerMenu";
import ComentModal from "./componet/ComentModal";
import NavYourLook from "./componet/NavYourLook";
const { TextArea } = Input;
const { Meta } = Card;
const YourLookSection = () => {
	const anchoPagina = useWindowWidth(useState, useEffect);
	const [loadedItems, setLoadedItems] = useState(10);

	const elements = [
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo2",
			value: 554,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			name: "lobo1",
			value: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			name: "lobo2",
			value: 5555,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
	];
	const mayoA1025 = () => {
		return anchoPagina > 1025 ?? false;
	};
	useEffect(() => {
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
	}, [anchoPagina]);
	const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
	const [visibleElements, setVisibleElements] = useState(elements);
	const [noVisibleElements, setNoVisibleElements] = useState(
		visibleElements.slice(0, mayoA1025() ? 4 : 2)
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [comentar, setComentar] = useState(false);
	const [likeState, setLikeState] = useState(false);
	const showComentario = () => {
		if (comentar == true) {
			setComentar(false);
		} else {
			setComentar(true);
		}
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handlePrevPage = () => {
		const lastElement = visibleElements.pop();
		visibleElements.unshift(lastElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
	};

	const handleNextPage = () => {
		const firstElement = visibleElements.shift();
		visibleElements.push(firstElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, mayoA1025() ? 4 : 2));
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
	}));

	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
	const handleLikeClick = () => {
		setLikeState(!likeState);
	};
	const likeButton = (text) => (
		<Button
			style={{
				backgroundColor: "transparent",

				display: "flex",
				alignItems: "center",
				justifyContent: "center",

				borderColor: "transparent",
			}}
			icon={likeState ? <HeartFilled /> : <HeartOutlined />}
			onClick={handleLikeClick}
		>
			{text}
		</Button>
	);
	const shareModal = (icon, text) => (
		<>
			<Button
				style={{
					backgroundColor: "transparent",

					display: "flex",
					alignItems: "center",
					justifyContent: "center",

					borderColor: "transparent",
				}}
				icon={icon}
				onClick={showModal}
			>
				{text}
			</Button>
			<Modal
				onOk={handleOk}
				closable={false}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={<Button>kkkk</Button>}
			>
				<h4>Contenido para compartir</h4>
				<p>Este es un artículo interesante que deseo compartir:</p>

				<a
					href="https://www.facebook.com/sharer/sharer.php?u=https://www.ejemplo.com/articulo"
					target="_blank"
				>
					Compartir en Facebook
				</a>

				<a
					href="https://twitter.com/intent/tweet?url=https://www.ejemplo.com/articulo&text=Título+del+artículo"
					target="_blank"
				>
					Compartir en Twitter
				</a>
			</Modal>
		</>
	);
	const textlist = [
		"Todo",
		"Licencia",
		"Colaboraciones",
		"Tendencia⚡",
		"Lo más vendido 🔝",
		"Viral 🔥",
		"Trends",
		"Novedades 💥",
	];
	const dataSource = [
		{
			key: "0",
			text: "Todo",
		},
	];

	const columns = textlist.map((text, index) => ({
		title: null,
		dataIndex: "text",
		key: `name${index}`,
		customCell: () => ({
			style: {
				padding: 0, // Eliminar el padding de las celdas
			},
		}),
		render: (_) => (
			<div
				style={{
					maxWidth: "80px",
					minWidth: "80px",
					height: "80px",
					background: "black",
					borderRadius: "50%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "14px",
					margin: "10px",
					textAlign: "center",
					padding: 0,
				}}
			>
				{text}
			</div>
		),
	}));
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
	const loadMoreItems = () => {
		// Incrementa el número de elementos cargados
		setLoadedItems(loadedItems + 10);
	};

	return (
		<>
			<NavYourLook props={props} />
			<Divider />
			<Row
				justify={"space-around"}
				type={"flex"}
				style={{ width: "100%", alignItems: "center" }}
			>
				<Col xs={2}>
					<a>
						<Badge color={"green"} dot={true}>
							<Avatar
								src={
									"https://as2.ftcdn.net/v2/jpg/05/79/23/55/1000_F_579235506_uxWoSoQ0g1O5aIpjikSKUQcKkGRB2Dqo.jpg"
								}
							/>
						</Badge>
					</a>
				</Col>
				<Col xs={16}>
					<Button
						style={{
							borderRadius: "15px",
							background: "#e0e0e0",
							textAlign: "start",
						}}
						block
					>
						¿Que es de tu vida Anga?
					</Button>
				</Col>
				<Col xs={2}>
					<FileImageTwoTone
						twoToneColor="#cc9f22"
						style={{ fontSize: "30px" }}
					/>
				</Col>
			</Row>

			<Row
				style={{
					width: "100%",
					paddingBottom: "3%",
				}}
			>
				<Table
					showHeader={false}
					pagination={false}
					title={null}
					dataSource={dataSource}
					columns={columns}
					scroll={{ x: 400 }}
					className="custom-table"
				/>
			</Row>

			<Row justify={"center"} style={{ width: "100%" }}>
				<Col
					style={{
						width: "90%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<List
						itemLayout="vertical"
						size="large"
						pagination={false}
						dataSource={data.slice(0, loadedItems)}
						footer={false}
						renderItem={(item, index) => (
							<>
								<List.Item
									footer={"hola"}
									style={{
										border: "1px solid #787878",
										borderRadius: "10px",
										padding: 0,
									}}
									key={item.title}
									actions={false}
									extra={false}
								>
									<Row style={{ width: "100%", padding: 0 }}>
										<Col
											style={{
												width: "90%",
												padding: "2%",
											}}
										>
											<List.Item.Meta
												avatar={
													<Avatar src={item.avatar} />
												}
												title={
													<a href={item.href}>
														{item.title}
													</a>
												}
											/>
										</Col>
										<Col
											style={{
												width: "10%",
												display: "flex",
												justifyContent: "end",
												alignItems: "flex-start",
												padding: "1%",
											}}
										>
											<Link
												className="footer-anga"
												to={`/producto/${item.name}`}
											>
												<ShoppingCartOutlined
													style={{ fontSize: 40 }}
												/>
											</Link>
										</Col>
									</Row>

									{item.content}
									<br />
									<img
										width={"100%"}
										height={"auto"}
										alt="logo"
										src="https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg"
									/>
									<Row
										justify={"space-around"}
										style={{
											border: "1px solid #e0e0e0",
											padding: "2%",
											alignItems: "center",
										}}
									>
										<Col>{likeButton("156")}</Col>
										<Col>
											<ComentModal
												item={item}
												IconText={IconText}
												shareModal={shareModal}
												likeButton={likeButton}
												MessageOutlined={
													MessageOutlined
												}
												anchoPagina={anchoPagina}
												props={props}
												Upload={Upload}
											/>
										</Col>
										<Col>
											{shareModal(
												<ShareAltOutlined />,
												"2"
											)}
										</Col>
									</Row>
									<Row>
										<Button type="link">
											ver mas comentario
										</Button>
									</Row>

									<br />
								</List.Item>
								<Divider />
							</>
						)}
					/>
					{loadedItems < data.length && (
						<Button type="ghost" onClick={loadMoreItems}>
							Cargar más elementos
						</Button>
					)}
				</Col>
			</Row>
		</>
	);
};
export default YourLookSection;
