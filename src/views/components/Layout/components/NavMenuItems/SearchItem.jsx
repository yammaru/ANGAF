import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Input, Row } from "antd";
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
				<Divider />
				{sugerencias.map((sugerencia) => (
					<>
						<span>{sugerencia}</span>
						<br />
					</>
				))}
			</>
		);
	};
	const imageSuges =
		valorInput.length !== 0 ? (
			<>
				nooooo <Divider />
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
				width="70vw"
				footer={false}
			>
				{imageSuges}
				{renderSugerencias()}
			</Drawer>
		</>
	);
};
export default SearchItem;
