import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";
import { useSelector } from "react-redux";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import Spinner from "./views/components/Spinner/Spinner.jsx";




function App() {
	const userLog = useSelector((state) => state?.user);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar
				transition={Slide}
			/>
			
				<Switch>
					<Route exact path="" component={HomePage} />
				</Switch>
		
		</>
	);
}

export default App;
