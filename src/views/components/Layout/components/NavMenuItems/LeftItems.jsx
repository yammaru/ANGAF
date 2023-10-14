import logo from "../../../../../includes/images/logoInicio.png";
import logoHover from "../../../../../includes/images/logoIniciohover.png";
import logoCheck from "../../../../../includes/images/logocheout.png";
import logoKids from "../../../../../includes/images/angaKids.png";
import logoKidsHover from "../../../../../includes/images/angaKidsColor.png";
import { Image } from "antd";
import { useState } from "react";

const LeftItems = ({WhoWeAre}) => {
	const handleWhenLogo = () => {
		if (window.location.pathname.includes("kids")) {
			return logoKidsHover;
		} else if (window.location.pathname.includes("checkout")) {
			return logoCheck;
		} else {
			return logo;
		}
	};
	const [logoMenu, setLogoMenu] = useState(handleWhenLogo);

	const handleChange = () => {
		if (window.location.pathname.includes("kids")) {
			setLogoMenu(logoKids);
		} else {
			setLogoMenu(logoHover);
		}
	};
	const handleChangeLeave = () => {
		if (window.location.pathname.includes("kids")) {
			setLogoMenu(logoKidsHover);
		} else {
			setLogoMenu(logo);
		}
	};
	return (
		<a href={WhoWeAre?"/":"/genteanga"}>
			<Image
				className="custom-image"
				style={{
					height: "28px",
					width: "auto",
				}}
				src={
					window.location.pathname.includes("checkout")
						? logoCheck
						: logoMenu
				}
				preview={false}
				onMouseOver={handleChange}
				onMouseLeave={handleChangeLeave}
			/>
		</a>
	);
};
export default LeftItems;
