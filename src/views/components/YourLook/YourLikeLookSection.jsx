import { Col, Image, Row, message } from "antd";
import NavYourLook from "./componet/NavYourLook";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

const YourLikeLookSection = () => {
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
		likes: 85,
	}));
	return (
		<Row>
			<NavYourLook props={props} />
			<Row justify={"space-between"} style={{ width: "100%" }}>
				{data.map((x) => (
					<Col
						style={{
							backgroundImage: `url("${x.avatar}")`,
							backgroundSize: "cover",
							width: "33%",
							color: "white",
							height: 200,
							display: "flex",
							alignItems: "flex-end",
							padding: 4,
						}}
					>
						<HeartOutlined style={{ fontSize: "20px" }} /> {x.likes}
					</Col>
				))}
			</Row>
		</Row>
	);
};
export default YourLikeLookSection;
