import { red } from "@material-ui/core/colors";
import {
	Avatar,
	Col,
	Divider,
	Image,
	List,
	Radio,
	Row,
	Typography,
} from "antd";
import React, { Fragment, useState } from "react";
const { Title } = Typography;
const MundoAngaSesion = () => {
	const data = [
		{
			title: "Ant Design Title 1",
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 4",
		},
	];
	const [selectedValue, setSelectedValue] = useState(1);

	const handleChange = (e) => {
		setSelectedValue(e.target.value);
	};
	const titles = Array.from({ length: 7 }, (_, index) => ({
		image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	}));
	return (
		<>
			<div
				style={{
					width: "100%",
					background: `url(${"https://c4.wallpaperflare.com/wallpaper/277/625/220/anime-overlord-lupusregina-beta-wallpaper-thumb.jpg"})`,
					height: "55%",
					backgroundSize: "cover", // La imagen se ajusta para cubrir el contenedor
					backgroundPosition: "center", // Centramos la imagen

					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1
					style={{
						mixBlendMode: "difference",
						color: "white",
					}}
				>
					<b>NUESTRO MUNDO</b>
				</h1>
			</div>
			<Row justify={"center"} style={{ width: "100%" }}>
				<Col style={{ width: "60%" }}>
					<Divider style={{ visibility: "hidden" }} />
					<Title level={3} style={{ textAlign: "center" }}>
						Conoce lo que hay detrás de la ropa y las redes.
					</Title>
					<Divider
						style={{ visibility: "hidden", border: "black" }}
					/>
					<div
						style={{
							borderTopColor: "#484848",
							width: "100%",
							textAlign: "center",
						}}
					>
						<Radio.Group
							onChange={handleChange}
							value={selectedValue}
							size="large"
							buttonStyle="solid"
						>
							<Radio.Button
								style={{
									background:
										selectedValue === 1 ? "#484848" : "",
									border:
										selectedValue === 1
											? "#484848"
											: "transparent",
									boxShadow:
										selectedValue === 1 ? "#484848" : "",
								}}
								value={1}
							>
								EN IMÁGENES
							</Radio.Button>
							<Radio.Button
								style={{
									background:
										selectedValue === 2 ? "#484848" : "",
									border:
										selectedValue === 2
											? "#484848"
											: "transparent",
									boxShadow:
										selectedValue === 2 ? "#484848" : "",
									hover: "red",
								}}
								value={2}
							>
								EN PALABRAS
							</Radio.Button>
						</Radio.Group>
					</div>
					{selectedValue == 2 ? (
						<List
							style={{ width: "100%"}}
							itemLayout="horizontal"
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<Avatar
												size={{
													xs: 24,
													sm: 32,
													md: 40,
													lg: 64,
													xl: 80,
													xxl: 100,
												}}
												src="https://joeschmoe.io/api/v1/random"
											/>
										}
										title={
											<a href="https://ant.design">
													<Title level={4}>
					{item.title}
					</Title>
											
											</a>
										}
										description={
											<span>
												"Ant Design, a design language
												for background applications, is
												refined by Ant UED TeamAnt Design, a design language
												for background applications, is
												refined by Ant UED TeamAnt Design, a design language
												for background applications, is
												refined by Ant UED Team"
												<br />
												<b>algo({"carrera"})</b>
											</span>
										}
									/>
								</List.Item>
							)}
						/>
					) : (
						<Row justify={"start"} style={{ width: "100%" }}>
							{titles.map((_, index) => (
								<Col
									style={{
										width: "25%",
										gap: "2px",
										padding: "1%",
									}}
								>
									<Image src={_.image} />
								</Col>
							))}
						</Row>
					)}
				</Col>
			</Row>
		</>
	);
};

export default MundoAngaSesion;
