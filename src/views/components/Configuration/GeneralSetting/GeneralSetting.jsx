import React from "react";
import { Button } from "antd";
import Card from "../../Card/Card";
import { DeleteOutlined } from "@ant-design/icons";
import * as constants from "../../../../redux/constants";
import GeneralSettingForm from "./components/GeneralSettingForm";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validateModule } from "../../../handle/PermissionMethods/PermissionMethods";

const GeneralSetting = () => {
	if (!validateModule(constants.GENERAL_SETTING_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	return (
		<>
			<Card
    style={{border: "1px solid rgb(235, 237, 240);"}}
    title="Configuraciones generales"
    extra={[
        <Button type="primary" danger icon={<DeleteOutlined/>}>
            Borrar caché
        </Button>,
    ]}
    />
			<GeneralSettingForm />
		</>
	);
};

export default GeneralSetting;
