import { Col, Divider, Row } from "antd";

const LookbookSectionId = () => {
	const element = {
		name: "blablbalbalbal",
		date: "Julio 2023",
		paths: [
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
		],
		video_path: "https://www.youtube.com/embed/85MppyLJHz0",
	};
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
			<Divider style={{ visibility: "hidden" }} />
			<Row justify={"center"}>
				<h1>{element.name}</h1>
			</Row>
			<Divider style={{ visibility: "hidden" }} />
			<Row justify={"center"}>
				<h4>{element.date}</h4>
			</Row>
			<Divider style={{ visibility: "hidden" }} />
			<Row style={{ height: "100vh" }}>
				<iframe
					width="100%"
					height="100%"
					src={element.video_path}
					allowfullscreen
				></iframe>
			</Row>
			<Divider style={{ visibility: "hidden" }} />
			<Row justify={"space-around"}>
				{element.paths.map((x) => (
					<Col style={{ width: "45%", padding: "20px" }}>
						<img
							style={{
								height: "100%",
								width: "100%",
								overflow: "hidden",
							}}
							alt="example"
							src={x}
						/>
					</Col>
				))}
			</Row>
		</>
	);
};
export default LookbookSectionId;
