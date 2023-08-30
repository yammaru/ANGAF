import React from "react";
import "./MarqueeMessage.css"; // Importa tus estilos CSS

const MarqueeMessage = () => {
	const color = "grey";
	const tempo = 10;
	const colorLetra = "blue";
	return (
		<div
			className="marquee-container"
			style={{ backgroundColor: color }}
		>
			<h4
				className="marquee"
				style={{
					animation: `marquee ${tempo}s linear infinite`,
					color: colorLetra,
				}}
			>
				¡Mensaje en movimiento! ¡Mensaje en movimiento!
			</h4>
		</div>
	);
};

export default MarqueeMessage;
