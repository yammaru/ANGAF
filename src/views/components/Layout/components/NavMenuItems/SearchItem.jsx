import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Drawer, Input, Row } from "antd";
import { holdReady } from "jquery";
import { useState } from "react";
const listaDePalabras = [
	"manzana",
	"banana",
	"cereza",
	"uva",
	"pera",
	"naranja",
	"kiwi",
	"sandía",
	"fresa",
	"melocotón",
];
const SearchItem = ({ anchoPagina }) => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const [sugerencias, setSugerencias] = useState([]);
	const [valorInput, setValorInput] = useState("");

	const handleInputChange = (inputValue) => {
		const textoIngresado = inputValue.target.value.toLowerCase();

		const sugerenciasCoincidentes = listaDePalabras.filter((palabra) =>
			palabra.toLowerCase().includes(textoIngresado)
		);

		setSugerencias(sugerenciasCoincidentes.slice(0, 6));
		setValorInput(inputValue.target.value);
	};

	const renderSugerencias = () => {
		if (sugerencias.length === 0) {
			return <span>No hay sugerencias</span>;
		}
		if (valorInput.length === 0) {
			return <span>No hay sugerencias</span>;
		}
		return (
			<>
				<span>
					<b>sugerencias</b>
				</span>
				<Divider
					style={{
						width: "100vw",
						position: "relative",
						left: "-24px",
					}}
				/>
				{sugerencias.map((sugerencia) => (
					<>
						<span>{sugerencia}</span>
						<br />
					</>
				))}
			</>
		);
	};
	const elements = [
		{
			name: "lobo1",
			value: 5524,
			path: "https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
		},
		{
			name: "lobo2",
			value: 5524,
			path: "https://i.pinimg.com/1200x/fa/8d/14/fa8d1414bd5f7897edfaee3e8e288a07.jpg",
		},
		{
			name: "lobo3",
			value: 5524,
			path: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
		},
	];
	const imageSuges =
		valorInput.length !== 0 ? (
			<>
				<Row justify={"space-between"}>
					{elements.map((element, index) => (
						<Col style={{ paddingBottom: "2%" }}>
							<Card
								style={{ height: "32vh", width: "40vw" }}
								title={false}
								extra={null}
								cover={
									<img
										style={{
											height: "25vh",
											width: "40vw",
											overflow: "hidden",
										}}
										alt="example"
										src={element.path}
									/>
								}
								bodyStyle={{
									padding: 0,
									border: "transparent",
									paddingLeft: "2%",
									color: "#484848",
								}}
							>
								<b>{element.name}</b>
								<br />
								Item:{element.value}
							</Card>
						</Col>
					))}
				</Row>
				<Divider
					style={{
						width: "100vw",
						position: "relative",
						left: "-24px",
					}}
				/>
			</>
		) : null;
	return (
		<>
			<Button
				type="ghost"
				style={{ borderColor: "transparent" }}
				icon={
					<SearchOutlined
						className="gold-hover-icon"
						style={{ color: "#484848", fontSize: "25px" }}
					/>
				}
				onClick={showDrawer}
			/>

			<Drawer
				style={{ zIndex: 5001 }}
				title={
					<Row
						justify={"center"}
						style={{ display: "flex", gap: "2px" }}
					>
						<Col
							style={{
								width: anchoPagina < 766 ? "89%" : "94%",
								display: "flex",
								alignContent: "center",
							}}
						>
							<Input
								defaultValue={valorInput}
								onChange={handleInputChange}
								placeholder="Buscar..."
								style={{
									border: "transparent",
									boxShadow: "none",
								}}
							/>
						</Col>
						<Col
							style={{
								width: anchoPagina < 766 ? "10%" : "5%",
								display: "flex",
								alignContent: "center",
							}}
						>
							<SearchOutlined
								style={{ color: "#484848", fontSize: "25px" }}
							/>
						</Col>
					</Row>
				}
				placement={"top"}
				onClose={onClose}
				open={open}
				height="75vh"
				footer={false}
			>
				{imageSuges}
				{renderSugerencias()}
			</Drawer>
		</>
	);
};
export default SearchItem;
