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

	return (
		<Authlayout>
			<div className="lg:w-[70%] w-full flex flex-col justify-center py-6 md:py-0 md:h-full overflow-y-auto">
				<h3 className="text-xl font-semibold text-primary">Create an account</h3>
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
						placeholder="Min 8 characters"
						type="password"
					/>

					{error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

					<button type="submit" className="btn-primary">
						SIGN UP
					</button>

					<p className="text-[13px] text-secondary mt-3">
						Already have an account ?{" "}
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
