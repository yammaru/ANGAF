import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import { useState } from "react";

const HeaderFilterProduct = ({ elements, lastWord }) => {
	const [visibleElements, setVisibleElements] = useState(elements);
	const [noVisibleElements, setNoVisibleElements] = useState(
		visibleElements.slice(0, 6)
	);
	const handlePrevPage = () => {
		const lastElement = visibleElements.pop();
		visibleElements.unshift(lastElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, 6));
	};

	const handleNextPage = () => {
		const firstElement = visibleElements.shift();
		visibleElements.push(firstElement);
		setVisibleElements(visibleElements);
		setNoVisibleElements(visibleElements.slice(0, 6));
	};
	return (
		<>
			<Divider />
			<Row justify={"center"} style={{ width: "100%" }}>
				<Col
					style={{
						width: "10%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handlePrevPage}
						icon={<CaretLeftOutlined />}
					/>
				</Col>
				<Col
					style={{
						width: "80%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						flexWrap: "wrap",
					}}
				>
					{noVisibleElements.map((element, index) => (
						<div
							style={{
								width: "16%",
								overflow: "hidden",
								height: "120px",
							}}
						>
							<div
								style={{
									width: "100%",
									background: `url(${element.path[1]})`,
									height: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								className="image ki"
							>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
									className="transparent-background"
								>
									<h3
										style={{
											mixBlendMode: "difference",
											color: "white",
										}}
									>
										{element.name}
									</h3>
								</div>
							</div>
						</div>
					))}
				</Col>
				<Col
					style={{
						width: "10%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						onClick={handleNextPage}
						icon={<CaretRightOutlined />}
					/>
				</Col>
			</Row>
			<Divider />
			<Row
				justify={"center"}
				align={"middle"}
				style={{
					flexDirection: "column",
					width: "100%",
					paddingBottom: "2%",
					color: "#787878",
				}}
			>
				<h2
					style={{
						color: "#484848",
					}}
				>
					Ropa para {lastWord}
				</h2>
				<h3
					style={{
						color: "#787878",
					}}
				>
					{lastWord == "hombre"
						? "Ropa de hombre en nuestro sitio web y tiendas del país"
						: "Outfit onfire para mujer"}
				</h3>
			</Row>
		</>
	);
};
export default HeaderFilterProduct;
