import React, { useState } from "react";
import Authlayout from "../../components/Layouts/Authlayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePicSelector from "../../components/Inputs/ProfilePicSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
	const [fullName, setFullName] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { updateUser } = useContext(UserContext);

	const handleSignUp = async (e) => {
		e.preventDefault();

		let profileImageUrl = "";

		if (!fullName) {
			setError("Please enter your full name");
			return;
		}

		if (!email) {
			setError("Please enter your email address");
			return;
		}

		if (!password) {
			setError("Please enter your password");
			return;
		}

		setError("");

		//SignUp API call
		try {
			if (profilePicture) {
				const imgUploadRes = await uploadImage(profilePicture);
				profileImageUrl = imgUploadRes.imageUrl || "";
			}

			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
				fullName,
				email,
				password,
				profileImageUrl,
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

	const handleGoogleSignUp = async (credentialResponse) => {
		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, {
				credential: credentialResponse.credential,
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
				setError("Google Sign Up failed");
			}
		}
	};

	return (
		<Authlayout>
			<div className="lg:w-[70%] w-full flex flex-col justify-center py-6 md:py-0 md:h-full overflow-y-auto">
				<h3 className="text-xl font-semibold text-primary">
					Create an account
				</h3>
				<p className="text-xs text-secondary mt-[5px] mb-6">
					Join us to start tracking your expenses and income
				</p>

				<form onSubmit={handleSignUp}>
					<ProfilePicSelector
						image={profilePicture}
						setImage={setProfilePicture}
					/>

					<Input
						value={fullName}
						onChange={({ target }) => setFullName(target.value)}
						label="Full Name"
						placeholder="John Mike"
						type="text"
					/>

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

					{error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

					<button type="submit" className="btn-primary">
						SIGN UP
					</button>

					<div className="flex items-center my-5">
						<div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

						<span className="mx-3 text-xs text-gray-500 dark:text-gray-400">
							OR
						</span>

						<div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
					</div>

					<div className="flex justify-center">
						<GoogleLogin
							onSuccess={handleGoogleSignUp}
							onError={() => setError("Google Sign Up failed")}
							theme="outline"
							size="large"
							text="signup_with"
							shape="rectangular"
							width="320"
						/>
					</div>

					<p className=" flex justify-center text-[13px] text-secondary mt-3">
						Already have an account?‎ ‎ {" "}
						<Link className="font-medium text-primary underline" to="/login">
							Login
						</Link>
					</p>
				</form>
			</div>
		</Authlayout>
	);
};

export default SignUp;
