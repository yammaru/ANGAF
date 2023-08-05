import { Tag } from "antd";

export function getTagDaysRemainingActivity(record) {
    const dato = diferenciaDias(record)+1;
    if ((dato)==0) {
        return <Tag color={"blue"}> Hoy </Tag>;
    } else {
        if (dato<=0)
            return <Tag color={"red"}> Venció hace {dato*-1} dia{dato==-1?"":"s"} </Tag>;
        else
            return <Tag color={"green"}> Queda{dato==1?"":"n"} {dato} dia{dato==1?"":"s"} </Tag>;
    }
}
export function diferenciaDias(record) {
        const fechaActual = new Date();
        let datos = objetoDateCadena(record);

        let dia = datos?.dia
        let mes = datos?.mes
        let anio = datos?.anio
        
        const fechaCadenaObjeto = anio + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');
        const fechaCadena = new Date(fechaCadenaObjeto)
        const fechaCadena2 = new Date("9/09/2017")
        const diferenciaMilisegundos = fechaCadena - fechaActual;
        const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaDias
}

export function objetoDateCadena(record) {
    let fechaString = record;
    // Crea un objeto Date a partir de la cadena de texto
    let fecha = new Date(fechaString);
    let dia = fecha.getDate()==31?fecha.getDate():fecha.getDate()==0?fecha.getDate()+1:fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses comienzan desde 0, así que se suma 1
    let anio = fecha.getFullYear();
    // Formatea los valores para que tengan 2 dígitos
    if (dia < 10) {
        dia = "0" + (dia);
    }
    if (mes < 10) {
        mes = "0" + mes;
    }
    return { dia, mes, anio }
}
export function formatoFecha(record) {

    let datos = objetoDateCadena(record);

    let dia = datos?.dia
    let mes = datos?.mes
    let anio = datos?.anio


    return dia + "/" + mes + "/" + anio
}