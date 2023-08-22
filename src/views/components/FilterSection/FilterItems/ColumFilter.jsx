import { Checkbox, Col, Collapse, Row, TreeSelect } from "antd";
import { useState } from "react";
const { Panel } = Collapse;
const ColumnFilter = ({categoryArray,tallaArray,colorArray}) => {
	
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
        value:x.name
	}));

	return (
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
			<Collapse >
				<Panel header={<b>Categoria</b>} key="1">
					{categoryArray?.map((x) => (
						<>
							<Checkbox
								style={{
									backgroundColor: "transparent",
                                    paddingLeft:"8%"
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
                                    paddingLeft:"8%"
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
	);
};
export default ColumnFilter;
