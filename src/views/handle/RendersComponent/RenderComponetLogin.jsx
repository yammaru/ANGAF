import HomeLoginButton from "../../components/Layout/components/NavMenuItems/loginModal/HomeLoginButton";
import PanelPrincipal from "../../components/Layout/components/NavMenuItems/loginModal/PanelPricipal";
import Registrate from "../../components/Layout/components/NavMenuItems/loginModal/Registrate";

export const renderComponentBasedOnWhoIs = (how,setHow,setwhoIs,whoIs) => {
    
    switch (whoIs) {
        case "R":
            return <PanelPrincipal how={how} whoIsSet={setwhoIs} howSet={setHow} />;
        case "I":
            return <HomeLoginButton whoIsSet={setwhoIs} howSet={setHow} />;
        case "M":
            return <Registrate how={how} whoIsSet={setwhoIs} howSet={setHow}/>;
        default:
            return <></>;
    }
};