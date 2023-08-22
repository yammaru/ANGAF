
import { Card, Col, Divider, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom";
const { Meta } = Card;
const LookbookSection = () => {
	const elements = [
		{
			id: 13,
			name: "lobo1",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			id: 1222,
			name: "lobo2",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			id: 122,
			name: "lobo3",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			id: 12,
			name: "lobo4",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			id: 1111,
			name: "lobo5",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			id: 111,
			name: "lobo6",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
		{
			id: 11,
			name: "lobo7",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			],
		},
		{
			id: 1,
			name: "lobo8",
			date: 5524,
			path: [
				"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
				"https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
			],
		},
	];
	return (
		<>
			<Divider style={{ paddingBottom: "2%" }} />
            <Divider style={{ visibility: "hidden" }} />
			<Row justify={"center"}>
				<h1>LOOKBOOK</h1>
			</Row>
            <Divider style={{ visibility: "hidden" }} />
			<Row justify={"space-between"}>
				{elements.map((element, index) => (
					<Col style={{ width: "33%",padding: "5px", }}>
						<Link  to={`/lockbook/${element.id}`}>
							<Card
								hoverable
								style={{
									height: 700,
									width: "100%",
									overflow: "hidden",
									padding: "5px",
								}}
								cover={
									<img
										style={{
											height: 620,
											width: "100%",
											overflow: "hidden",
										}}
										alt="example"
										src={element.path[0]}
									/>
								}
							>
								<Meta
									title={element.name}
									description={element.date}
								/>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};
export default LookbookSection;
