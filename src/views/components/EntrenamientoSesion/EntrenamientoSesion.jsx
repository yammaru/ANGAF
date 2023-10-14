import React, { Fragment } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import {
	Avatar,
	Col,
	Divider,
	Input,
	List,
	Row,
	Select,
	Space,
	Typography,
} from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Search } = Input;
const data = Array.from({
	length: 3,
}).map((_, i) => ({
	href: "https://ant.design",
	title: `ant design part ${i}`,
	avatar: "https://joeschmoe.io/api/v1/random",
	description:
		"Ant Design, a design language for background applications, is refined by Ant UED Team.",
	content:
		"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);
const EntrenamientoSesion = () => {
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};
	const onSearch = (value) => {
		console.log("search:", value);
	};
	return (
		<Row justify={"center"} style={{ width: "100%" }}>
			<Row
				justify={"center"}
				style={{ width: "70%", paddingBottom: "2%" }}
			>
				<Title level={2} style={{ textAlign: "center" }}>
					No nos vemos como un producto terminado, nos quitamos
					constantemente las gafas del ego y aprendemos todos los días
				</Title>
				<Text>
					Conoce parte del conocimiento que nos ha formado en lo que
					somos.
				</Text>
			</Row>

			<Row
				justify={"space-evenly"}
				style={{
					width: "100%",
					height: 100,
					background: "#fbfbfb",
					alignContent: "center",
				}}
			>
				<Col>
					<Search></Search>
				</Col>
				<Col>
					<Select
						showSearch
						placeholder="Select a person"
						optionFilterProp="children"
						onChange={onChange}
						onSearch={onSearch}
						filterOption={(input, option) =>
							(option?.label ?? "")
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={[
							{
								value: "jack",
								label: "Jack",
							},
							{
								value: "lucy",
								label: "Lucy",
							},
							{
								value: "tom",
								label: "Tom",
							},
						]}
					/>
				</Col>
				<Col>
					<Select
						showSearch
						placeholder="Select a person"
						optionFilterProp="children"
						onChange={onChange}
						onSearch={onSearch}
						filterOption={(input, option) =>
							(option?.label ?? "")
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={[
							{
								value: "jack",
								label: "Jack",
							},
							{
								value: "lucy",
								label: "Lucy",
							},
							{
								value: "tom",
								label: "Tom",
							},
						]}
					/>
				</Col>
			</Row>
			<Divider style={{ visibility: "hidden" }} />
			<Row justify={"center"} style={{ width: "60%" }}>
				<List
					itemLayout="vertical"
					size="large"
					pagination={false}
					dataSource={data}
					footer={false}
					renderItem={(item) => (
						<List.Item
							key={item.title}
							actions={[<Space>Febrero 02, 2021</Space>]}
							extra={
								<img
									width={272}
									alt="logo"
									src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
								/>
							}
						>
							<Title level={5} style={{ color: "#787878" }}>
								tema
							</Title>
							<h4 style={{}}>
								No nos vemos como un producto terminado, nos
								quitamos constantemente las gafas del ego y
								aprendemos todos los días
							</h4>
							{item.content}
						</List.Item>
					)}
				/>
			</Row>
		</Row>
	);
};

export default EntrenamientoSesion;
