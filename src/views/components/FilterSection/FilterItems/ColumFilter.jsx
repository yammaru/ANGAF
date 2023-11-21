import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Collapse, Modal, Row, TreeSelect } from "antd";
import { useState } from "react";
const { Panel } = Collapse;
const ColumnFilter = ({
	categoryArray,
	tallaArray,
	colorArray,
	anchoPagina,
	onFilter,
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedColors, setSelectedColors] = useState([]);

	const handleColorClick = (color) => {
		if (selectedColors?.includes(color)) {
			setSelectedColors(selectedColors.filter((c) => c !== color));
		} else {
			setSelectedColors([...selectedColors, color]);
		}
	};
	const treeData = colorArray?.map((x, index) => ({
		title: x.name,
		key: index,
		value: x.name,
	}));
	const handleFilterClick = () => {
		// Lógica para aplicar el filtro
		// Puedes ajustar esto según tus necesidades
		onFilter(selectedColors);
		setModalVisible(false);
	};

	const handleModalClose = () => {
		setModalVisible(false);
	};

	return anchoPagina > 766 ? (
		<Col style={{ width: "20%" }}>
			{selectedColors?.length != 0 ? (
				<>
					<Row justify={"center"}>
						<b>Filtrado Por:</b>
					</Row>
					<TreeSelect
						showSearch
						style={{ width: "100%" }}
						value={selectedColors}
						treeData={treeData}
						treeCheckable={true}
						onChange={setSelectedColors}
					/>
				</>
			) : null}
			<Collapse>
				<Panel header={<b>Categoria</b>} key="1">
					{categoryArray?.map((x) => (
						<>
							<Checkbox
								style={{
									backgroundColor: "transparent",
									paddingLeft: "8%",
								}}
								onChange={() => handleColorClick(x.name)}
							>
								{x.name}
							</Checkbox>
							<br />
						</>
					))}
				</Panel>
				<Panel header={<b>Color</b>} key="2">
					<div style={{ display: "flex" }}>
						{colorArray?.map((x) => (
							<div
								key={x.color}
								style={{
									backgroundColor: x.color,
									width: "20px",
									height: "20px",
									margin: "5px",
									position: "relative",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									alignContent: "center",
								}}
								onClick={() => handleColorClick(x.name)}
							>
								{selectedColors?.includes(x.name) && (
									<Checkbox
										style={{
											backgroundColor: "transparent",
										}}
										checked={true}
									/>
								)}
							</div>
						))}
					</div>
				</Panel>
				<Panel header={<b>Talla</b>} key="3">
					{tallaArray?.map((x) => (
						<>
							<Checkbox
								style={{
									backgroundColor: "transparent",
									paddingLeft: "8%",
								}}
								onChange={() => handleColorClick(x.name)}
							>
								{x.name}
							</Checkbox>
							<br />
						</>
					))}
				</Panel>
			</Collapse>
		</Col>
	) : (
		<Col style={{ width: "20%" }}>
			<Button style={{background:"#484848",border:"1px solid transparent",display:"flex", alignItems: "center"}} icon={<FilterOutlined />} type="primary" onClick={() => setModalVisible(true)}>
				Filtro
			</Button>

			<Modal
				title="Filtro"
				visible={modalVisible}
				onCancel={handleModalClose}
				onOk={handleFilterClick}
				width={500}
				style={{zIndex:5001}}
			>
				<Row justify="center">
					<b>Filtrado Por:</b>
				</Row>
				<TreeSelect
					showSearch
					style={{ width: "100%" }}
					value={selectedColors}
					treeData={treeData}
					treeCheckable={true}
					onChange={setSelectedColors}
				/>
				<Collapse>
					<Panel header={<b>Categoría</b>} key="1">
						{categoryArray?.map((x) => (
							<Checkbox
								key={x.name}
								style={{
									backgroundColor: "transparent",
									paddingLeft: "8%",
								}}
								onChange={() => handleColorClick(x.name)}
							>
								{x.name}
							</Checkbox>
						))}
					</Panel>
					<Panel header={<b>Color</b>} key="2">
						<div style={{ display: "flex" }}>
							{colorArray?.map((x) => (
								<div
									key={x.color}
									style={{
										backgroundColor: x.color,
										width: "20px",
										height: "20px",
										margin: "5px",
										position: "relative",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										alignContent: "center",
									}}
									onClick={() => handleColorClick(x.name)}
								>
									{selectedColors?.includes(x.name) && (
										<Checkbox
											style={{
												backgroundColor: "transparent",
											}}
											checked={true}
										/>
									)}
								</div>
							))}
						</div>
					</Panel>
					<Panel header={<b>Talla</b>} key="3">
						{tallaArray?.map((x) => (
							<Checkbox
								key={x.name}
								style={{
									backgroundColor: "transparent",
									paddingLeft: "8%",
								}}
								onChange={() => handleColorClick(x.name)}
							>
								{x.name}
							</Checkbox>
						))}
					</Panel>
				</Collapse>
			</Modal>
		</Col>
	);
};
export default ColumnFilter;
