import { Col, Collapse, Row } from "antd";
import Title from "antd/lib/skeleton/Title";
const { Panel } = Collapse;
const FAQItem = () => {
	const element = [
		{
			title: "¿CÓMO PUEDO DEVOLVER UN ARTÍCULO?",
			context: (
				<>
					Haciendo una solicitud a través de nuestra página web: Haz
					la solicitud desde tu cuenta {"->"} click aquí (guest o
					registrado) Recibirás un mail confirmando la solicitud
					Recibirás un 2º mail con la etiqueta de devolución. Tienes
					que imprimir y pegar la etiqueta al paquete y un
					transportista se pondrá en contacto contigo para la recogida
					*El importe del envío de la devolución se descontará del
					reembolso.
				</>
			),
		},
		{
			title: "¿CÓMO RECIBIRÉ EL IMPORTE DE MI DEVOLUCIÓN?",
			context: (
				<>
					Una vez aprobada la devolución, recibirás el importe en el
					mismo método de pago en el que realizaste tu compra, por
					defecto. Ten en cuenta, que a este importe se le descontará
					el precio del retorno.
				</>
			),
		},
		{
			title: "¿CUÁNDO RECIBIRÉ EL IMPORTE DE MI DEVOLUCIÓN?",
			context: (
				<>
					En cuanto se apruebe, recibirás un mail de confirmación
					indicándote que el importe se abonará en tu cuenta los
					próximos días. El tiempo que tarde en hacerse efectivo el
					reembolso en tu cuenta depende siempre de tu entidad
					bancaria.
				</>
			),
		},
		{
			title: "¿QUÉ PUEDO HACER SI EL IMPORTE DE MI DEVOLUCIÓN ES INCORRECTO?",
			context: (
				<>
					Ponte en contacto con nuestro servicio de atención al
					cliente y resolveremos tu consulta lo antes posible.
				</>
			),
		},
		{
			title: "¿PUEDO CAMBIAR LAS PRENDAS QUE HE COMPRADO EN ANGAOFICIAL.COM?",
			context: (
				<>
					No, solo podemos aceptar devoluciones. Deberás hacer una
					devolución y un nuevo pedido.
				</>
			),
		},
		{
			title: "¿PUEDO DEVOLVER CUALQUIER ARTÍCULO?",
			context: (
				<>
					Sí, a excepción de ropa interior o accesorios, pendientes y
					artículos. Los artículos tienen que estar en perfecto estado
					y con sus correspondientes etiquetas. Ten en cuenta las
					siguientes condiciones especiales para algunos de nuestros
					artículos: Ropa : debe incluir la pegatina de precios.
					Accesorios: tendrán que ser devueltos con su embalaje
					original completo y sin manipular. Bolsos, carteras y
					gafas..: deberán ser devueltas en el mismo envoltorio
					original, precintado. PRODUCTOS Comprar en angaoficial.com
					es muy fácil y divertido si sigues nuestros sencillos pasos
				</>
			),
		},
		{
			title: "¿RECIBIRÉ EL MISMO PRODUCTO QUE VEO EN LA FOTO?",
			context: (
				<>
					Sí, en angaoficial.com hacemos todos los esfuerzos posibles
					para mostrar las características de los artículos (color,
					texturas…) lo más parecido a la realidad.
				</>
			),
		},
		{
			title: "¿REPONDEN LOS ARTÍCULOS CON LA INDICACIÓN DE “AGOTADO”?",
			context: (
				<>
					Si un artículo está agotado trataremos de reponerlo lo antes
					posible. Además, si así lo solicitas en la página del
					artículo, te enviaremos un mail en cuanto vuelva a estar
					disponible, en el color y talla que indiques. Si no fuese
					posible repetirlo, lo retiraríamos de la web.
				</>
			),
		},
		{
			title: "¿LOS PRECIOS DE LA TIENDA ONLINE SON LOS MISMOS QUE EN MI TIENDA HABITUAL DE ANGA?",
			context: (
				<>
					Sí, pero si existiera cualquier diferencia entre los precios
					que figuran en la web y los marcados en las etiquetas de las
					prendas, el precio correcto será siempre el del ticket de
					compra, no el de las etiquetas.
				</>
			),
		},
		{
			title: "¿QUÉ INCLUYEN LOS PRECIOS?",
			context: (
				<>
					Todos los precios incorporan el IVA y demás impuestos
					locales, no los gastos de envío, que se muestran por
					separado en la cesta de compra.
				</>
			),
		},
		{
			title: "¿CADA CUÁNTO ACTUALIZÁN LA PÁGINA CON NUEVOS ARTÍCULOS?",
			context: (
				<>
					Incorporamos artículos nuevos dos veces por semana: el
					miércoles y el viernes. Para que los encuentres
					inmediatamente, les ponemos el indicativo de “New” y los
					agrupamos todos en la pestaña “Última semana”.
				</>
			),
		},
		{
			title: "¿QUÉ ARTÍCULOS MUESTRAN EN EL NEW COLECCIÓN MENSUAL?",
			context: (
				<>
					Con el New colección queremos darte más propuestas para que
					combines parte de los artículos y ropa que tendremos
					disponibles, como novedad, en el mes correspondiente.
					Asimismo, podrás consultar las nuevas colecciones de semanas
					anteriores.
				</>
			),
		},
		{
			title: "¿Y EN EL APARTADO DE COLECCIÓN?",
			context: (
				<>
					Los artículos de la campaña que tendremos a lo largo de la
					temporada en curso, con fotos artísticas y modelos.
				</>
			),
		},
		{
			title: "¿QUÉ SON LOS A-GRAVITY?",
			context: (
				<>
					Son los productos más vendidos de cada sección y de cada
					categoría de venta (Busos, goger...).
				</>
			),
		},
		{
			title: "¿QUÉ DEBO HACER SI ME LLEGA UN ARTÍCULO DEFECTUOSO?",
			context: (
				<>
					www.Angaoficial.com solo vende artículos en perfecto estado,
					por lo que si alguna vez recibes un artículo que no lo esté,
					por favor, ponte en contacto con nuestro servicio de
					atención al cliente.
				</>
			),
		},
		{
			title: "¿Y SI ME LLEGA UN ARTÍCULO INCORRECTO?",
			context: (
				<>
					Si extraordinariamente te llega un artículo que no has
					pedido ponte en contacto con nuestro departamento de
					atención al cliente. Accidentalmente, en www.Angaoficial.com
					podría aparecer información con errores tipográficos,
					imprecisiones u omisiones relacionados con la descripción
					del producto, el precio o la disponibilidad de los mismos.
					Te pedimos disculpas por adelantado y nos reservamos el
					derecho de corregirlos, sin previo aviso, incluso después de
					realizado el pedido. MUESTRA MÁS  PAGO Pagar tus compras es
					mucho más fácil ahora 
				</>
			),
		},
		{
			title: "¿QUÉ FORMA DE PAGO PUEDO UTILIZAR PARA REALIZAR MI COMPRA?",
			context: (
				<>
					Puedes pagar con tarjeta crédito, Tarjeta débito, Pse efecty
					contra entrega y efectivo. No aceptamos, cheques, ni pedidos
					telefónicos.
				</>
			),
		},
		{
			title: "¿EN QUÉ MOMENTO SE RETIRA EL IMPORTE DE COMPRA DE MI CUENTA BANCARIA?",
			context: (
				<>
					Una vez que el que el banco autoriza el pago, recibes el
					e-mail de confirmación de pedido, si no se envía en 48 horas
					nos debes contactar Esto significa que si, por cualquier
					motivo, no podemos enviar alguno de los artículos de tu
					pedido no se producirá cargo alguno en tu cuenta por el
					importe del mismo.
				</>
			),
		},
		{
			title: "¿POR QUÉ RAZÓN PUEDE SER RECHAZADA MI TARJETA?",
			context: (
				<>
					Tu tarjeta puede ser rechazada por alguno de los siguientes
					motivos: La tarjeta puede estar caducada. Comprueba su fecha
					de validez para descartar esta posible causa. Puede que se
					haya alcanzado el límite de la tarjeta. Consulta con tu
					banco que la tarjeta no haya excedido del importe permitido
					para efectuar compras. Asegúrate de haber introducido
					correctamente todos los datos de la tarjeta. Si después de
					todas estas verificaciones no consigues finalizar la compra
					ponte en contacto con tu banco para solucionar el problema.
				</>
			),
		},
		{
			title: "¿PUEDO OBTENER UNA FACTURA A NOMBRE DE MI EMPRESA?",
			context: (
				<>
					Sí, solo tienes que marcar la opción empresa en “datos
					personales” y cubrir los datos fiscales que te pedimos.
				</>
			),
		},
		{
			title: "¿ES SEGURO COMPRAR CON TARJETA BANCARIA EN ANGAOFFICIAL.COM?",
			context: (
				<>
					Sí, los datos que introduces de tu tarjeta se trasmiten de
					forma encriptada, utilizamos el protocolo de cifrado para
					proteger tus datos, lo que puedes comprobar pinchando en el
					candado que aparece, durante el proceso de pago, en la barra
					de tu navegador. Para las transacciones con tarjeta se
					requiere el número del código de seguridad (CVV2) situado en
					el dorso de la misma, solo si tienes acceso a la tarjeta
					física lo puedes ver y no queda guardado en nuestro sitio
					web. Además, contamos con sistemas antifraude para poder
					detectar usos ilegales o indebidos de tarjetas de crédito.
					www.Angaofficial.com se reserva el derecho a ponerse en
					contacto contigo para solicitarte más información en el caso
					de producirse cualquier problema con el pago. MUESTRA MÁS 
				</>
			),
		},
		{
			title: "¿CÓMO PUEDO DEVOLVER UN ARTÍCULO?",
			context: (
				<>
					Solicita la devolución y un transportista pasará por tu
					domicilio a recoger el paquete con las prendas que quieras
					devolver. Cuando hagamos tu rembolso descontaremos el coste
					de devolución de 7.500$ o 15.500$ al total.
				</>
			),
		},
		{
			title: "¿EL CAMBIO LO PUEDO EFECTUAR EN CUALQUIER TIENDA?",
			context: (
				<>
					Sí, siempre que esté situada en el país en el que hiciste la
					compra y tenga la misma sección a la que pertenece la prenda
					(chica o chico).
				</>
			),
		},
		{
			title: "¿CUÁNTO TIEMPO TENGO PARA REALIZAR UN CAMBIO?",
			context: (
				<>
					El plazo es de días a contar desde la fecha que figura en el
					e-mail de confirmación de envío. MUESTRA MÁS  INFORMACIÓN
					GENERAL Ir de compras en Angaoficial.com es muy fácil y
					divertido SELECCIONA LA SECCIÓN DE ANGA, HOMBRE O MUJER Y EL
					TIPO DE ARTÍCULO QUE QUIERAS COMPRAR (BUSOS, BLUSAS,
					CAMISETAS, ETC.) PUEDES VER TODOS LOS ARTÍCULOS QUE TE
					APETEZCA. SI BUSCAS ALGO ESPECÍFICO, PUEDES CONCRETAR LA
					BÚSQUEDA CON LOS FILTROS.
				</>
			),
		},
	];
	return (
		<Collapse accordion style={{ width: "100%" }}>
			{element.map((x, index) => (
				<Panel header={x.title} key={index}>
					{x.context}
				</Panel>
			))}
			
		</Collapse>
	);
};
export default FAQItem;
