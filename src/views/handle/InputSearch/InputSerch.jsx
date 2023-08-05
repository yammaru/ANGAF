import React, { useState } from "react";
import { Button, Input, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const InputSearch = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const clear = () => {
		setIsHovered(false);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	const handleButtonClick = () => {
		setInputValue(""); // Limpia el valor del Input
		props.resetFilter(); // Llama a la función para reiniciar el filtro si es necesario
	};
	
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		props.handleSearch(e.target.value);
	};
	return (
		<Tooltip placement="bottom" color="#ffffff" title={props.title}>
			<Input
				value={inputValue}
				onChange={handleInputChange}
				style={{ width: 200, marginBottom: 16 }}
			/>

			<Tooltip
				placement="top"
				color="#ffffff"
				title={
					<p style={{ color: "#6A6963", fontFamily: "sans-serif" }}>
						Restaurar
					</p>
				}
			>
				<Button
					type="ghost"
					icon={<SyncOutlined spin={isHovered} />}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={handleButtonClick}
				/>
			</Tooltip>
		</Tooltip>
	);
};

export default InputSearch;
