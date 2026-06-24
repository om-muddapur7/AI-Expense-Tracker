import React, { useState } from "react";
import Authlayout from "../../components/Layouts/Authlayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const { updateUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email) {
			setError("Please enter a valid email address");
			return;
		}

		if (!password) {
			setError("Please enter a password");
			return;
		}

		setError("");

		//Login API call
		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
				email,
				password,
			});

			const { token, user } = response.data;

			if (token) {
				localStorage.setItem("token", token);
				updateUser(user);
				navigate("/dashboard");
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				setError(error.response.data.message);
			} else {
				setError("Something went wrong");
			}
		}
	};

	return (
		<Authlayout>
			<div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
				<h3 className="text-xl font-semibold text-primary">Welcome back</h3>

				<p className="text-xs text-secondary mt-[5px] mb-6">
					Please enter your details to log in
				</p>

				<form onSubmit={handleLogin}>
					<Input
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						label="Email Address"
						placeholder="john@example.com"
						type="text"
					/>

					<Input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						label="Password"
						placeholder="Min 6 characters"
						type="password"
					/>

					{error && (
						<p className="text-red-500 dark:text-red-400 text-xs pb-2.5">
							{error}
						</p>
					)}

					<button type="submit" className="btn-primary">
						LOGIN
					</button>

					<p className="text-[13px] text-secondary mt-3">
						Don't have an account?{" "}
						<Link
							className="font-medium text-emerald-600 dark:text-emerald-400 underline"
							to="/signup"
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</Authlayout>
	);
};

export default Login;
