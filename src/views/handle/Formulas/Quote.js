const data = {
	0: "Ene-", 1: "Feb-", 2: "Mar-", 3: "Abr-",
	4: "May-", 5: "Jun-", 6: "Jul-", 7: "Ago-",
	8: "Sep-", 9: "Oct-", 10: "Nov-", 11: "Dic-",
}

export function Dues(amountOfFees,loanValue,currentMonth,currentYear,percentage,mesesPresente) {
	let value = loanValue/amountOfFees
	let answer = []
	for (let i = 1; i <= amountOfFees; i++)
	{
		if (currentMonth > 11) {
			currentMonth = 0
			currentYear++
		}
		answer = answer.concat({
			key: i,
			month: data[currentMonth] + currentYear,
			value: value,
			porcentaje: percentage,
			tipo: i > mesesPresente ? 'Construccion' : 'Presente'
		})
		currentMonth++
	}
	return answer
}

export function CalculatePercentage(value,totalValue) {
	let percentage = (parseInt(value) * 100) / parseInt(totalValue)
	if(parseInt(totalValue) === 0 || parseInt(value) === 0) return 0
	return percentage
}

export function findTheCurrentMonthAndYear(fechaDeConstruccion,fechaFinProyecto,mesMaximo) {
	let fechaLocal = new Date();
	let respuesta = {mes: fechaLocal.getMonth()+1, year: fechaLocal.getFullYear(), mesConstruccion: 0, mesPlano: 0,mesTotal:0};
	let fechaDeConstruccionInterno = new Date(fechaDeConstruccion);

	let fechaFinProyectoInterno = new Date(fechaFinProyecto);
	let diferenciaActualConstruccion = (fechaLocal.getFullYear()*12 + fechaLocal.getMonth())-(fechaDeConstruccionInterno.getFullYear()*12 + fechaDeConstruccionInterno.getMonth());
	let contidadMes = (fechaFinProyectoInterno.getFullYear()*12 + fechaFinProyectoInterno.getMonth())-(fechaLocal.getFullYear()*12 + fechaLocal.getMonth());
	(diferenciaActualConstruccion > 0) ? (respuesta.mesConstruccion = diferenciaActualConstruccion) : (respuesta.mesPlano = Math.abs(diferenciaActualConstruccion));
	(contidadMes > mesMaximo) ? (respuesta.mesTotal = mesMaximo) : (respuesta.mesTotal = contidadMes);
	return respuesta;
}

export function findTheCurrentMonthAndYearCreate(fecha,fechaDeConstruccion,fechaFinProyecto,mesMaximo) {
	let fechaLocal = new Date(fecha);
	let respuesta = {mes: fechaLocal.getMonth()+1, year: fechaLocal.getFullYear(), mesConstruccion: 0, mesPlano: 0,mesTotal:0};
	let fechaDeConstruccionInterno = new Date(fechaDeConstruccion);
	let fechaFinProyectoInterno = new Date(fechaFinProyecto);
	let diferenciaActualConstruccion = (fechaLocal.getFullYear()*12 + fechaLocal.getMonth())-(fechaDeConstruccionInterno.getFullYear()*12 + fechaDeConstruccionInterno.getMonth());
	let contidadMes = (fechaFinProyectoInterno.getFullYear()*12 + fechaFinProyectoInterno.getMonth())-(fechaLocal.getFullYear()*12 + fechaLocal.getMonth());
	(diferenciaActualConstruccion > 0) ? (respuesta.mesConstruccion = diferenciaActualConstruccion) : (respuesta.mesPlano = Math.abs(diferenciaActualConstruccion)+1);
	(contidadMes > mesMaximo) ? (respuesta.mesTotal = mesMaximo) : (respuesta.mesTotal = contidadMes);
	return respuesta;
}

export function CalcularValorPresente(cuotaNoFinanciada,valorPresenteCuotaFinanciada,valorFinanciadoBanco,interesValorConstruccion,numeroCuotas) {
	let answer = cuotaNoFinanciada + valorPresenteCuotaFinanciada + ((valorFinanciadoBanco/Math.pow((1+(interesValorConstruccion/100)),(numeroCuotas + 1))))
	return parseFloat(answer).toFixed(2)
}

export function ValorPresenteCuotaFinanciada(quotas,interesValorPresente,interesValorPresenteConstruccion){
	let valorPresenteCuotaFinanciada = 0
	quotas.forEach((quota)=>{
		if (quota.tipo === 'Presente'){
			valorPresenteCuotaFinanciada += ((quota.value/ Math.pow((1+(interesValorPresente/100)),(quota.key + 1))))
		}else {
			valorPresenteCuotaFinanciada += ((quota.value/ Math.pow((1+(interesValorPresenteConstruccion/100)),(quota.key + 1))))
		}
	})
	return parseFloat(valorPresenteCuotaFinanciada).toFixed(2)
}

export function CalculateValueOfTheMonthInArrears(duesValue,numberOfFees) {
	let usuryRate = 10.24 /100
	return  duesValue * Math.pow(Math.pow(1+usuryRate,1/12),numberOfFees-1)
}

export const limpiarNULLs=(formOfPayments)=>{
	if(formOfPayments[0]?.value!==undefined){
		for (let index = 0; index < formOfPayments.length; index++){
			if(formOfPayments[index].value==null){formOfPayments[index].value=0;formOfPayments[index].porcentaje=0.0;}
		}
	}
	return formOfPayments
}

export const CalcularEntregaGeneralCliente = (valorPresente,formOfPayments,deliveryDate,flatTax,constructionTax) => {
	const originalFees = JSON.parse(JSON.stringify(formOfPayments));
	if(deliveryDate!==undefined){
		if(originalFees.length>0){
			originalFees[originalFees.length-1].value = deliveryDate;
		}
	}
	const filteredOdds = originalFees?.filter(payment => payment.month !== 'Entrega');
	
	let value = 0;
	
	const paymentsInPresent = filteredOdds?.filter(payment => payment.tipo === 'Presente');
	const constructionPayments = filteredOdds?.filter(payment => payment.tipo === 'Construccion');
	
	const interesDeConstruccion=(1+constructionTax)**(constructionPayments.length);
	const interesDeSobrePlanos=(1+flatTax)**(paymentsInPresent.length);
	const sumatoriaContrucion=SumatoryFlow(constructionPayments,constructionTax);
	const SumatoriaSobrePlano=SumatoryFlow(paymentsInPresent,flatTax);
	
	value=CalcularEntrega(valorPresente,interesDeSobrePlanos,interesDeConstruccion,sumatoriaContrucion,SumatoriaSobrePlano);

	return value;
}

export const valorPresenteCuotas = (formOfPayments,deliveryDate,flatTax,constructionTax) => {
	
		const originalFees = JSON.parse(JSON.stringify(formOfPayments));
		if(deliveryDate!=undefined){
			if(originalFees?.length>0){
				originalFees[originalFees.length-1].value = deliveryDate;
			}
		}
		let value = 0;

		const paymentsInPresent = originalFees?.filter(payment => payment.tipo === 'Presente');
		const constructionPayments = originalFees?.filter(payment => payment.tipo === 'Construccion');
		
		const valueConstructionPayments = SumatoryFlow(constructionPayments,constructionTax);
		const valuePaymentsInPresent = SumatoryFlow(paymentsInPresent, flatTax);
		
		value = CalcularEntregaVerdadera(valuePaymentsInPresent,valueConstructionPayments,flatTax,paymentsInPresent.length);
	
		return value;
}

const CalcularEntregaVerdadera=(valorSobrePlano,valorConstrucion,tax,potencia)=>{
	let result=0;
	result=valorSobrePlano+(valorConstrucion/((1+tax)**potencia));
	return result;
}

const CalcularEntrega =(Vp,iSp,iC,sC,sSp)=>{
		let result=0;
		let resta=0;
		const interesConstrution=iC;
		const ValorPresenteXinteresSobreplanos	=Vp*iSp;
		const  SumatoriaSobrePlanoXinteresSobreplanos=sSp*iSp;
		const sumatoriaContrucion=sC;
		resta=ValorPresenteXinteresSobreplanos-SumatoriaSobrePlanoXinteresSobreplanos-sumatoriaContrucion;
		result=(interesConstrution)*(resta);
		return result;
}

export const calularDescuentoOIncremto=(projectUnitValue,clientUnitValue)=>{
	let result=0;
	result=projectUnitValue-clientUnitValue;
	return result
}

export const  SumatoryValueCoutes =(payments)=>{
	let result=0;
	if (payments[0]?.value !== undefined){
		for (let index = 0; index < payments.length; index++){
		
			result+=parseFloat((payments[index].value));
		}
	}
	return result;
}

const SumatoryFlow =(payments,Tax)=>{
	let result=0;
	if (payments[0]?.value !== undefined){
		for (let index = 0; index < payments.length; index++){
			result+=parseFloat((payments[index].value)/((1+Tax)**(index)));
		}
	}
	return result;
}

const tourPaidTypes = (formOfPayments,interest) => {
	let valueTotal = 0;
	let index1 = 1;
	for (let index = 0; index < formOfPayments.length; index++){
		if (formOfPayments[index]?.value !== undefined) valueTotal +=  parseFloat(formOfPayments[index]?.value)/Math.pow(( 1 + interest ),index1);
		index1 ++;
	}
	return valueTotal;
}