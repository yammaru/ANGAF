import { useState } from "react";
import {
	Modal,
	Button,
	Row,
	Col,
	Avatar,
	List,
	Skeleton,
	Input,
	Popconfirm,
	Popover,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
	CameraOutlined,
	DollarCircleOutlined,
	SendOutlined,
	ShareAltOutlined,
	ShoppingCartOutlined,
	SmileOutlined,
} from "@ant-design/icons";

const EmojiButton = ({ onEmojiSelect }) => {
	const emojiList = ["😊", "👍", "❤️", "🎉", "🙌"];
	const [showEmojiMenu, setShowEmojiMenu] = useState(false);

	const handleEmojiSelect = (emoji) => {
		onEmojiSelect(emoji);
		setShowEmojiMenu(false);
	};

	return (
		<Popover
			placement="top"
			content={
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{emojiList.map((emoji, index) => (
						<span
							key={index}
							style={{
								cursor: "pointer",
								marginRight: "5px",
							}}
							onClick={() => {
								handleEmojiSelect(emoji);
							}}
						>
							{emoji}
						</span>
					))}
				</div>
			}
			visible={showEmojiMenu}
			onCancel={() => setShowEmojiMenu(false)}
			okButtonProps={{ style: { display: "none" } }}
			cancelButtonProps={{ style: { display: "none" } }}
		>
			<Button
				className="footer-anga"
				style={{
					background: "transparent",
					border: "1px solid transparent",
				}}
				icon={<SmileOutlined style={{ fontSize: "28px" }} />}
				onClick={() => setShowEmojiMenu(!showEmojiMenu)}
			/>
		</Popover>
	);
};

const ComentModal = ({
	IconText,
	MessageOutlined,
	item,
	shareModal,
	likeButton,
	anchoPagina,
	Upload,
	props,
}) => {
	const [visible, setVisible] = useState(false);
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState(
		Array.from({
			length: 13,
		}).map((_, i) => ({
			href: "https://ant.design",
			title: `ant design part ${i}`,
			avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			description:
				"Ant Design, a design language for background applications, is refined by Ant UED Team.",
			name: { last: "lobo2" },
			content:
				"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
			picture: {
				large: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			},
			create_at: "14-02-2023",
		}))
	);
	const [inputValue, setInputValue] = useState("");

	const handleEmojiSelect = (emoji) => {
		setInputValue((prevValue) => prevValue + emoji);
	};
	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};
	const handleButtonClick = () => {
		showModal();
		// Desenfocar el botón después de hacer clic
		document.activeElement.blur();
	};
	const onLoadMore = () => {
		setLoading(true);
	};
	const footerContent = (
		<Row style={{ width: "100%" }} justify={"space-evenly"}>
			<Col xs={2}>
				<Avatar src={item.avatar} />
			</Col>
			<Col xs={21}>
				<div
					style={{
						background: "#e0e0e0",

						height: "auto",
						borderRadius: "15px",
						padding: "1%",
					}}
				>
					<Row
						justify={"center"}
						style={{
							width: "100%",
							display: "flex",
						}}
					>
						<TextArea
							style={{
								background: "transparent",
								border: "1px solid transparent",
								boxShadow: "transparent",
							}}
							rows={2}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</Row>

					<Row justify={"space-around"} style={{ width: "100%" }}>
						<Col
							xs={14}
							style={{ textAlign: "left", display: "flex" }}
						>
							<Upload {...props}>
								<Button
									className="footer-anga"
									style={{
										background: "transparent",
										border: "1px solid transparent",
									}}
									icon={
										<CameraOutlined
											style={{ fontSize: "30px" }}
										/>
									}
								/>
							</Upload>
							<EmojiButton onEmojiSelect={handleEmojiSelect} />
						</Col>
						<Col xs={9}>
							<Button
								className="footer-anga"
								style={{
									background: "transparent",
									border: "1px solid transparent",
								}}
								icon={
									<SendOutlined
										style={{ fontSize: "30px" }}
									/>
								}
							/>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	);

	return (
		<div>
			<Button
				className="footer-anga"
				style={{
					background: "transparent",
					border: "1px solid transparent",
				}}
				type="primary"
				icon={
					<IconText
						icon={MessageOutlined}
						text="156"
						key="list-vertical-like-o"
					/>
				}
				onClick={handleButtonClick}
			/>
			<Modal
				title={`Publicacion de ${item.name}`}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={footerContent}
				style={{
					top: 0,
					borderRadius: "5%",
				}}
				bodyStyle={{
					height: "calc(89vh - 108px)",
					padding: 0,
					overflowY: "auto",
				}}
			>
				<div style={{ height: "100%" }}>
					<Row style={{ width: "100%", padding: 0 }}>
						<Col
							style={{
								width: "90%",
								padding: "2%",
							}}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={<a href={item.href}>{item.title}</a>}
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
								<DollarCircleOutlined
									className="footer-anga"
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
							<MessageOutlined />
						</Col>
						<Col>{shareModal(<ShareAltOutlined />, "2")}</Col>
					</Row>
					{list.map((x) => (
						<>
							<Row
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-evenly",
									paddingBottom: "1%",
								}}
							>
								<Col xs={2}>
									<Avatar src={x.picture.large} />
								</Col>
								<Col
									xs={21}
									style={{
										background: "#e0e0e0",
										height: "auto",
										padding: "2%",
										borderRadius: "15px",
									}}
								>
									<b>{x.name?.last}</b>
									<br />
									"Ant Design, a design language for
									background applications, is refined by Ant
									UED Team
								</Col>
							</Row>
							<Row>
								<Col offset={3} style={{ color: "#e0e0e0" }}>
									{x.create_at}
								</Col>
							</Row>
						</>
					))}
				</div>
			</Modal>
		</div>
	);
};
export default ComentModal;
