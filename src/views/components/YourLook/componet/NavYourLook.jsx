import {
	HeartFilled,
	HeartOutlined,
	HeartTwoTone,
	HomeOutlined,
	PlusCircleOutlined,
	ShopFilled,
	ShopOutlined,
	ShopTwoTone,
} from "@ant-design/icons";
import BurgerMenu from "../../Layout/components/NavMenuItems/BurgerMenu";
import { Button, Col, Row, Upload } from "antd";

const NavYourLook = ({ props }) => {
	return (
		<Row
			justify={"space-around"}
			type={"flex"}
			style={{ width: "100%", alignItems: "center" ,background:"white" }}
		>
			<Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
				<a className="footer-anga" href={window.location.pathname.includes("yourmarketlook") ?"/yourlook":"/"}>
					<HomeOutlined style={{ fontSize: "30px" }} />
				</a>
			</Col>
			<Col
				xs={4}
				style={{
					display: "flex",
					justifyContent: "center",
					background: window.location.pathname.includes(
						"yourmarketlook"
					)
						? "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) -50%, rgba(44, 4, 4, 0) 90%)"
						: "",
					clipPath: window.location.pathname.includes(
						"yourmarketlook"
					)
						? "polygon(5% 100%, 25% 0px, 75% 0px, 95% 100%)"
						: "",
					borderTop: window.location.pathname.includes(
						"yourmarketlook"
					)
						? "4px solid #787878"
						: "",
				}}
			>
				<a href="/yourlook/yourmarketlook" className="footer-anga">
					{window.location.pathname.includes("yourmarketlook") ? (
						<ShopTwoTone
							twoToneColor="#787878"
							style={{ fontSize: "30px" }}
						/>
					) : (
						<ShopOutlined style={{ fontSize: "30px" }} />
					)}
				</a>
			</Col>
			<Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
				<Upload {...props}>
					<Button
						className="footer-anga"
						style={{
							background: "transparent",
							border: "1px solid transparent",
						}}
						icon={
							<PlusCircleOutlined style={{ fontSize: "30px" }} />
						}
					/>
				</Upload>
			</Col>
			<Col
				xs={4}
				style={{
					display: "flex",
					justifyContent: "center",
					background: window.location.pathname.includes("likelook")
						? "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) -50%, rgba(44, 4, 4, 0) 90%)"
						: "",
					clipPath: window.location.pathname.includes("likelook")
						? "polygon(5% 100%, 25% 0px, 75% 0px, 95% 100%)"
						: "",
					borderTop: window.location.pathname.includes("likelook")
						? "4px solid #787878"
						: "",
				}}
			>
				<a className="footer-anga" href="/yourlook/likelook">
					{window.location.pathname.includes("likelook") ? (
						<HeartTwoTone
							twoToneColor="#787878"
							style={{ fontSize: "30px" }}
						/>
					) : (
						<HeartOutlined style={{ fontSize: "30px" }} />
					)}
				</a>
			</Col>
			<Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
				<BurgerMenu />
			</Col>
		</Row>
	);
};
export default NavYourLook;
