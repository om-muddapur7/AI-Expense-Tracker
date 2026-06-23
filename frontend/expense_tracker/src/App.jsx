import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import AiInsights from "./pages/Dashboard/AiInsights";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme === "dark") {
		document.documentElement.classList.add("dark");
	}

	return (
		<ThemeProvider>
			<UserProvider>
				<div>
					<Router>
						<Routes>
							<Route path="/" element={<Root />} />
							<Route path="/login" exact element={<Login />} />
							<Route path="/signup" exact element={<SignUp />} />
							<Route path="/dashboard" exact element={<Home />} />
							<Route path="/income" exact element={<Income />} />
							<Route path="/expense" exact element={<Expense />} />
							<Route path="/aiinsights" exact element={<AiInsights />} />
						</Routes>
					</Router>
				</div>

				<Toaster
					toastOptions={{
						className: "",
						style: {
							fontSize: "13px",
						},
					}}
				/>
			</UserProvider>
		</ThemeProvider>
	);
};

export default App;

const Root = () => {
	const isAuthenticated = !!localStorage.getItem("token");

	return isAuthenticated ? (
		<Navigate to="/dashboard" />
	) : (
		<Navigate to="/login" />
	);
};
