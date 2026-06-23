import React from "react";
import CARD from "../../assets/images/login-2.png";
import { LuTrendingUpDown } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle";

const Authlayout = ({ children }) => {
	return (
		<div className="flex">
			<div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
				
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-medium text-primary">
						Expense Tracker
					</h2>

					<ThemeToggle />
				</div>

				{children}
			</div>

			<div className="hidden md:block w-[40vw] h-screen bg-emerald-50 dark:bg-slate-800 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative transition-colors duration-300">
				
				<div className="w-48 h-48 rounded-[40px] bg-green-600 absolute -top-7 -left-5" />

				<div className="w-48 h-56 rounded-[40px] border-[20px] border-emerald-600 absolute top-[30%] -right-10" />

				<div className="w-48 h-48 rounded-[40px] bg-emerald-500 absolute -bottom-7 -left-5" />

				<div className="grid grid-cols-1 z-20">
					<StatusInfoCard
						icon={<LuTrendingUpDown />}
						label="Track your Income & Expenses"
						value="430,000"
						color="bg-primary"
					/>
				</div>

				<img
					src={CARD}
					alt=""
					className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-emerald-400/15"
				/>
			</div>
		</div>
	);
};

export default Authlayout;

const StatusInfoCard = ({ icon, label, value, color }) => {
	return (
		<div className="flex gap-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md shadow-green-400/10 border border-emerald-100 dark:border-slate-700 z-10 transition-colors duration-300">
			
			<div
				className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-lg shadow-black/10 dark:shadow-black/40`}
			>
				{icon}
			</div>

			<div>
				<h6 className="text-xs text-muted mb-1">
					{label}
				</h6>

				<span className="text-[20px] text-primary">
					${value}
				</span>
			</div>
		</div>
	);
};