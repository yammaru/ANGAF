import { useRef } from "react";

const TermsAndConditionsItem = () => {
	const editorRef = useRef(null);
	const log = () => {
		console.log("ff", editorRef);
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};
	return (
		<>
			<h2>TÉRMINOS Y CONDICIONES</h2>
			<br />
			<h2>1. INTRODUCCIÓN</h2>
			<br />
			El presente documento (conjuntamente con todos los documentos en él
			mencionados) establece las condiciones por las que se rige el uso de
			la página web www.Angaofficial.com y su App (en adelante, y
			conjuntamente ‘las Plataformas’) y la compra de productos en la
			misma (en adelante, las "Condiciones"). Le rogamos que lean
			atentamente las presentes Condiciones, nuestra Política de Cookies y
			nuestra Política de Privacidad (conjuntamente, las “Políticas de
			Protección de Datos”) antes de usar las Plataformas. Usted debe
			respetar todas aquellas normas que regulan el uso de las
			Plataformas. Para realizar un pedido, además, usted deberá aceptar
			expresamente las presentes Condiciones y leer la información
			facilitada en nuestra Política de Privacidad, quedando por tanto
			vinculado por las mismas. Si no está de acuerdo con todas las
			Condiciones, no debe usar las Plataformas. Si tiene alguna pregunta
			relacionada con las Condiciones o las Políticas de Protección de
			Datos puede ponerse en contacto con nosotros a través de nuestro
			formulario de contacto. El contrato podrá formalizarse, a su
			elección, en cualquiera de los idiomas en los que las Condiciones
			están disponibles en las Plataformas.
			<br />
			<h2>2. NUESTROS DATOS</h2>
			<br />
			La venta de artículos a través de las Plataformas es realizada bajo
			la denominación ANGA por ANGA COL COLOMBIA, Marca Colombiana con
			domicilio en Calle. de la Diputación, Local 01, 5b -61 - San Jorge
			(Valledupar - Cesar), inscrita en el Registro Mercantil de Súper
			Intendencia Industria y comercio Tomo 1980. Sección General, Fo lio
			179. Hoja C-19163. y NIF A78276854, con teléfono 900 456 003 y
			correo electrónico contact@anga.com.
			<br />
			<h2>3. SUS DATOS Y SUS VISITAS A LAS PLATAFORMAS</h2>
			<br />
			La información o datos personales que nos facilite sobre usted serán
			tratados con arreglo a lo establecido en las Políticas de Protección
			de Datos. Toda la información o datos que nos facilite son veraces y
			se corresponden con la realidad. En este sentido, le informamos que
			cuando acceda a su cuenta de usuario a travé s de la App (aplicación
			informática diseñada para ser ejecutada en teléfonos inteligentes o
			smartphones, tabletas y otros dispositivos móviles disponibles para
			utilizar las funcionalidades que ANGA pone a su disposición) su
			sesión permanecerá activa, de manera que no será necesario que
			introduzca nuevamente sus credenciales en posteriores accesos a su
			cuenta a través de la App. En el caso de que acceda a su cuenta de
			usuario a través de la Página Web podrá optar por mantener su sesión
			activa marcando la casilla correspondiente. No obstante, para la
			realización de determinadas operaciones y por motivos de seguridad,
			podremos solicitarle que vuelva a introducir sus credenciales. Así
			mismo, usted podrá cerrar su sesión de usuario en cualquier momento
			pinchan do en el botón “desconectar” disponible en la sección “Mi
			cuenta”.
			<br />
			<h2>4. USO DE NUESTRAS PLATAFORMAS</h2>
			<br />
			Al hacer uso de nuestras Plataformas y realizar pedidos a través de
			la misma usted se compromete a: • Hacer uso de nuestras plataformas
			únicamente para realizar consultas o pedidos legalmente válidos. •
			No realizar ningún pedido falso o fraudulento. Si razonablemente se
			pudiera considerar que se ha hecho un pedido de esta índole
			estaremos autorizados a anularlo e informar a las autoridades
			pertinentes. • Facilitarnos su dirección de correo electrónico,
			dirección postal y/u otros datos de contacto de forma veraz y
			exacta. Asimismo, podremos hacer uso de dicha información para
			ponernos en contacto con usted si es necesario (ver nuestra Política
			de Privacidad). Si no nos facilita usted toda la información que
			necesitamos, no podremos cursar su pedido. Al realizar un pedido a
			través de nuestras Plataformas, usted declara ser mayor de 18 años y
			tener capacidad legal para celebrar contratos.
		</>
	);
};
export default TermsAndConditionsItem;
