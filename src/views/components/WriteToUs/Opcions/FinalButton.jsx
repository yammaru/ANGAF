import { Button, Col, Divider, Row, Typography } from "antd";
const { Text } = Typography;
const FinalButton = ({ position, setPosition }) => {
	const handleBack = () => {
		setPosition(0);
	};
	const handleSubmit = async () => {
		console.log("2");
	};
	return (
		<>
			<Divider style={{ visibility: "hidden" }} />
			<Row
				justify={position == 0 ? "center" : "space-around"}
				style={{ width: "100%" }}
			>
				{position == 0 || position == 7 ? (
					<></>
				) : (
					<Col style={{ width: "40%" }}>
						<Button
							style={{
								border: "#484848",
								backgroundColor: "#484848",
							}}
							type="primary"
							onClick={handleBack}
							block
						>
							ATRAS
						</Button>
					</Col>
				)}{" "}
				{position == 4 ? (
					<></>
				) : (
					<Col
						style={{
							width: position == 0 ? "100%" : "40%",
							display: position == 0 ? "flex" : "",
							justifyContent: position == 0 ? "center" : "",
						}}
					>
						<Button
							style={{
								border: "#484848",
								backgroundColor: "#484848",
							}}
							type="primary"
							htmlType="submit"
							block
						>
							CONTINUAR
						</Button>
					</Col>
				)}
				{position == 4 ? (
					<Col style={{ width: "40%" }}>
						<Button
							style={{
								border: "#484848",
								backgroundColor: "#484848",
							}}
							type="primary"
							onClick={handleBack}
							block
						>
							Enviar
						</Button>
					</Col>
				) : (
					<></>
				)}
			</Row>
		</>
	);
};
export default FinalButton;
