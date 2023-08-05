import { Tag} from "antd";
export const getStateUnit = (unit_state)=>{
    switch (unit_state) {
        case "Disponible":
            return <Tag color={"green"}> {unit_state} </Tag>;
        case "Separada":
            return <Tag color={"lime"}> {unit_state} </Tag>;
        case "Comprada":
            return <Tag color={"red"}> {unit_state} </Tag>;
        default:
            return <Tag color={"white"}> {unit_state} </Tag>;
    }
}